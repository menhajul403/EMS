<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Feedback\StoreFeedbackRequest;
use App\Models\Feedback;
use App\Models\Registration;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FeedbackController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Feedback::class);

        $pending = Registration::query()
            ->with('event')
            ->where('user_id', auth()->id())
            ->whereNotNull('attended_at')
            ->whereDoesntHave('feedback')
            ->whereHas('event', fn ($q) => $q->whereIn('status', ['completed', 'published', 'ongoing']))
            ->latest()
            ->get();

        $submitted = Feedback::query()
            ->with('event')
            ->where('student_id', auth()->id())
            ->latest()
            ->paginate(10);

        return Inertia::render('Student/Feedback/Index', [
            'pending' => $pending,
            'submitted' => $submitted,
        ]);
    }

    public function create(Registration $registration): Response|RedirectResponse
    {
        $this->authorize('create', Feedback::class);

        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        if (! $registration->attended_at) {
            abort(403, 'You must attend the event before submitting feedback.');
        }

        if ($registration->feedback()->exists()) {
            return redirect()->route('student.feedback.index')
                ->with('error', 'Feedback already submitted for this event.');
        }

        return Inertia::render('Student/Feedback/Create', [
            'registration' => $registration->load('event'),
        ]);
    }

    public function store(StoreFeedbackRequest $request, Registration $registration): RedirectResponse
    {
        $this->authorize('create', Feedback::class);

        if ($registration->user_id !== auth()->id() || ! $registration->attended_at) {
            abort(403);
        }

        if ($registration->feedback()->exists()) {
            return back()->with('error', 'Feedback already submitted.');
        }

        Feedback::create([
            'registration_id' => $registration->id,
            'event_id' => $registration->event_id,
            'student_id' => auth()->id(),
            ...$request->validated(),
        ]);

        return redirect()->route('student.feedback.index')->with('success', 'Thank you for your feedback!');
    }
}
