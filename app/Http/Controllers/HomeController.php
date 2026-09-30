<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\Announcement;
use App\Models\Event;
use App\Models\Facility;
use App\Models\Gallery;
use App\Models\News;
use App\Models\PPDB;
use App\Models\SchoolSetting;
use App\Models\Teacher;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/Home', [
            'settings' => SchoolSetting::getMergedWithRealData(),
            'latestNews' => News::published()
                ->with('category:id,name,slug')
                ->latest('published_at')
                ->take(4)
                ->get(),
            'announcements' => Announcement::active()
                ->latest()
                ->take(3)
                ->get(),
            'upcomingEvents' => Event::upcoming()
                ->take(3)
                ->get(),
            'teachers' => Teacher::where('is_active', true)
                ->orderByRaw("
                    CASE
                        WHEN LOWER(position) LIKE '%kepala sekolah%' THEN 0
                        WHEN LOWER(position) LIKE '%wakil kepala%'   THEN 1
                        ELSE 2
                    END ASC
                ")
                ->orderBy('order', 'asc')
                ->take(4)
                ->get(),
            'achievements' => Achievement::latest('year')
                ->latest('id')
                ->take(4)
                ->get(),
            'facilities' => Facility::take(6)->get(),
            'galleries' => Gallery::withCount('images')
                ->latest()
                ->take(3)
                ->get(),
            'ppdb' => PPDB::where('is_active', true)->latest()->first(),
        ]);
    }
}
