<?php

namespace App\Http\Controllers;

use App\Models\SchoolSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/Contact', [
            'settings' => SchoolSetting::getAll(),
        ]);
    }

    public function submit(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:150',
            'message' => 'required|string|max:1000',
        ]);

        // Feedback to user
        return back()->with('success', 'Terima kasih! Pesan Anda telah kami terima dan akan segera kami tanggapi.');
    }
}
