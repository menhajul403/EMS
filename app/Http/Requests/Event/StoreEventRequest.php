<?php

namespace App\Http\Requests\Event;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->can('event.create');
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:events,slug',
            'short_description' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:event_categories,id',
            'venue_id' => 'nullable|exists:venues,id',
            'start_at' => 'nullable|date',
            'end_at' => 'nullable|date|after_or_equal:start_at',
            'registration_deadline' => 'nullable|date',
            'capacity' => 'nullable|integer|min:0',
        ];
    }
}
