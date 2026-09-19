<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AchievementController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $level = $request->input('level');

        $achievements = Achievement::when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('participant', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($level, function ($query, $level) {
                $query->where('level', 'like', "%{$level}%");
            })
            ->latest('year')
            ->latest('id')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Public/Achievements', [
            'achievements' => $achievements,
            'filters' => [
                'search' => $search,
                'level' => $level,
            ],
        ]);
    }
}
