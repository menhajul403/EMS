<?php

namespace App\Http\Requests\Event;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->can('event.edit');
    }

    public function rules(): array
    {
        $eventId = $this->route('event')?->id ?? null;

        return [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:events,slug,'.$eventId,
            'short_description' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:event_categories,id',
            'venue_id' => 'nullable|exists:venues,id',
            'department_id' => 'nullable|exists:departments,id',
            'club_id' => 'nullable|exists:clubs,id',
            'faculty_advisor_id' => 'nullable|exists:users,id',
            'start_at' => 'nullable|date',
            'end_at' => 'nullable|date|after_or_equal:start_at',
            'registration_deadline' => 'nullable|date',
            'capacity' => 'nullable|integer|min:0',
        ];
    }
}
