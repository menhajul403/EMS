<?php

namespace App\Http\Controllers\Coordinator;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Registration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AttendanceController extends Controller
{
    public function scanForm(): Response
    {
        $this->authorize('attendance.scan');

        return Inertia::render('Coordinator/Attendance/Scan');
    }

    public function scan(Request $request): RedirectResponse
    {
        $this->authorize('attendance.scan');

        $validated = $request->validate([
            'code' => ['required', 'string'],
        ]);

        $registration = Registration::query()
            ->with(['user', 'event'])
            ->where('qr_code', $validated['code'])
            ->where('status', 'registered')
            ->first();

        if (! $registration) {
            return back()->with('error', 'Invalid QR code or registration is not active.');
        }

        if ($registration->qr_expires_at && now()->greaterThan($registration->qr_expires_at)) {
            return back()->with('error', 'This QR code has expired.');
        }

        if ($registration->attendance()->exists()) {
            return back()->with('error', 'Attendance already recorded for this registration.');
        }

        DB::transaction(function () use ($registration, $request) {
            Attendance::create([
                'registration_id' => $registration->id,
                'event_id' => $registration->event_id,
                'student_id' => $registration->user_id,
                'checked_in_at' => now(),
                'checked_in_by' => $request->user()->id,
            ]);

            $registration->update([
                'attended_at' => now(),
                'status' => 'attended',
            ]);
        });

        return back()->with('success', 'Attendance recorded for '.$registration->user->name);
    }
}
