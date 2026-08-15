<?php

namespace App\Http\Controllers\Coordinator;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class AttendanceController extends Controller
{
    public function scan(Request $request): RedirectResponse
    {
        $this->authorize('attendance.scan');

        $code = $request->input('code');
        if (! $code) {
            return back()->with('error','No code provided.');
        }

        $registration = Registration::where('qr_code', $code)->first();
        if (! $registration) {
            return back()->with('error','Invalid QR code.');
        }

        if ($registration->attended_at) {
            return back()->with('error','Attendance already recorded for this registration.');
        }

        $registration->update(['attended_at' => now()]);

        return back()->with('success', 'Attendance recorded for '.$registration->user->name);
    }
}
