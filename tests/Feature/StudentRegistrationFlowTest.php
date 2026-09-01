<?php

use App\Models\Department;
use App\Models\Event;
use App\Models\Registration;
use App\Models\University;
use App\Models\User;

it('student can register with student details and department', function () {
    seedRoles();

    $university = University::create([
        'name' => 'Demo University',
        'slug' => 'demo-university',
        'country' => 'Bangladesh',
        'timezone' => 'Asia/Dhaka',
    ]);

    $department = Department::create([
        'name' => 'Computer Science',
        'slug' => 'computer-science',
        'code' => 'CSE',
        'university_id' => $university->id,
        'status' => 'active',
    ]);

    $this->post(route('register'), [
        'name' => 'Student User',
        'student_id' => '2024-1001',
        'email' => 'student@example.com',
        'phone' => '01712345678',
        'department_id' => $department->id,
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ])->assertRedirect(route('dashboard'));

    $user = User::where('email', 'student@example.com')->first();

    expect($user)->not->toBeNull()
        ->and($user->student_id)->toBe('2024-1001')
        ->and($user->phone)->toBe('01712345678')
        ->and((int) $user->department_id)->toBe($department->id);
});

it('student dashboard shows the registered student name and university email', function () {
    seedRoles();

    $user = User::factory()->create([
        'name' => 'Student User',
        'email' => 'student@demo.edu',
        'student_id' => '2024-1001',
    ]);
    $user->assignRole('Student');

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertSee('Student User')
        ->assertSee('student@demo.edu');
});

it('coordinator can download a pdf registration report for an event', function () {
    seedRoles();

    $coordinator = User::factory()->create();
    $coordinator->assignRole('Coordinator');

    $event = Event::factory()->published()->create();
    $student = User::factory()->create();
    $student->assignRole('Student');

    Registration::create([
        'event_id' => $event->id,
        'user_id' => $student->id,
        'status' => 'attended',
        'attended_at' => now(),
        'qr_code' => 'pdf-report-test',
    ]);

    $this->actingAs($coordinator)
        ->get(route('reports.registrations.export', ['event_id' => $event->id]))
        ->assertOk()
        ->assertHeader('Content-Type', 'application/pdf');
});
