<?php

namespace App\Http\Controllers;

use App\Models\SchoolSetting;
use App\Models\Teacher;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/About', [
            'settings' => SchoolSetting::getAll(),
            'principal' => Teacher::where('position', 'like', '%Kepala Sekolah%')->first(),
        ]);
    }
}
