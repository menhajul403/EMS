<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\User;
use App\Notifications\EventApprovedNotification;
use App\Notifications\EventChangesRequestedNotification;
use App\Notifications\EventPublishedNotification;
use App\Notifications\EventRejectedNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventApprovalController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Event::class);

        $events = Event::query()
            ->with(['category', 'venue', 'organizer', 'department'])
            ->where(function ($query) {
                $query->where('faculty_advisor_id', auth()->id())
                    ->orWhere(function ($inner) {
                        $inner->whereNull('faculty_advisor_id')
                            ->where('department_id', auth()->user()->department_id);
                    });
            })
            ->whereIn('status', ['pending', 'approved', 'rejected'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Faculty/Events/Index', [
            'events' => $events,
        ]);
    }

    public function approve(Event $event): RedirectResponse
    {
        $this->authorize('update', $event);

        if ($event->status !== 'pending') {
            return back()->with('error', 'Only pending events can be approved.');
        }

        $event->update([
            'status' => 'published',
            'rejection_reason' => null,
        ]);

        $event->organizer?->notifyNow(new EventApprovedNotification($event));
        User::query()
            ->whereKeyNot(auth()->id())
            ->whereKeyNot($event->organizer_id)
            ->get()
            ->each(fn (User $user) => $user->notifyNow(new EventPublishedNotification($event)));

        return back()->with('success', 'Event approved.');
    }

    public function reject(Request $request, Event $event): RedirectResponse
    {
        $this->authorize('update', $event);

        $validated = $request->validate([
            'reason' => ['required', 'string', 'max:1000'],
        ]);

        if ($event->status !== 'pending') {
            return back()->with('error', 'Only pending events can be rejected.');
        }

        $event->update([
            'status' => 'rejected',
            'rejection_reason' => $validated['reason'],
        ]);

        $event->organizer?->notifyNow(new EventRejectedNotification($event, $validated['reason']));

        return back()->with('success', 'Event rejected.');
    }

    public function requestChanges(Request $request, Event $event): RedirectResponse
    {
        $this->authorize('update', $event);

        $validated = $request->validate([
            'reason' => ['required', 'string', 'max:1000'],
        ]);

        if ($event->status !== 'pending') {
            return back()->with('error', 'Only pending events can be sent back for changes.');
        }

        $event->update([
            'status' => 'draft',
            'rejection_reason' => $validated['reason'],
        ]);

        $event->organizer?->notifyNow(new EventChangesRequestedNotification($event, $validated['reason']));

        return back()->with('success', 'Changes requested. Event returned to coordinator.');
    }
}
