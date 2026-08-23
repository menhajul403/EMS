<?php

namespace App\Services;

use App\Models\Certificate;
use App\Models\Registration;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CertificateService
{
    public function generateForRegistration(Registration $registration): Certificate
    {
        $registration->load(['user', 'event']);

        if (! $registration->attended_at) {
            throw new \RuntimeException('Registration has not attended the event.');
        }

        $existing = Certificate::query()->where('registration_id', $registration->id)->first();
        if ($existing && $existing->file_path && is_file(storage_path('app/'.$existing->file_path))) {
            return $existing;
        }

        $year = now()->year;
        $count = Certificate::query()->whereYear('created_at', $year)->count() + 1;
        $number = sprintf('CC-%d-%06d', $year, $count);
        $verification = (string) Str::uuid();

        $html = view('certificates.template', [
            'registration' => $registration,
            'certificate_number' => $number,
            'verification_code' => $verification,
        ])->render();

        $pdf = Pdf::loadHTML($html);
        $fileName = 'certificates/'.$number.'-'.Str::slug($registration->user->name).'.pdf';

        return DB::transaction(function () use ($registration, $existing, $number, $verification, $fileName, $pdf) {
            $fullPath = storage_path('app/'.$fileName);
            $directory = dirname($fullPath);
            if (! is_dir($directory)) {
                mkdir($directory, 0755, true);
            }
            file_put_contents($fullPath, $pdf->output());

            if ($existing) {
                $existing->update([
                    'issued_at' => now(),
                    'file_path' => $fileName,
                ]);

                return $existing->fresh();
            }

            return Certificate::create([
                'registration_id' => $registration->id,
                'certificate_number' => $number,
                'verification_code' => $verification,
                'issued_at' => now(),
                'file_path' => $fileName,
            ]);
        });
    }
}
