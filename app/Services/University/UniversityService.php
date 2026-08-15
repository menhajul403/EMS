<?php

namespace App\Services\University;

use App\Models\University;
use Illuminate\Support\Str;

class UniversityService
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function store(array $data): University
    {
        if (empty($data['slug']) && ! empty($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        return University::create($data);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(University $university, array $data): University
    {
        if (isset($data['name']) && empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $university->update($data);

        return $university->fresh();
    }
}
