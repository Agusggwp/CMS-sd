<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use App\Models\Announcement;
use App\Models\Event;
use App\Models\Gallery;
use App\Models\News;
use App\Models\Teacher;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'news_count' => News::count(),
                'teachers_count' => Teacher::count(),
                'events_count' => Event::count(),
                'announcements_count' => Announcement::count(),
                'galleries_count' => Gallery::count(),
                'achievements_count' => Achievement::count(),
            ],
            'recentNews' => News::with('category:id,name')->latest()->take(5)->get(),
            'upcomingEvents' => Event::where('start_date', '>=', now())->orderBy('start_date', 'asc')->take(5)->get(),
            'recentAnnouncements' => Announcement::latest()->take(4)->get(),
        ]);
    }
}
