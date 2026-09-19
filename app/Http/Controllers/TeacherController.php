<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeacherController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $teachers = Teacher::where('is_active', true)
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('position', 'like', "%{$search}%")
                      ->orWhere('subject', 'like', "%{$search}%");
                });
            })
            ->orderBy('order', 'asc')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Public/Teachers', [
            'teachers' => $teachers,
            'filters' => ['search' => $search],
        ]);
    }
}
