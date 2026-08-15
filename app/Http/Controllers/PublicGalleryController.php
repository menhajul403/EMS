<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Inertia\Inertia;
use Inertia\Response;

class PublicGalleryController extends Controller
{
    public function index(): Response
    {
        $galleries = Gallery::query()
            ->with(['event:id,title,slug', 'uploadedBy:id,name'])
            ->latest()
            ->paginate(24)
            ->through(fn (Gallery $gallery) => [
                ...$gallery->toArray(),
                'url' => asset('storage/'.$gallery->file_path),
            ]);

        return Inertia::render('Public/Gallery', [
            'galleries' => $galleries,
        ]);
    }
}
