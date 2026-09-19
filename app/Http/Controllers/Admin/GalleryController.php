<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\GalleryImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $galleries = Gallery::withCount('images')
            ->latest()
            ->paginate(12);

        return Inertia::render('Admin/Galleries/Index', [
            'galleries' => $galleries,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Galleries/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . time();

        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('galleries', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        }

        $gallery = Gallery::create($validated);

        // Upload additional images
        if ($request->hasFile('images')) {
            $order = 1;
            foreach ($request->file('images') as $img) {
                $imgPath = $img->store('galleries/photos', 'public');
                GalleryImage::create([
                    'gallery_id' => $gallery->id,
                    'image' => '/storage/' . $imgPath,
                    'caption' => null,
                    'order' => $order++,
                ]);
            }
        }

        return redirect()->route('admin.galleries.index')->with('success', 'Album galeri berhasil dibuat.');
    }

    public function edit(Gallery $gallery): Response
    {
        $gallery->load(['images' => fn ($q) => $q->orderBy('order', 'asc')]);

        return Inertia::render('Admin/Galleries/Edit', [
            'gallery' => $gallery,
        ]);
    }

    public function update(Request $request, Gallery $gallery): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
        ]);

        if ($request->hasFile('cover_image')) {
            if ($gallery->cover_image && Str::startsWith($gallery->cover_image, '/storage/')) {
                Storage::disk('public')->delete(Str::replaceFirst('/storage/', '', $gallery->cover_image));
            }
            $path = $request->file('cover_image')->store('galleries', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        }

        $gallery->update($validated);

        if ($request->hasFile('images')) {
            $maxOrder = GalleryImage::where('gallery_id', $gallery->id)->max('order') ?? 0;
            foreach ($request->file('images') as $img) {
                $imgPath = $img->store('galleries/photos', 'public');
                GalleryImage::create([
                    'gallery_id' => $gallery->id,
                    'image' => '/storage/' . $imgPath,
                    'caption' => null,
                    'order' => ++$maxOrder,
                ]);
            }
        }

        return redirect()->route('admin.galleries.index')->with('success', 'Album galeri berhasil diperbarui.');
    }

    public function destroyImage(GalleryImage $image): RedirectResponse
    {
        if ($image->image && Str::startsWith($image->image, '/storage/')) {
            Storage::disk('public')->delete(Str::replaceFirst('/storage/', '', $image->image));
        }

        $image->delete();

        return redirect()->back()->with('success', 'Foto berhasil dihapus dari album.');
    }

    public function destroy(Gallery $gallery): RedirectResponse
    {
        if ($gallery->cover_image && Str::startsWith($gallery->cover_image, '/storage/')) {
            Storage::disk('public')->delete(Str::replaceFirst('/storage/', '', $gallery->cover_image));
        }

        foreach ($gallery->images as $img) {
            if ($img->image && Str::startsWith($img->image, '/storage/')) {
                Storage::disk('public')->delete(Str::replaceFirst('/storage/', '', $img->image));
            }
        }

        $gallery->delete();

        return redirect()->route('admin.galleries.index')->with('success', 'Album galeri berhasil dihapus.');
    }
}
