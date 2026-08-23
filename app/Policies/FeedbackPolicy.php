<?php

namespace App\Policies;

use App\Models\Feedback;
use App\Models\User;

class FeedbackPolicy
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
        return $user->can('feedback.view') || $user->can('feedback.create');
    }

    public function view(User $user, Feedback $feedback): bool
    {
        return $user->can('feedback.view') || $user->id === $feedback->student_id;
    }

    public function create(User $user): bool
    {
        return $user->can('feedback.create');
    }
}
