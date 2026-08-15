<?php

namespace App\Http\Controllers\Coordinator;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Feedback;
use Inertia\Inertia;
use Inertia\Response;

class FeedbackController extends Controller
{
    public function index(Event $event): Response
    {
        $this->authorize('update', $event);

        $feedbacks = Feedback::query()
            ->with('student')
            ->where('event_id', $event->id)
            ->latest()
            ->paginate(15);

        $averages = Feedback::query()
            ->where('event_id', $event->id)
            ->selectRaw('AVG(rating_overall) as overall, AVG(rating_speaker) as speaker, AVG(rating_organization) as organization, AVG(rating_venue) as venue, COUNT(*) as total')
            ->first();

        return Inertia::render('Coordinator/Feedback/Index', [
            'event' => $event,
            'feedbacks' => $feedbacks,
            'averages' => $averages,
        ]);
    }
}
