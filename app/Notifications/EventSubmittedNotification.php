<?php

namespace App\Notifications;

use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class EventSubmittedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Event $event) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Event Submitted for Approval',
            'message' => "The event \"{$this->event->title}\" is waiting for your approval.",
            'event_id' => $this->event->id,
            'event_slug' => $this->event->slug,
            'action_url' => route('faculty.events.index'),
            'type' => 'event_submitted',
        ];
    }
}