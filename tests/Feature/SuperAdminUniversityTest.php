<?php

use App\Models\University;
use App\Models\User;

it('super admin can open the university create page and save a university', function () {
    seedRoles();

    $admin = User::factory()->create();
    $admin->assignRole('Super Admin');

    $this->actingAs($admin)
        ->get(route('super-admin.universities.create'))
        ->assertOk();

    $this->actingAs($admin)
        ->post(route('super-admin.universities.store'), [
            'name' => 'Demo University',
            'country' => 'Bangladesh',
            'timezone' => 'Asia/Dhaka',
            'city' => 'Dhaka',
        ])
        ->assertRedirect(route('super-admin.universities.index'));

    expect(University::where('name', 'Demo University')->exists())->toBeTrue();
});
