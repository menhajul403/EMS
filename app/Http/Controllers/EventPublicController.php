<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Registration;
use Inertia\Inertia;
use Inertia\Response;

class EventPublicController extends Controller
{
    public function show(string $slug): Response
    {
        $event = Event::query()
            ->with(['category', 'venue', 'organizer', 'department'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $registration = null;

        if (auth()->check()) {
            $registration = Registration::query()
                ->where('event_id', $event->id)
                ->where('user_id', auth()->id())
                ->first();
        }

        return Inertia::render('Events/Show', [
            'event' => $event,
            'registration' => $registration,
        ]);
    }
}
