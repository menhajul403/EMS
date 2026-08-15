<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        $allPermissions = Permission::pluck('name')->all();

        $rolePermissions = [
            'Super Admin' => $allPermissions,
            'University Admin' => [
                'dashboard.view',
                'user.view', 'user.create', 'user.edit', 'user.delete',
                'event.view', 'event.create', 'event.edit', 'event.delete', 'event.publish', 'event.archive',
                'category.view', 'category.create', 'category.edit', 'category.delete',
                'department.view', 'department.create', 'department.edit', 'department.delete',
                'venue.view', 'venue.create', 'venue.edit', 'venue.delete',
                'registration.view', 'registration.approve', 'registration.reject',
                'attendance.view', 'attendance.scan',
                'certificate.view', 'certificate.generate',
                'feedback.view',
                'gallery.view', 'gallery.upload', 'gallery.delete',
                'report.view',
                'setting.manage',
            ],
            'Coordinator' => [
                'dashboard.view',
                'event.view', 'event.create', 'event.edit', 'event.delete', 'event.publish', 'event.archive',
                'registration.view',
                'attendance.view', 'attendance.scan',
                'certificate.view', 'certificate.generate',
                'feedback.view',
                'gallery.view', 'gallery.upload', 'gallery.delete',
                'report.view',
            ],
            'Faculty' => [
                'dashboard.view',
                'event.view',
                'registration.view',
                'registration.approve', 'registration.reject',
                'attendance.view',
                'feedback.view',
                'gallery.view', 'gallery.upload', 'gallery.delete',
                'report.view',
            ],
            'Student' => [
                'dashboard.view',
                'event.view',
                'certificate.view',
                'feedback.create',
            ],
        ];

        foreach ($rolePermissions as $roleName => $permissions) {
            $role = Role::findByName($roleName, 'web');
            $role->syncPermissions($permissions);
        }
    }
}
