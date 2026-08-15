<?php

namespace App\Http\Controllers\Coordinator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Gallery\StoreGalleryRequest;
use App\Models\Event;
use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(Event $event): Response
    {
        $this->authorize('update', $event);

        $galleries = Gallery::query()
            ->where('event_id', $event->id)
            ->latest()
            ->paginate(12);

        return Inertia::render('Coordinator/Gallery/Index', [
            'event' => $event,
            'galleries' => $galleries,
        ]);
    }

    public function store(StoreGalleryRequest $request, Event $event): RedirectResponse
    {
        $this->authorize('update', $event);

        foreach ($request->file('images', []) as $image) {
            $path = $image->store("galleries/{$event->id}", 'public');

            Gallery::create([
                'event_id' => $event->id,
                'file_path' => $path,
                'caption' => $request->string('caption')->toString() ?: null,
                'uploaded_by' => $request->user()->id,
            ]);
        }

        return back()->with('success', 'Gallery images uploaded.');
    }

    public function destroy(Event $event, Gallery $gallery): RedirectResponse
    {
        $this->authorize('update', $event);

        if ($gallery->event_id !== $event->id) {
            abort(404);
        }

        Storage::disk('public')->delete($gallery->file_path);
        $gallery->delete();

        return back()->with('success', 'Image removed.');
    }
}
