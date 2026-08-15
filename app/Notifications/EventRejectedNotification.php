<?php

namespace App\Notifications;

use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class EventRejectedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Event $event, public string $reason) {}

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Event Rejected',
            'message' => "Your event \"{$this->event->title}\" was rejected: {$this->reason}",
            'event_id' => $this->event->id,
            'type' => 'event_rejected',
        ];
    }
}
