<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Registration\StoreRegistrationRequest;
use App\Models\Event;
use App\Models\Registration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class RegistrationController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Registration::class);

        $registrations = Registration::with('event')->where('user_id', auth()->id())->latest()->paginate(10);

        return inertia('Student/Registrations/Index', [
            'registrations' => $registrations,
        ]);
    }

    public function store(StoreRegistrationRequest $request, Event $event): RedirectResponse
    {
        // Validate business rules
        if ($event->status !== 'published') {
            return back()->with('error','Event is not published.');
        }

        if ($event->registration_deadline && now()->greaterThan($event->registration_deadline)) {
            return back()->with('error','Registration deadline has passed.');
        }

        $exists = Registration::where('event_id', $event->id)->where('user_id', $request->user()->id)->exists();
        if ($exists) {
            return back()->with('error','You have already registered for this event.');
        }

        // Capacity check
        if ($event->capacity) {
            $count = Registration::where('event_id', $event->id)->where('status','registered')->count();
            if ($count >= $event->capacity) {
                return back()->with('error','Event capacity reached.');
            }
        }

        DB::transaction(function () use ($event, $request) {
            Registration::create([
                'event_id' => $event->id,
                'user_id' => $request->user()->id,
                'status' => 'registered',
                'qr_code' => \Illuminate\Support\Str::uuid(),
                'qr_expires_at' => null,
            ]);
        });

        return redirect()->route('student.registrations.index')->with('success','Registered successfully.');
    }

    public function destroy(Event $event): RedirectResponse
    {
        $registration = Registration::where('event_id', $event->id)->where('user_id', auth()->id())->first();
        if (! $registration) {
            return back()->with('error','Registration not found.');
        }

        $registration->update(['status' => 'cancelled']);

        return back()->with('success','Registration cancelled.');
    }
}
