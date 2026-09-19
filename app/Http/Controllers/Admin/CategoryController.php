<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $categories = NewsCategory::withCount('news')
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Categories/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:news_categories,name',
            'description' => 'nullable|string|max:255',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        NewsCategory::create($validated);

        return redirect()->route('admin.categories.index')->with('success', 'Kategori berita berhasil ditambahkan.');
    }

    public function edit(NewsCategory $category): Response
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, NewsCategory $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:news_categories,name,' . $category->id,
            'description' => 'nullable|string|max:255',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $category->update($validated);

        return redirect()->route('admin.categories.index')->with('success', 'Kategori berita berhasil diperbarui.');
    }

    public function destroy(NewsCategory $category): RedirectResponse
    {
        $category->delete();

        return redirect()->route('admin.categories.index')->with('success', 'Kategori berita berhasil dihapus.');
    }
}
