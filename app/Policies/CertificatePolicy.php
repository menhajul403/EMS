<?php

namespace App\Policies;

use App\Models\Certificate;
use App\Models\Registration;
use App\Models\User;

class CertificatePolicy
{
    public function before(User $user, string $ability): ?bool
    {
        if ($user->hasRole('Super Admin')) {
            return true;
        }

        return null;
    }

    public function viewAny(User $user): bool
    {
        return $user->can('certificate.view');
    }

    public function view(User $user, Certificate $certificate): bool
    {
        return $user->id === $certificate->registration?->user_id
            || ($user->can('certificate.generate') && $certificate->registration?->event?->organizer_id === $user->id);
    }

    public function create(User $user, Registration $registration): bool
    {
        return ($user->can('certificate.generate') && $registration->event?->organizer_id === $user->id)
            || ($user->can('certificate.view') && $registration->user_id === $user->id);
    }
}
