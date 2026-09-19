<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AchievementController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $achievements = Achievement::when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('participant', 'like', "%{$search}%");
            })
            ->latest('year')
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Achievements/Index', [
            'achievements' => $achievements,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Achievements/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'level' => 'required|string|max:100',
            'year' => 'required|string|max:10',
            'rank' => 'nullable|string|max:100',
            'participant' => 'nullable|string|max:150',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('achievements', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        Achievement::create($validated);

        return redirect()->route('admin.achievements.index')->with('success', 'Data prestasi berhasil ditambahkan.');
    }

    public function edit(Achievement $achievement): Response
    {
        return Inertia::render('Admin/Achievements/Edit', [
            'achievement' => $achievement,
        ]);
    }

    public function update(Request $request, Achievement $achievement): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'level' => 'required|string|max:100',
            'year' => 'required|string|max:10',
            'rank' => 'nullable|string|max:100',
            'participant' => 'nullable|string|max:150',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($achievement->image && Str::startsWith($achievement->image, '/storage/')) {
                Storage::disk('public')->delete(Str::replaceFirst('/storage/', '', $achievement->image));
            }
            $path = $request->file('image')->store('achievements', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $achievement->update($validated);

        return redirect()->route('admin.achievements.index')->with('success', 'Data prestasi berhasil diperbarui.');
    }

    public function destroy(Achievement $achievement): RedirectResponse
    {
        if ($achievement->image && Str::startsWith($achievement->image, '/storage/')) {
            Storage::disk('public')->delete(Str::replaceFirst('/storage/', '', $achievement->image));
        }

        $achievement->delete();

        return redirect()->route('admin.achievements.index')->with('success', 'Data prestasi berhasil dihapus.');
    }
}
