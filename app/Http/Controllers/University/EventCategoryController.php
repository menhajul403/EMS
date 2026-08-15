<?php

namespace App\Http\Controllers\University;

use App\Http\Controllers\Controller;
use App\Models\EventCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EventCategoryController extends Controller
{
    public function index(): Response
    {
        $this->authorize('category.view');

        return Inertia::render('University/Categories/Index', [
            'categories' => EventCategory::orderBy('name')->paginate(15),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('category.create');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:event_categories,slug'],
        ]);

        EventCategory::create([
            'name' => $validated['name'],
            'slug' => $validated['slug'] ?? Str::slug($validated['name']),
        ]);

        return back()->with('success', 'Category created.');
    }

    public function update(Request $request, EventCategory $category): RedirectResponse
    {
        $this->authorize('category.edit');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:event_categories,slug,'.$category->id],
        ]);

        $category->update($validated);

        return back()->with('success', 'Category updated.');
    }

    public function destroy(EventCategory $category): RedirectResponse
    {
        $this->authorize('category.delete');

        $category->delete();

        return back()->with('success', 'Category deleted.');
    }
}
