<?php

namespace App\Policies;

use App\Models\Registration;
use App\Models\User;

class RegistrationPolicy
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
        return $user->hasRole('Student') || $user->can('registration.view');
    }

    public function view(User $user, Registration $registration): bool
    {
        return $user->id === $registration->user_id || $user->can('registration.view');
    }

    public function create(User $user): bool
    {
        return $user->hasRole('Student');
    }

    public function update(User $user, Registration $registration): bool
    {
        return $user->id === $registration->user_id || $user->can('registration.approve');
    }

    public function delete(User $user, Registration $registration): bool
    {
        return $user->id === $registration->user_id;
    }
}
