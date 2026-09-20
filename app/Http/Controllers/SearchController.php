<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\Announcement;
use App\Models\Document;
use App\Models\Event;
use App\Models\News;
use App\Models\PPDB;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $q = trim($request->input('q', ''));

        $news = [];
        $announcements = [];
        $events = [];
        $achievements = [];
        $teachers = [];
        $documents = [];
        $ppdb = null;

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

            $documents = Document::where(function ($query) use ($q) {
                    $query->where('title', 'like', "%{$q}%")
                          ->orWhere('description', 'like', "%{$q}%");
                })
                ->take(4)
                ->get();

            if (stripos('ppdb pendaftaran siswa murid baru formulir registrasi', $q) !== false || preg_match('/ppdb/i', $q)) {
                $ppdb = PPDB::where('is_active', true)->first();
            }
        }

        $totalResults = count($news) + count($announcements) + count($events) + count($achievements) + count($teachers) + count($documents) + ($ppdb ? 1 : 0);

        if ($request->wantsJson() || $request->has('live') || $request->ajax()) {
            return response()->json([
                'query' => $q,
                'total' => $totalResults,
                'news' => $news,
                'announcements' => $announcements,
                'events' => $events,
                'achievements' => $achievements,
                'teachers' => $teachers,
                'documents' => $documents,
                'ppdb' => $ppdb,
            ]);
        }

        return Inertia::render('Public/Search', [
            'query' => $q,
            'news' => $news,
            'announcements' => $announcements,
            'events' => $events,
            'achievements' => $achievements,
            'teachers' => $teachers,
            'documents' => $documents,
            'ppdb' => $ppdb,
        ]);
    }
}
