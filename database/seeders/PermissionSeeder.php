<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [

            // Dashboard
            'dashboard.view',

            // User
            'user.view',
            'user.create',
            'user.edit',
            'user.delete',

            // Event
            'event.view',
            'event.create',
            'event.edit',
            'event.delete',
            'event.publish',
            'event.archive',

            // Category
            'category.view',
            'category.create',
            'category.edit',
            'category.delete',

            // Department
            'department.view',
            'department.create',
            'department.edit',
            'department.delete',

            // Venue
            'venue.view',
            'venue.create',
            'venue.edit',
            'venue.delete',

            // Registration
            'registration.view',
            'registration.approve',
            'registration.reject',

            // Attendance
            'attendance.view',
            'attendance.scan',

            // Certificate
            'certificate.view',
            'certificate.generate',

            // Feedback
            'feedback.view',

            // Report
            'report.view',

            // Setting
            'setting.manage',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }
    }
}