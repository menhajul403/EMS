<?php

use App\Models\Event;
use App\Models\Registration;
use App\Models\User;
use App\Services\CertificateService;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RolePermissionSeeder;
use Database\Seeders\RoleSeeder;

test('certificate can be generated for attended registration', function () {
    seedRoles();

    $coordinator = User::factory()->create();
    $coordinator->assignRole('Coordinator');

    $student = User::factory()->create();
    $student->assignRole('Student');

    $event = Event::factory()->published()->create(['organizer_id' => $coordinator->id]);

    $registration = Registration::create([
        'event_id' => $event->id,
        'user_id' => $student->id,
        'status' => 'attended',
        'attended_at' => now(),
        'qr_code' => 'cert-test-qr',
    ]);

    $certificate = app(CertificateService::class)->generateForRegistration($registration);

    expect($certificate->certificate_number)->toStartWith('CC-');
    expect($certificate->verification_code)->not->toBeEmpty();
    expect(storage_path('app/'.$certificate->file_path))->toBeFile();
});

test('certificate verification page works', function () {
    seedRoles();

    $coordinator = User::factory()->create();
    $coordinator->assignRole('Coordinator');

    $student = User::factory()->create();
    $student->assignRole('Student');

    $event = Event::factory()->published()->create(['organizer_id' => $coordinator->id]);

    $registration = Registration::create([
        'event_id' => $event->id,
        'user_id' => $student->id,
        'status' => 'attended',
        'attended_at' => now(),
        'qr_code' => 'verify-test-qr',
    ]);

    $certificate = app(CertificateService::class)->generateForRegistration($registration);

    $this->get(route('certificates.verify', $certificate->verification_code))
        ->assertOk()
        ->assertSee($student->name)
        ->assertSee($event->title);
});
