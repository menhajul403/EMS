<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\University;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoUserSeeder extends Seeder
{
    public function run(): void
    {
        $university = University::first();
        $department = Department::first();

        $users = [
            [
                'name' => 'Event Coordinator',
                'email' => 'coordinator@campusconnect.com',
                'role' => 'Coordinator',
            ],
            [
                'name' => 'Faculty Advisor',
                'email' => 'faculty@campusconnect.com',
                'role' => 'Faculty',
            ],
            [
                'name' => 'Demo Student',
                'email' => 'student@campusconnect.com',
                'role' => 'Student',
            ],
            [
                'name' => 'University Admin',
                'email' => 'university@campusconnect.com',
                'role' => 'University Admin',
            ],
        ];

        foreach ($users as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                    'university_id' => $university?->id,
                    'department_id' => $department?->id,
                ]
            );

            $user->syncRoles([$data['role']]);
        }
    }
}
