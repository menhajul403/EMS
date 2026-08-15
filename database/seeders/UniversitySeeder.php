<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use App\Models\University;

class UniversitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'name' => 'Demo University',
            'short_name' => 'DemoU',
            'email' => 'info@demouniversity.edu',
            'phone' => '+880123456789',
            'website' => 'https://demouniversity.example',
            'city' => 'Dhaka',
            'country' => 'Bangladesh',
            'address' => 'Demo Address, Dhaka',
            'is_verified' => true,
        ];

        if (Schema::hasColumn('universities', 'timezone')) {
            $data['timezone'] = 'Asia/Dhaka';
        }

        University::firstOrCreate([
            'slug' => 'demo-university',
        ], $data);
    }
}
