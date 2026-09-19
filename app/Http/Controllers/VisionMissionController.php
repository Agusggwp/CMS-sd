<?php

namespace App\Http\Controllers;

use App\Models\SchoolSetting;
use Inertia\Inertia;
use Inertia\Response;

class VisionMissionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/VisionMission', [
            'settings' => SchoolSetting::getAll(),
        ]);
    }
}
