<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\Venue;
use App\Models\User;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $organizer = User::where('email','admin@campusconnect.com')->first();
        $category = EventCategory::first();
        $venue = Venue::first();

        if (! $organizer || ! $category || ! $venue) {
            return;
        }

        Event::firstOrCreate([
            'slug' => 'demo-workshop-1',
        ],[
            'title' => 'Demo Workshop: Intro to CampusConnect',
            'short_description' => 'An introductory workshop',
            'description' => 'This is a demo event to show the system.',
            'category_id' => $category->id,
            'venue_id' => $venue->id,
            'organizer_id' => $organizer->id,
            'start_at' => now()->addDays(7),
            'end_at' => now()->addDays(7)->addHours(2),
            'registration_deadline' => now()->addDays(6),
            'capacity' => 100,
            'status' => 'published',
        ]);
    }
}
