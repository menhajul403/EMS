<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;

class EventPublicController extends Controller
{
    public function show($slug)
    {
        $event = Event::with(['category','venue','organizer'])->where('slug', $slug)->firstOrFail();

        return Inertia::render('Events/Show', [
            'event' => $event,
        ]);
    }
}
