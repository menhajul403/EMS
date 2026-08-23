<?php

namespace App\Http\Controllers\Coordinator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Event\StoreEventRequest;
use App\Http\Requests\Event\UpdateEventRequest;
use App\Models\Club;
use App\Models\Department;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Event::class);

        $events = Event::query()
            ->with(['category', 'venue'])
            ->where('organizer_id', auth()->id())
            ->latest()
            ->paginate(10);

        return Inertia::render('Coordinator/Events/Index', [
            'events' => $events,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Event::class);

        return Inertia::render('Coordinator/Events/Create', [
            'categories' => EventCategory::orderBy('name')->get(['id', 'name']),
            'venues' => Venue::orderBy('name')->get(['id', 'name']),
            'departments' => Department::orderBy('name')->get(['id', 'name']),
            'clubs' => Club::where('status', 'active')->orderBy('name')->get(['id', 'name']),
            'facultyAdvisors' => User::role('Faculty')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(StoreEventRequest $request): RedirectResponse
    {
        $this->authorize('create', Event::class);

        Event::create($request->validated() + [
            'organizer_id' => $request->user()->id,
            'status' => 'draft',
        ]);

        return redirect()->route('coordinator.events.index')->with('success', 'Event created as draft.');
    }

    public function edit(Event $event): Response
    {
        $this->authorize('update', $event);

        return Inertia::render('Coordinator/Events/Edit', [
            'event' => $event->load(['category', 'venue', 'department', 'facultyAdvisor']),
            'categories' => EventCategory::orderBy('name')->get(['id', 'name']),
            'venues' => Venue::orderBy('name')->get(['id', 'name']),
            'departments' => Department::orderBy('name')->get(['id', 'name']),
            'clubs' => Club::where('status', 'active')->orderBy('name')->get(['id', 'name']),
            'facultyAdvisors' => User::role('Faculty')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(UpdateEventRequest $request, Event $event): RedirectResponse
    {
        $this->authorize('update', $event);

        $event->update($request->validated());

        return redirect()->route('coordinator.events.index')->with('success', 'Event updated.');
    }

    public function destroy(Event $event): RedirectResponse
    {
        $this->authorize('delete', $event);

        $event->delete();

        return back()->with('success', 'Event deleted.');
    }

    public function submit(Event $event): RedirectResponse
    {
        $this->authorize('update', $event);

        if (! in_array($event->status, ['draft', 'rejected'], true)) {
            return back()->with('error', 'Only draft or rejected events can be submitted for approval.');
        }

        $event->update([
            'status' => 'pending',
            'rejection_reason' => null,
        ]);

        return back()->with('success', 'Event submitted for faculty approval.');
    }

    public function publish(Event $event): RedirectResponse
    {
        $this->authorize('update', $event);

        if ($event->status !== 'approved') {
            return back()->with('error', 'Only approved events can be published.');
        }

        $event->update(['status' => 'published']);

        return back()->with('success', 'Event published successfully.');
    }

    public function unpublish(Event $event): RedirectResponse
    {
        $this->authorize('update', $event);

        if ($event->status !== 'published') {
            return back()->with('error', 'Only published events can be unpublished.');
        }

        $event->update(['status' => 'approved']);

        return back()->with('success', 'Event unpublished.');
    }
}
