<?php

namespace App\Enums;

enum EventStatus: string
{
    case Draft = 'draft';
    case Pending = 'pending';
    case Approved = 'approved';
    case Published = 'published';
    case Ongoing = 'ongoing';
    case Completed = 'completed';
    case Rejected = 'rejected';
    case Cancelled = 'cancelled';
    case Archived = 'archived';

    /**
     * @return list<string>
     */
    public function allowedTransitions(): array
    {
        return match ($this) {
            self::Draft => [self::Pending->value, self::Cancelled->value],
            self::Pending => [self::Approved->value, self::Rejected->value, self::Draft->value],
            self::Approved => [self::Published->value, self::Draft->value, self::Cancelled->value],
            self::Published => [self::Ongoing->value, self::Cancelled->value, self::Archived->value],
            self::Ongoing => [self::Completed->value, self::Cancelled->value],
            self::Completed => [self::Archived->value],
            self::Rejected => [self::Draft->value, self::Archived->value],
            self::Cancelled => [self::Archived->value],
            self::Archived => [],
        };
    }

    public function canTransitionTo(self|string $status): bool
    {
        $target = $status instanceof self ? $status->value : $status;

        return in_array($target, $this->allowedTransitions(), true);
    }
}
