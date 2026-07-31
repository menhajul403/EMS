<?php

namespace App\Http\Requests\University;

use Illuminate\Foundation\Http\FormRequest;

class StoreUniversityRequest extends FormRequest
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
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            'short_name' => ['nullable', 'string', 'max:50'],

            'email' => ['nullable', 'email', 'max:255', 'unique:universities,email'],

            'phone' => ['nullable', 'string', 'max:30'],

            'website' => ['nullable', 'url', 'max:255'],

            'address' => ['nullable', 'string'],

            'city' => ['nullable', 'string', 'max:100'],

            'country' => ['required', 'string', 'max:100'],

            'timezone' => ['required', 'string', 'max:100'],

            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],

            'cover_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'University name is required.',
            'email.unique' => 'This university email already exists.',
            'website.url' => 'Please enter a valid website URL.',
            'logo.image' => 'Logo must be an image.',
            'cover_image.image' => 'Cover image must be an image.',
        ];
    }
}