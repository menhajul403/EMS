<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Certificate;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\Feedback;
use App\Models\Registration;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {
        $this->authorize('report.view');

        return Inertia::render('Reports/Index', [
            'filters' => $request->only(['type', 'from', 'to', 'category_id', 'status']),
            'categories' => EventCategory::orderBy('name')->get(['id', 'name']),
            'summary' => [
                'events' => Event::count(),
                'registrations' => Registration::count(),
                'attendance' => Attendance::count(),
                'certificates' => Certificate::count(),
                'feedback' => Feedback::count(),
            ],
        ]);
    }

    public function events(Request $request): Response
    {
        $this->authorize('report.view');

        $query = Event::query()->with(['category', 'venue', 'department'])->latest();

        if ($status = $request->string('status')->trim()->toString()) {
            $query->where('status', $status);
        }

        if ($categoryId = $request->integer('category_id')) {
            $query->where('category_id', $categoryId);
        }

        if ($from = $request->string('from')->trim()->toString()) {
            $query->whereDate('start_at', '>=', $from);
        }

        if ($to = $request->string('to')->trim()->toString()) {
            $query->whereDate('start_at', '<=', $to);
        }

        return Inertia::render('Reports/Events', [
            'events' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only(['status', 'category_id', 'from', 'to']),
            'categories' => EventCategory::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function registrations(Request $request): Response
    {
        $this->authorize('report.view');

        $query = Registration::query()->with(['user', 'event'])->latest();

        if ($status = $request->string('status')->trim()->toString()) {
            $query->where('status', $status);
        }

        if ($eventId = $request->integer('event_id')) {
            $query->where('event_id', $eventId);
        }

        return Inertia::render('Reports/Registrations', [
            'registrations' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only(['status', 'event_id']),
            'events' => Event::orderBy('title')->get(['id', 'title']),
        ]);
    }

    public function exportEvents(Request $request): StreamedResponse
    {
        $this->authorize('report.view');

        $events = Event::query()
            ->with(['category', 'venue'])
            ->when($request->status, fn ($q, $status) => $q->where('status', $status))
            ->orderBy('start_at')
            ->get();

        return response()->streamDownload(function () use ($events) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Title', 'Status', 'Category', 'Venue', 'Start', 'Capacity', 'Registrations']);

            foreach ($events as $event) {
                fputcsv($handle, [
                    $event->title,
                    $event->status,
                    $event->category?->name,
                    $event->venue?->name,
                    $event->start_at?->toDateTimeString(),
                    $event->capacity,
                    $event->registrations()->where('status', 'registered')->count(),
                ]);
            }

            fclose($handle);
        }, 'events-report.csv');
    }
}
