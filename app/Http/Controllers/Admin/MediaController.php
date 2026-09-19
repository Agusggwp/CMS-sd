<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $media = Media::when($search, function ($query, $search) {
                $query->where('filename', 'like', "%{$search}%")
                      ->orWhere('alt', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(18)
            ->withQueryString();

        return Inertia::render('Admin/Media/Index', [
            'media' => $media,
            'filters' => ['search' => $search],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'files.*' => 'required|file|mimes:jpeg,png,jpg,webp,svg,gif,pdf|max:5120',
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('media', 'public');
                Media::create([
                    'filename' => $file->getClientOriginalName(),
                    'path' => '/storage/' . $path,
                    'type' => $file->getMimeType(),
                    'size' => $file->getSize(),
                    'alt' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                ]);
            }
        }

        return redirect()->route('admin.media.index')->with('success', 'File berhasil diunggah ke galeri media.');
    }

    public function destroy(Media $media): RedirectResponse
    {
        $relativePath = str_replace('/storage/', '', $media->path);
        if (Storage::disk('public')->exists($relativePath)) {
            Storage::disk('public')->delete($relativePath);
        }

        $media->delete();

        return redirect()->route('admin.media.index')->with('success', 'File media berhasil dihapus.');
    }
}
