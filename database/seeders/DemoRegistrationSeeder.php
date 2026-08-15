<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\Event;
use App\Models\Feedback;
use App\Models\Registration;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DemoRegistrationSeeder extends Seeder
{
    public function run(): void
    {
        $student = User::where('email', 'student@campusconnect.com')->first();
        $coordinator = User::where('email', 'coordinator@campusconnect.com')->first();
        $publishedEvent = Event::where('slug', 'intro-to-campusconnect')->first();
        $completedEvent = Event::where('slug', 'web-development-bootcamp')->first();

        if (! $student || ! $publishedEvent) {
            return;
        }

        $registration = Registration::firstOrCreate(
            [
                'event_id' => $publishedEvent->id,
                'user_id' => $student->id,
            ],
            [
                'status' => 'registered',
                'qr_code' => (string) Str::uuid(),
            ]
        );

        if ($completedEvent) {
            $completedEvent->update(['status' => 'completed']);

            $attendedRegistration = Registration::firstOrCreate(
                [
                    'event_id' => $completedEvent->id,
                    'user_id' => $student->id,
                ],
                [
                    'status' => 'attended',
                    'attended_at' => now()->subDays(3),
                    'qr_code' => (string) Str::uuid(),
                ]
            );

            if ($coordinator && ! $attendedRegistration->attendance()->exists()) {
                Attendance::create([
                    'registration_id' => $attendedRegistration->id,
                    'event_id' => $completedEvent->id,
                    'student_id' => $student->id,
                    'checked_in_at' => now()->subDays(3),
                    'checked_in_by' => $coordinator->id,
                ]);
            }

            Feedback::firstOrCreate(
                ['registration_id' => $attendedRegistration->id],
                [
                    'event_id' => $completedEvent->id,
                    'student_id' => $student->id,
                    'rating_overall' => 5,
                    'rating_speaker' => 4,
                    'rating_organization' => 5,
                    'rating_venue' => 4,
                    'comment' => 'Excellent bootcamp with practical Laravel and React sessions.',
                    'suggestions' => 'Add more hands-on labs next time.',
                ]
            );
        }

        if ($coordinator && $registration->attended_at && ! $registration->attendance()->exists()) {
            Attendance::create([
                'registration_id' => $registration->id,
                'event_id' => $publishedEvent->id,
                'student_id' => $student->id,
                'checked_in_at' => now(),
                'checked_in_by' => $coordinator->id,
            ]);
        }
    }
}
