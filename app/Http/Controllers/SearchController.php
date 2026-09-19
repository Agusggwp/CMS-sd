<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\Announcement;
use App\Models\Event;
use App\Models\News;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function index(Request $request): Response
    {
        $q = trim($request->input('q', ''));

        $news = [];
        $announcements = [];
        $events = [];
        $achievements = [];
        $teachers = [];

        if ($q !== '') {
            $news = News::published()
                ->where(function ($query) use ($q) {
                    $query->where('title', 'like', "%{$q}%")
                          ->orWhere('content', 'like', "%{$q}%");
                })
                ->with('category:id,name,slug')
                ->take(6)
                ->get();

            $announcements = Announcement::active()
                ->where(function ($query) use ($q) {
                    $query->where('title', 'like', "%{$q}%")
                          ->orWhere('content', 'like', "%{$q}%");
                })
                ->take(4)
                ->get();

            $events = Event::where(function ($query) use ($q) {
                    $query->where('title', 'like', "%{$q}%")
                          ->orWhere('description', 'like', "%{$q}%")
                          ->orWhere('location', 'like', "%{$q}%");
                })
                ->take(4)
                ->get();

            $achievements = Achievement::where(function ($query) use ($q) {
                    $query->where('title', 'like', "%{$q}%")
                          ->orWhere('participant', 'like', "%{$q}%")
                          ->orWhere('description', 'like', "%{$q}%");
                })
                ->take(4)
                ->get();

            $teachers = Teacher::where('is_active', true)
                ->where(function ($query) use ($q) {
                    $query->where('name', 'like', "%{$q}%")
                          ->orWhere('position', 'like', "%{$q}%")
                          ->orWhere('subject', 'like', "%{$q}%");
                })
                ->take(4)
                ->get();
        }

        return Inertia::render('Public/Search', [
            'query' => $q,
            'news' => $news,
            'announcements' => $announcements,
            'events' => $events,
            'achievements' => $achievements,
            'teachers' => $teachers,
        ]);
    }
}
