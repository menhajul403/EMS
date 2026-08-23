<?php

namespace App\Policies;

use App\Models\Event;
use App\Models\User;

class EventPolicy
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
        return $user->can('event.view');
    }

    public function view(User $user, Event $event): bool
    {
        if ($event->status === 'published') {
            return true;
        }

        return $user->can('event.view')
            && ($user->id === $event->organizer_id || $user->id === $event->faculty_advisor_id);
    }

    public function create(User $user): bool
    {
        return $user->can('event.create');
    }

    public function update(User $user, Event $event): bool
    {
        if ($user->hasRole('Faculty') && ($user->id === $event->faculty_advisor_id
            || ($event->faculty_advisor_id === null && $user->department_id === $event->department_id))) {
            return in_array($event->status, ['pending', 'approved', 'rejected', 'draft'], true);
        }

        if (! $user->can('event.edit')) {
            return false;
        }

        if ($user->hasAnyRole(['University Admin', 'Coordinator'])) {
            return $user->id === $event->organizer_id || $user->hasRole('University Admin');
        }

        return false;
    }

    public function delete(User $user, Event $event): bool
    {
        if (! $user->can('event.delete')) {
            return false;
        }

        return $user->id === $event->organizer_id || $user->hasRole('University Admin');
    }
}
