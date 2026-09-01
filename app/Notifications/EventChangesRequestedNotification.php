<?php

namespace App\Notifications;

use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class EventChangesRequestedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Event $event, public string $reason) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Changes Requested',
            'message' => "Changes were requested for your event \"{$this->event->title}\": {$this->reason}",
            'event_id' => $this->event->id,
            'event_slug' => $this->event->slug,
            'action_url' => route('coordinator.events.edit', $this->event->id),
            'type' => 'event_changes_requested',
        ];
    }
}
