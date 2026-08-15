<?php

namespace App\Http\Controllers\Coordinator;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Registration;
use App\Services\CertificateService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CertificateBulkController extends Controller
{
    public function __construct(private CertificateService $certificateService) {}

    public function index(Event $event): Response
    {
        $this->authorize('update', $event);

        $registrations = Registration::query()
            ->with(['user', 'certificate'])
            ->where('event_id', $event->id)
            ->whereNotNull('attended_at')
            ->latest()
            ->paginate(20);

        return Inertia::render('Coordinator/Certificates/Index', [
            'event' => $event,
            'registrations' => $registrations,
        ]);
    }

    public function generateAll(Event $event): RedirectResponse
    {
        $this->authorize('update', $event);

        $registrations = Registration::query()
            ->where('event_id', $event->id)
            ->whereNotNull('attended_at')
            ->whereDoesntHave('certificate')
            ->get();

        $generated = 0;

        foreach ($registrations as $registration) {
            try {
                $this->certificateService->generateForRegistration($registration);
                $generated++;
            } catch (\Throwable) {
                continue;
            }
        }

        return back()->with('success', "{$generated} certificate(s) generated.");
    }
}
