<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Venue;

class VenueSeeder extends Seeder
{
    public function run(): void
    {
        $venues = [
            ['name' => 'Main Auditorium', 'address' => 'Campus Main Building', 'capacity' => 500],
            ['name' => 'Lecture Hall A', 'address' => 'Science Block', 'capacity' => 120],
            ['name' => 'Outdoor Field', 'address' => 'East Grounds', 'capacity' => 2000],
        ];

        foreach ($venues as $v) {
            Venue::firstOrCreate(['name' => $v['name']], $v);
        }
    }
}
