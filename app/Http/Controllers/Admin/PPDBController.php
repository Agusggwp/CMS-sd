<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PPDB;
use App\Models\PPDBRegistration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PPDBController extends Controller
{
    public function edit(): Response
    {
        $ppdb = PPDB::latest()->first();

        if (!$ppdb) {
            $ppdb = PPDB::create([
                'title' => 'Penerimaan Peserta Didik Baru (PPDB)',
                'academic_year' => date('Y') . '/' . (date('Y') + 1),
                'is_active' => true,
                'is_registration_open' => true,
            ]);
        }

        return Inertia::render('Admin/PPDB/Edit', [
            'ppdb' => $ppdb,
            'stats' => [
                'total' => PPDBRegistration::count(),
                'pending' => PPDBRegistration::where('status', 'pending')->count(),
                'verified' => PPDBRegistration::where('status', 'verified')->count(),
                'accepted' => PPDBRegistration::where('status', 'accepted')->count(),
            ],
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $ppdb = PPDB::latest()->firstOrFail();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'academic_year' => 'required|string|max:50',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'schedule' => 'nullable|string',
            'contact_info' => 'nullable|string',
            'registration_link' => 'nullable|url|max:255',
            'is_active' => 'boolean',
            'is_registration_open' => 'boolean',
            'brochure_file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['is_registration_open'] = $request->boolean('is_registration_open', false);

        if ($request->hasFile('brochure_file')) {
            if ($ppdb->brochure_file && Str::startsWith($ppdb->brochure_file, '/storage/')) {
                Storage::disk('public')->delete(Str::replaceFirst('/storage/', '', $ppdb->brochure_file));
            }
            $path = $request->file('brochure_file')->store('ppdb', 'public');
            $validated['brochure_file'] = '/storage/' . $path;
        }

        $ppdb->update($validated);

        return redirect()->back()->with('success', 'Informasi PPDB berhasil diperbarui.');
    }
}
