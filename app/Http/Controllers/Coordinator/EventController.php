<?php

namespace App\Http\Controllers\Coordinator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Event\StoreEventRequest;
use App\Http\Requests\Event\UpdateEventRequest;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\Venue;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class EventController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Event::class);

        $events = Event::with(['category','venue'])->latest()->paginate(10);

        return Inertia::render('Coordinator/Events/Index', [
            'events' => $events,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Event::class);

        return Inertia::render('Coordinator/Events/Create', [
            'categories' => EventCategory::all(),
            'venues' => Venue::all(),
        ]);
    }

    public function store(StoreEventRequest $request): RedirectResponse
    {
        $this->authorize('create', Event::class);

        Event::create($request->validated() + ['organizer_id' => $request->user()->id]);

        return redirect()->route('coordinator.events.index')->with('success','Event created.');
    }

    public function edit(Event $event): Response
    {
        $this->authorize('update', $event);

        return Inertia::render('Coordinator/Events/Edit', [
            'event' => $event->load(['category','venue']),
            'categories' => EventCategory::all(),
            'venues' => Venue::all(),
        ]);
    }

    public function update(UpdateEventRequest $request, Event $event): RedirectResponse
    {
        $this->authorize('update', $event);

        $event->update($request->validated());

        return redirect()->route('coordinator.events.index')->with('success','Event updated.');
    }

    public function destroy(Event $event): RedirectResponse
    {
        $this->authorize('delete', $event);

        $event->delete();

        return back()->with('success','Event deleted.');
    }
}
