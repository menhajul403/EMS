<?php

use App\Models\Event;
use App\Models\Registration;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RolePermissionSeeder;
use Database\Seeders\RoleSeeder;

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated users can visit the dashboard', function () {
    $this->seed([RoleSeeder::class, PermissionSeeder::class, RolePermissionSeeder::class]);

    $user = User::factory()->create();
    $user->assignRole('Student');

    $this->actingAs($user)
        ->get('/dashboard')
        ->assertOk();
});

test('students can register for published events', function () {
    $this->seed([RoleSeeder::class, PermissionSeeder::class, RolePermissionSeeder::class]);

    $student = User::factory()->create();
    $student->assignRole('Student');

    $event = Event::create([
        'title' => 'Test Workshop',
        'slug' => 'test-workshop',
        'short_description' => 'A test event',
        'status' => 'published',
        'start_at' => now()->addDay(),
        'end_at' => now()->addDay()->addHours(2),
        'registration_deadline' => now()->addHours(12),
        'capacity' => 10,
    ]);

    $this->actingAs($student)
        ->post(route('student.events.register', $event))
        ->assertRedirect(route('student.registrations.index'));

    expect(Registration::where('event_id', $event->id)->where('user_id', $student->id)->exists())->toBeTrue();
});

test('duplicate student registration is prevented', function () {
    $this->seed([RoleSeeder::class, PermissionSeeder::class, RolePermissionSeeder::class]);

    $student = User::factory()->create();
    $student->assignRole('Student');

    $event = Event::create([
        'title' => 'Duplicate Test',
        'slug' => 'duplicate-test',
        'status' => 'published',
        'start_at' => now()->addDay(),
        'capacity' => 10,
    ]);

    Registration::create([
        'event_id' => $event->id,
        'user_id' => $student->id,
        'status' => 'registered',
        'qr_code' => 'test-qr-code',
    ]);

    $this->actingAs($student)
        ->post(route('student.events.register', $event))
        ->assertRedirect()
        ->assertSessionHas('error');
});

test('public events page is accessible to guests', function () {
    $this->get(route('events.index'))->assertOk();
});
