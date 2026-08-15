<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $coordinator = User::where('email', 'coordinator@campusconnect.com')->first();
        $faculty = User::where('email', 'faculty@campusconnect.com')->first();
        $category = EventCategory::first();
        $venue = Venue::first();
        $department = Department::first();

        if (! $coordinator || ! $category || ! $venue) {
            return;
        }

        Event::firstOrCreate([
            'slug' => 'intro-to-campusconnect',
        ], [
            'title' => 'Intro to CampusConnect Platform',
            'short_description' => 'Learn how to discover, register for, and attend university events.',
            'description' => 'This workshop introduces students and staff to CampusConnect — the smart university event management platform for workshops, seminars, hackathons, and cultural programs.',
            'category_id' => $category->id,
            'venue_id' => $venue->id,
            'department_id' => $department?->id,
            'organizer_id' => $coordinator->id,
            'faculty_advisor_id' => $faculty?->id,
            'start_at' => now()->addDays(7)->setTime(10, 0),
            'end_at' => now()->addDays(7)->setTime(12, 0),
            'registration_deadline' => now()->addDays(6),
            'capacity' => 100,
            'status' => 'published',
        ]);

        Event::firstOrCreate([
            'slug' => 'web-development-bootcamp',
        ], [
            'title' => 'Web Development Bootcamp',
            'short_description' => 'Hands-on Laravel and React training for CSE students.',
            'description' => 'A two-day intensive bootcamp covering Laravel, Inertia.js, and React for building modern web applications.',
            'category_id' => $category->id,
            'venue_id' => $venue->id,
            'department_id' => $department?->id,
            'organizer_id' => $coordinator->id,
            'faculty_advisor_id' => $faculty?->id,
            'start_at' => now()->addDays(14)->setTime(9, 0),
            'end_at' => now()->addDays(15)->setTime(17, 0),
            'registration_deadline' => now()->addDays(12),
            'capacity' => 50,
            'status' => 'pending',
        ]);
    }
}
