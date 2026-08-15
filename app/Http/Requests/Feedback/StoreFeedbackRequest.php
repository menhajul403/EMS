<?php

namespace App\Http\Requests\Feedback;

use Illuminate\Foundation\Http\FormRequest;

class StoreFeedbackRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasRole('Student') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'rating_overall' => ['required', 'integer', 'min:1', 'max:5'],
            'rating_speaker' => ['nullable', 'integer', 'min:1', 'max:5'],
            'rating_organization' => ['nullable', 'integer', 'min:1', 'max:5'],
            'rating_venue' => ['nullable', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:2000'],
            'suggestions' => ['nullable', 'string', 'max:2000'],
        ];
    }
}
