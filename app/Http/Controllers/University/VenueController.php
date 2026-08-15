<?php

namespace App\Http\Controllers\University;

use App\Http\Controllers\Controller;
use App\Models\Venue;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VenueController extends Controller
{
    public function index(): Response
    {
        $this->authorize('venue.view');

        return Inertia::render('University/Venues/Index', [
            'venues' => Venue::orderBy('name')->paginate(15),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('venue.create');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:500'],
            'capacity' => ['nullable', 'integer', 'min:1'],
        ]);

        Venue::create($validated);

        return back()->with('success', 'Venue created.');
    }

    public function update(Request $request, Venue $venue): RedirectResponse
    {
        $this->authorize('venue.edit');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:500'],
            'capacity' => ['nullable', 'integer', 'min:1'],
        ]);

        $venue->update($validated);

        return back()->with('success', 'Venue updated.');
    }

    public function destroy(Venue $venue): RedirectResponse
    {
        $this->authorize('venue.delete');

        $venue->delete();

        return back()->with('success', 'Venue deleted.');
    }
}
