<?php

namespace App\Notifications;

use App\Models\Event;
use Illuminate\Notifications\Notification;

class EventPublishedNotification extends Notification
{
    public function __construct(public Event $event) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'New Event Is Live',
            'message' => "\"{$this->event->title}\" is now live and open for registration.",
            'event_id' => $this->event->id,
            'event_slug' => $this->event->slug,
            'type' => 'event_published',
        ];
    }
}