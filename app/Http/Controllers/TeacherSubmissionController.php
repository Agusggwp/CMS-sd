<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\TeacherFormSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TeacherSubmissionController extends Controller
{
    /**
     * Tampilkan form pengisian data guru (publik).
     */
    public function create(): Response
    {
        $setting = TeacherFormSetting::current();

        return Inertia::render('Public/TeacherSubmission', [
            'formSetting' => $setting,
        ]);
    }

    /**
     * Simpan data yang dikirim guru.
     */
    public function store(Request $request): RedirectResponse
    {
        $setting = TeacherFormSetting::current();

        if (!$setting->is_open) {
            return redirect()->back()->with('error', 'Form pengisian data guru sedang ditutup.');
        }

        $validated = $request->validate([
            'name'     => 'required|string|max:150',
            'nip'      => 'nullable|string|max:50',
            'email'    => 'required|email|max:150',
            'phone'    => 'nullable|string|max:20',
            'position' => 'required|string|max:100',
            'subject'  => 'nullable|string|max:100',
            'bio'      => 'nullable|string|max:1000',
            'photo'    => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $validated['is_active']         = false;   // tidak tampil dulu
        $validated['submission_status'] = 'pending';
        $validated['is_self_submitted'] = true;
        $validated['order']             = 0;

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('teachers', 'public');
            $validated['photo'] = '/storage/' . $path;
        }

        Teacher::create($validated);

        return redirect()->route('teacher.submission.create')
            ->with('success', 'Data Anda berhasil dikirim! Silakan tunggu persetujuan dari admin.');
    }
}
