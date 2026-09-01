<?php

use App\Models\Event;
use App\Models\Feedback;
use App\Models\Registration;
use App\Models\User;
use App\Notifications\EventChangesRequestedNotification;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Notification;

test('coordinator can submit event for approval', function () {
    seedRoles();

    $coordinator = User::factory()->create();
    $coordinator->assignRole('Coordinator');

    $event = Event::factory()->create([
        'organizer_id' => $coordinator->id,
        'status' => 'draft',
    ]);

    $this->actingAs($coordinator)
        ->post(route('coordinator.events.submit', $event))
        ->assertRedirect();

    expect($event->fresh()->status)->toBe('pending');
});

test('coordinator can create an event with a banner', function () {
    seedRoles();
    Storage::fake('public');

    $coordinator = User::factory()->create();
    $coordinator->assignRole('Coordinator');

    $this->actingAs($coordinator)
        ->post(route('coordinator.events.store'), [
            'title' => 'Banner Event',
            'slug' => 'banner-event',
            'banner' => UploadedFile::fake()->create('banner.jpg', 100, 'image/jpeg'),
        ])
        ->assertRedirect(route('coordinator.events.index'))
        ->assertSessionHas('success');

    $event = Event::where('slug', 'banner-event')->firstOrFail();

    expect($event->banner)->not->toBeNull();
    Storage::disk('public')->assertExists($event->banner);
});

test('faculty can approve pending events', function () {
    seedRoles();

    $faculty = User::factory()->create();
    $faculty->assignRole('Faculty');

    $coordinator = User::factory()->create();
    $coordinator->assignRole('Coordinator');

    $event = Event::factory()->pending()->create([
        'organizer_id' => $coordinator->id,
        'faculty_advisor_id' => $faculty->id,
    ]);

    $this->actingAs($faculty)
        ->post(route('faculty.events.approve', $event))
        ->assertRedirect();

    expect($event->fresh()->status)->toBe('published');
});

test('faculty request changes notifies the coordinator', function () {
    seedRoles();
    Notification::fake();

    $faculty = User::factory()->create();
    $faculty->assignRole('Faculty');

    $coordinator = User::factory()->create();
    $coordinator->assignRole('Coordinator');

    $event = Event::factory()->pending()->create([
        'organizer_id' => $coordinator->id,
        'faculty_advisor_id' => $faculty->id,
    ]);

    $this->actingAs($faculty)
        ->post(route('faculty.events.request-changes', $event), ['reason' => 'Please add the learning outcomes.'])
        ->assertRedirect();

    expect($event->fresh()->status)->toBe('draft');
    Notification::assertSentTo($coordinator, EventChangesRequestedNotification::class);
});

test('coordinator can publish approved events', function () {
    seedRoles();

    $coordinator = User::factory()->create();
    $coordinator->assignRole('Coordinator');

    $event = Event::factory()->approved()->create([
        'organizer_id' => $coordinator->id,
    ]);

    $this->actingAs($coordinator)
        ->post(route('coordinator.events.publish', $event))
        ->assertRedirect();

    expect($event->fresh()->status)->toBe('published');
});

test('coordinator can record attendance from qr code', function () {
    seedRoles();

    $coordinator = User::factory()->create();
    $coordinator->assignRole('Coordinator');

    $student = User::factory()->create();
    $student->assignRole('Student');

    $event = Event::factory()->published()->create([
        'organizer_id' => $coordinator->id,
    ]);

    $registration = Registration::create([
        'event_id' => $event->id,
        'user_id' => $student->id,
        'status' => 'registered',
        'qr_code' => 'test-qr-12345',
    ]);

    $this->actingAs($coordinator)
        ->post(route('coordinator.attendance.scan.store'), ['code' => 'test-qr-12345'])
        ->assertRedirect()
        ->assertSessionHas('success');

    expect($registration->fresh()->attended_at)->not->toBeNull();
    expect($registration->fresh()->status)->toBe('attended');
});

test('student can submit feedback after attending', function () {
    seedRoles();

    $student = User::factory()->create();
    $student->assignRole('Student');

    $event = Event::factory()->published()->create(['status' => 'completed']);

    $registration = Registration::create([
        'event_id' => $event->id,
        'user_id' => $student->id,
        'status' => 'attended',
        'attended_at' => now(),
        'qr_code' => 'qr-feedback-test',
    ]);

    $this->actingAs($student)
        ->post(route('student.feedback.store', $registration), [
            'rating_overall' => 5,
            'rating_speaker' => 4,
            'comment' => 'Great event!',
        ])
        ->assertRedirect(route('student.feedback.index'));

    expect($registration->fresh()->feedback)->not->toBeNull();
});

test('duplicate feedback is prevented', function () {
    seedRoles();

    $student = User::factory()->create();
    $student->assignRole('Student');

    $event = Event::factory()->published()->create(['status' => 'completed']);

    $registration = Registration::create([
        'event_id' => $event->id,
        'user_id' => $student->id,
        'status' => 'attended',
        'attended_at' => now(),
        'qr_code' => 'qr-dup-feedback',
    ]);

    Feedback::create([
        'registration_id' => $registration->id,
        'event_id' => $event->id,
        'student_id' => $student->id,
        'rating_overall' => 4,
    ]);

    $this->actingAs($student)
        ->post(route('student.feedback.store', $registration), [
            'rating_overall' => 5,
        ])
        ->assertRedirect()
        ->assertSessionHas('error');
});

test('student can view feedback page after attending', function () {
    seedRoles();

    $student = User::factory()->create();
    $student->assignRole('Student');

    $this->actingAs($student)
        ->get(route('student.feedback.index'))
        ->assertOk();
});

test('student can register again after cancelling', function () {
    seedRoles();

    $student = User::factory()->create();
    $student->assignRole('Student');
    $event = Event::factory()->published()->create();

    $this->actingAs($student)
        ->post(route('student.events.register', $event))
        ->assertRedirect();

    $this->actingAs($student)
        ->delete(route('student.events.cancel', $event))
        ->assertRedirect();

    $this->actingAs($student)
        ->post(route('student.events.register', $event))
        ->assertRedirect()
        ->assertSessionHas('success');

    expect(Registration::query()->where('event_id', $event->id)->where('user_id', $student->id)->count())->toBe(1);
    expect(Registration::query()->where('event_id', $event->id)->where('user_id', $student->id)->value('status'))->toBe('registered');
});
