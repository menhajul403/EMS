<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Registration;
use App\Services\CertificateService;
use Illuminate\Http\RedirectResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CertificateController extends Controller
{
    public function __construct(private CertificateService $certificateService) {}

    public function generate(Registration $registration): BinaryFileResponse|RedirectResponse
    {
        $this->authorize('certificate.generate');

        try {
            $certificate = $this->certificateService->generateForRegistration($registration);
        } catch (\RuntimeException $e) {
            return back()->with('error', $e->getMessage());
        }

        return response()->download(storage_path('app/'.$certificate->file_path));
    }

    public function verify(string $code)
    {
        $cert = Certificate::query()
            ->where('verification_code', $code)
            ->with('registration.event', 'registration.user')
            ->first();

        if (! $cert) {
            abort(404);
        }

        return view('certificates.verify', ['certificate' => $cert]);
    }
}
