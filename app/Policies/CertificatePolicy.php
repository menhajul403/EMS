<?php

namespace App\Policies;

use App\Models\Certificate;
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
        return $user->can('certificate.view')
            && ($user->can('certificate.generate') || $user->id === $certificate->registration?->user_id);
    }

    public function create(User $user): bool
    {
        return $user->can('certificate.generate');
    }
}
