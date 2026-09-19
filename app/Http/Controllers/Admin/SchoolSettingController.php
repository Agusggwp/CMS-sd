<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SchoolSettingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/School/Settings', [
            'settings' => SchoolSetting::getAll(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->except(['_token', 'school_logo', 'principal_photo', 'favicon']);

        // Handle file uploads
        if ($request->hasFile('school_logo')) {
            $request->validate(['school_logo' => 'image|mimes:jpeg,png,jpg,webp,svg|max:2048']);
            $path = $request->file('school_logo')->store('settings', 'public');
            SchoolSetting::set('school_logo', '/storage/' . $path);
        }

        if ($request->hasFile('principal_photo')) {
            $request->validate(['principal_photo' => 'image|mimes:jpeg,png,jpg,webp|max:2048']);
            $path = $request->file('principal_photo')->store('settings', 'public');
            SchoolSetting::set('principal_photo', '/storage/' . $path);
        }

        if ($request->hasFile('favicon')) {
            $request->validate(['favicon' => 'image|mimes:png,ico,svg|max:1024']);
            $path = $request->file('favicon')->store('settings', 'public');
            SchoolSetting::set('favicon', '/storage/' . $path);
        }

        foreach ($data as $key => $val) {
            SchoolSetting::set($key, $val);
        }

        return redirect()->back()->with('success', 'Pengaturan sekolah berhasil diperbarui!');
    }
}
