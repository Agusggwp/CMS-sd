<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $upcomingEvents = Event::where('start_date', '>=', now())
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhere('location', 'like', "%{$search}%");
                });
            })
            ->orderBy('start_date', 'asc')
            ->paginate(6, ['*'], 'upcoming_page');

        $pastEvents = Event::where('start_date', '<', now())
            ->orderBy('start_date', 'desc')
            ->take(6)
            ->get();

        return Inertia::render('Public/Events', [
            'upcomingEvents' => $upcomingEvents,
            'pastEvents' => $pastEvents,
            'filters' => ['search' => $search],
        ]);
    }
}
