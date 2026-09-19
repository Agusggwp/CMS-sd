<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $categorySlug = $request->input('category');

        $categories = NewsCategory::withCount(['news' => fn ($q) => $q->published()])->get();

        $news = News::published()
            ->with(['category:id,name,slug', 'author:id,name'])
            ->when($categorySlug, function ($query, $categorySlug) {
                $query->whereHas('category', function ($q) use ($categorySlug) {
                    $q->where('slug', $categorySlug);
                });
            })
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('excerpt', 'like', "%{$search}%")
                      ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->latest('published_at')
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('Public/News/Index', [
            'news' => $news,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'category' => $categorySlug,
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $article = News::published()
            ->with(['category:id,name,slug', 'author:id,name'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Increment views
        $article->increment('views');

        // Related news
        $relatedNews = News::published()
            ->where('id', '!=', $article->id)
            ->when($article->category_id, function ($q) use ($article) {
                $q->where('category_id', $article->category_id);
            })
            ->latest('published_at')
            ->take(3)
            ->get();

        $categories = NewsCategory::withCount(['news' => fn ($q) => $q->published()])->get();

        return Inertia::render('Public/News/Show', [
            'article' => $article,
            'relatedNews' => $relatedNews,
            'categories' => $categories,
        ]);
    }
}
