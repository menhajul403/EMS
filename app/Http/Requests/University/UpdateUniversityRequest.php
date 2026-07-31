<?php

namespace App\Http\Requests\University;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUniversityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->hasRole('Super Admin');
    }

    /**
     * Validation rules.
     */
    public function rules(): array
    {
        $university = $this->route('university');

        return [
            'name' => ['required', 'string', 'max:255'],

            'short_name' => ['nullable', 'string', 'max:50'],

            'email' => [
                'nullable',
                'email',
                'max:255',
                Rule::unique('universities', 'email')->ignore($university),
            ],

            'phone' => ['nullable', 'string', 'max:30'],

            'website' => ['nullable', 'url', 'max:255'],

            'address' => ['nullable', 'string'],

            'city' => ['nullable', 'string', 'max:100'],

            'country' => ['required', 'string', 'max:100'],

            'timezone' => ['required', 'string', 'max:100'],

            'status' => ['required', Rule::in(['active', 'inactive', 'suspended'])],

            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],

            'cover_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ];
    }
}