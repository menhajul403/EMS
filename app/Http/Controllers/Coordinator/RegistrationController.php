<?php

namespace App\Http\Controllers\Coordinator;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Registration;
use Inertia\Inertia;
use Inertia\Response;

class RegistrationController extends Controller
{
    public function index(Event $event): Response
    {
        $this->authorize('update', $event);

        $registrations = Registration::query()
            ->with(['user', 'attendance'])
            ->where('event_id', $event->id)
            ->latest()
            ->paginate(20);

        return Inertia::render('Coordinator/Registrations/Index', [
            'event' => $event,
            'registrations' => $registrations,
            'stats' => [
                'total' => Registration::where('event_id', $event->id)->where('status', 'registered')->count(),
                'attended' => Registration::where('event_id', $event->id)->whereNotNull('attended_at')->count(),
                'cancelled' => Registration::where('event_id', $event->id)->where('status', 'cancelled')->count(),
            ],
        ]);
    }
}
