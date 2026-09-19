<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use Inertia\Inertia;
use Inertia\Response;

class FacilityController extends Controller
{
    public function index(): Response
    {
        $facilities = Facility::all();

        return Inertia::render('Public/Facilities', [
            'facilities' => $facilities,
        ]);
    }
}
