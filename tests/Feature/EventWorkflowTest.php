<?php

use App\Models\Event;
use App\Models\Feedback;
use App\Models\Registration;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RolePermissionSeeder;
use Database\Seeders\RoleSeeder;

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

    expect($event->fresh()->status)->toBe('approved');
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
