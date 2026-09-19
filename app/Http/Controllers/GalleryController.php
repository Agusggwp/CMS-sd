<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $galleries = Gallery::withCount('images')
            ->latest()
            ->paginate(9);

        return Inertia::render('Public/Gallery/Index', [
            'galleries' => $galleries,
        ]);
    }

    public function show(string $slug): Response
    {
        $gallery = Gallery::with(['images' => fn ($q) => $q->orderBy('order', 'asc')])
            ->where('slug', $slug)
            ->firstOrFail();

        $otherGalleries = Gallery::where('id', '!=', $gallery->id)
            ->withCount('images')
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Public/Gallery/Show', [
            'gallery' => $gallery,
            'otherGalleries' => $otherGalleries,
        ]);
    }
}
