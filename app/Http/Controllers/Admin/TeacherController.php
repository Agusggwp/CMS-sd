<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TeacherController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $teachers = Teacher::when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('position', 'like', "%{$search}%");
            })
            ->orderBy('order', 'asc')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Teachers/Index', [
            'teachers' => $teachers,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Teachers/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'nip' => 'nullable|string|max:50',
            'position' => 'required|string|max:100',
            'subject' => 'nullable|string|max:100',
            'bio' => 'nullable|string|max:500',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'order' => 'integer|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('teachers', 'public');
            $validated['photo'] = '/storage/' . $path;
        }

        Teacher::create($validated);

        return redirect()->route('admin.teachers.index')->with('success', 'Data guru berhasil ditambahkan.');
    }

    public function edit(Teacher $teacher): Response
    {
        return Inertia::render('Admin/Teachers/Edit', [
            'teacher' => $teacher,
        ]);
    }

    public function update(Request $request, Teacher $teacher): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'nip' => 'nullable|string|max:50',
            'position' => 'required|string|max:100',
            'subject' => 'nullable|string|max:100',
            'bio' => 'nullable|string|max:500',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'order' => 'integer|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);

        if ($request->hasFile('photo')) {
            if ($teacher->photo && Str::startsWith($teacher->photo, '/storage/')) {
                Storage::disk('public')->delete(Str::replaceFirst('/storage/', '', $teacher->photo));
            }
            $path = $request->file('photo')->store('teachers', 'public');
            $validated['photo'] = '/storage/' . $path;
        }

        $teacher->update($validated);

        return redirect()->route('admin.teachers.index')->with('success', 'Data guru berhasil diperbarui.');
    }

    public function destroy(Teacher $teacher): RedirectResponse
    {
        if ($teacher->photo && Str::startsWith($teacher->photo, '/storage/')) {
            Storage::disk('public')->delete(Str::replaceFirst('/storage/', '', $teacher->photo));
        }

        $teacher->delete();

        return redirect()->route('admin.teachers.index')->with('success', 'Data guru berhasil dihapus.');
    }
}
