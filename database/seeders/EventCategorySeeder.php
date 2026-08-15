<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EventCategory;

class EventCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Workshop', 'slug' => 'workshop'],
            ['name' => 'Seminar', 'slug' => 'seminar'],
            ['name' => 'Hackathon', 'slug' => 'hackathon'],
            ['name' => 'Cultural', 'slug' => 'cultural'],
        ];

        foreach ($categories as $c) {
            EventCategory::firstOrCreate(['slug' => $c['slug']], $c);
        }
    }
}
