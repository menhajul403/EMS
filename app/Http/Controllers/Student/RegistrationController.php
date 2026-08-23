<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Registration\StoreRegistrationRequest;
use App\Models\Event;
use App\Models\Registration;
use App\Notifications\RegistrationSuccessfulNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class RegistrationController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Registration::class);

        $registrations = Registration::query()
            ->with(['event.category', 'event.venue', 'certificate'])
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate(10);

        return Inertia::render('Student/Registrations/Index', [
            'registrations' => $registrations,
        ]);
    }

    public function showQr(Registration $registration): Response
    {
        $this->authorize('view', $registration);

        return Inertia::render('Student/Registrations/QRCode', [
            'registration' => $registration->load('event'),
        ]);
    }

    public function store(StoreRegistrationRequest $request, Event $event): RedirectResponse
    {
        $this->authorize('create', Registration::class);

        if ($event->status !== 'published') {
            return back()->with('error', 'Event is not published.');
        }

        if ($event->registration_deadline && now()->greaterThan($event->registration_deadline)) {
            return back()->with('error', 'Registration deadline has passed.');
        }

        $registration = Registration::query()
            ->where('event_id', $event->id)
            ->where('user_id', $request->user()->id)
            ->first();

        if ($registration?->status === 'registered') {
            return back()->with('error', 'You have already registered for this event.');
        }

        if ($event->capacity) {
            $count = Registration::query()
                ->where('event_id', $event->id)
                ->where('status', 'registered')
                ->count();

            if ($count >= $event->capacity) {
                return back()->with('error', 'Event capacity reached.');
            }
        }

        DB::transaction(function () use ($event, $request, $registration) {
            $attributes = [
                'status' => 'registered',
                'attended_at' => null,
                'qr_code' => (string) Str::uuid(),
                'qr_expires_at' => $event->end_at,
            ];

            if ($registration) {
                $registration->update($attributes);
            } else {
                Registration::create([
                    'event_id' => $event->id,
                    'user_id' => $request->user()->id,
                    ...$attributes,
                ]);
            }
        });

        $request->user()->notify(new RegistrationSuccessfulNotification($event));

        return redirect()->route('student.registrations.index')->with('success', 'Registered successfully.');
    }

    public function destroy(Event $event): RedirectResponse
    {
        $registration = Registration::query()
            ->where('event_id', $event->id)
            ->where('user_id', auth()->id())
            ->where('status', 'registered')
            ->first();

        if (! $registration) {
            return back()->with('error', 'Registration not found.');
        }

        $registration->update(['status' => 'cancelled']);

        return back()->with('success', 'Registration cancelled.');
    }
}
