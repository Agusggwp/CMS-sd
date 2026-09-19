<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class FacilityController extends Controller
{
    public function index(): Response
    {
        $facilities = Facility::latest()->paginate(10);

        return Inertia::render('Admin/Facilities/Index', [
            'facilities' => $facilities,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Facilities/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('facilities', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        Facility::create($validated);

        return redirect()->route('admin.facilities.index')->with('success', 'Data fasilitas berhasil ditambahkan.');
    }

    public function edit(Facility $facility): Response
    {
        return Inertia::render('Admin/Facilities/Edit', [
            'facility' => $facility,
        ]);
    }

    public function update(Request $request, Facility $facility): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
        ]);

        if ($request->hasFile('image')) {
            if ($facility->image && Str::startsWith($facility->image, '/storage/')) {
                Storage::disk('public')->delete(Str::replaceFirst('/storage/', '', $facility->image));
            }
            $path = $request->file('image')->store('facilities', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $facility->update($validated);

        return redirect()->route('admin.facilities.index')->with('success', 'Data fasilitas berhasil diperbarui.');
    }

    public function destroy(Facility $facility): RedirectResponse
    {
        if ($facility->image && Str::startsWith($facility->image, '/storage/')) {
            Storage::disk('public')->delete(Str::replaceFirst('/storage/', '', $facility->image));
        }

        $facility->delete();

        return redirect()->route('admin.facilities.index')->with('success', 'Data fasilitas berhasil dihapus.');
    }
}
