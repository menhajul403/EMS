<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CertificateController extends Controller
{
    public function generate(Registration $registration)
    {
        $this->authorize('certificate.generate');

        // Only allow if attended
        if (! $registration->attended_at) {
            return back()->with('error','Certificate can only be generated for attended registrations.');
        }

        // Check existing
        $existing = Certificate::where('registration_id', $registration->id)->first();
        if ($existing) {
            return response()->download(storage_path('app/' . $existing->file_path));
        }

        // Create certificate number
        $year = now()->year;
        $count = Certificate::whereYear('created_at', $year)->count() + 1;
        $number = sprintf('CC-%d-%06d', $year, $count);

        $verification = (string) Str::uuid();

        // Render view HTML
        $html = view('certificates.template', [
            'registration' => $registration,
            'certificate_number' => $number,
            'verification_code' => $verification,
        ])->render();

        // Generate PDF using DOMPDF
        if (! class_exists('\\Barryvdh\\DomPDF\\Facade')) {
            return back()->with('error','PDF generation library not installed. Run composer require barryvdh/laravel-dompdf');
        }

        $pdf = \Barryvdh\DomPDF\Facade::loadHTML($html);
        $fileName = 'certificates/'.$number.'-'.Str::slug($registration->user->name).'.pdf';
        Storage::put($fileName, $pdf->output());

        $cert = Certificate::create([
            'registration_id' => $registration->id,
            'certificate_number' => $number,
            'verification_code' => $verification,
            'issued_at' => now(),
            'file_path' => $fileName,
        ]);

        return response()->download(storage_path('app/' . $fileName));
    }

    public function verify($code)
    {
        $cert = Certificate::where('verification_code', $code)->with('registration.event','registration.user')->first();
        if (! $cert) {
            abort(404);
        }

        return view('certificates.verify', ['certificate' => $cert]);
    }
}
