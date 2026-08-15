<?php

namespace Database\Seeders;

use App\Models\Club;
use App\Models\Department;
use App\Models\University;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $university = University::first();

        if (! $university) {
            return;
        }

        $departments = [
            ['name' => 'Computer Science & Engineering', 'code' => 'CSE'],
            ['name' => 'Electrical & Electronic Engineering', 'code' => 'EEE'],
            ['name' => 'Business Administration', 'code' => 'BBA'],
            ['name' => 'English', 'code' => 'ENG'],
        ];

        foreach ($departments as $department) {
            Department::firstOrCreate(
                ['code' => $department['code'], 'university_id' => $university->id],
                [
                    'name' => $department['name'],
                    'slug' => strtolower($department['code']),
                    'university_id' => $university->id,
                ]
            );
        }

        $cse = Department::where('code', 'CSE')->first();

        if ($cse) {
            $clubs = [
                ['name' => 'Programming Club', 'slug' => 'programming-club'],
                ['name' => 'Robotics Society', 'slug' => 'robotics-society'],
                ['name' => 'Cultural Club', 'slug' => 'cultural-club'],
            ];

            foreach ($clubs as $club) {
                Club::firstOrCreate(
                    ['slug' => $club['slug'], 'department_id' => $cse->id],
                    [
                        'name' => $club['name'],
                        'department_id' => $cse->id,
                    ]
                );
            }
        }
    }
}
