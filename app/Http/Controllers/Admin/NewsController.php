<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\NewsCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $status = $request->input('status');

        $news = News::with(['category:id,name', 'author:id,name'])
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/News/Index', [
            'news' => $news,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    public function create(): Response
    {
        $categories = NewsCategory::orderBy('name')->get();

        return Inertia::render('Admin/News/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:news_categories,id',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
        ]);

        $validated['user_id'] = $request->user()->id;
        $validated['slug'] = Str::slug($validated['title']);

        // Check unique slug
        $originalSlug = $validated['slug'];
        $count = 1;
        while (News::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = "{$originalSlug}-{$count}";
            $count++;
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('news', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        News::create($validated);

        return redirect()->route('admin.news.index')->with('success', 'Berita berhasil diterbitkan/disimpan.');
    }

    public function edit(News $news): Response
    {
        $categories = NewsCategory::orderBy('name')->get();

        return Inertia::render('Admin/News/Edit', [
            'article' => $news,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, News $news): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:news_categories,id',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
        ]);

        if ($validated['title'] !== $news->title) {
            $validated['slug'] = Str::slug($validated['title']);
            $originalSlug = $validated['slug'];
            $count = 1;
            while (News::where('slug', $validated['slug'])->where('id', '!=', $news->id)->exists()) {
                $validated['slug'] = "{$originalSlug}-{$count}";
                $count++;
            }
        }

        if ($request->hasFile('image')) {
            // Delete old file if exists
            if ($news->image && Str::startsWith($news->image, '/storage/')) {
                Storage::disk('public')->delete(Str::replaceFirst('/storage/', '', $news->image));
            }
            $path = $request->file('image')->store('news', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $news->update($validated);

        return redirect()->route('admin.news.index')->with('success', 'Berita berhasil diperbarui.');
    }

    public function destroy(News $news): RedirectResponse
    {
        if ($news->image && Str::startsWith($news->image, '/storage/')) {
            Storage::disk('public')->delete(Str::replaceFirst('/storage/', '', $news->image));
        }

        $news->delete();

        return redirect()->route('admin.news.index')->with('success', 'Berita berhasil dihapus.');
    }
}
