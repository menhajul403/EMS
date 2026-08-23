<?php

namespace App\Http\Controllers\University;

use App\Http\Controllers\Controller;
use App\Models\Club;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ClubController extends Controller
{
    public function index(): Response
    {
        $this->authorize('club.view');

        return Inertia::render('University/Clubs/Index', [
            'clubs' => Club::query()->with('department')->orderBy('name')->paginate(15),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('club.create');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:clubs,slug'],
            'description' => ['nullable', 'string', 'max:2000'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        Club::create([
            ...$validated,
            'slug' => $validated['slug'] ?? Str::slug($validated['name']),
        ]);

        return back()->with('success', 'Club created.');
    }

    public function update(Request $request, Club $club): RedirectResponse
    {
        $this->authorize('club.edit');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:clubs,slug,'.$club->id],
            'description' => ['nullable', 'string', 'max:2000'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        $club->update($validated);

        return back()->with('success', 'Club updated.');
    }

    public function destroy(Club $club): RedirectResponse
    {
        $this->authorize('club.delete');
        $club->delete();

        return back()->with('success', 'Club deleted.');
    }
}
