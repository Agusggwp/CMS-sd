<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\TeacherFormSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TeacherSubmissionAdminController extends Controller
{
    /**
     * Daftar semua pengajuan guru yang masuk (self-submitted).
     */
    public function index(Request $request): Response
    {
        $status  = $request->input('status', 'pending');
        $search  = $request->input('search');
        $setting = TeacherFormSetting::current();

        $submissions = Teacher::where('is_self_submitted', true)
            ->when($status !== 'all', fn ($q) => $q->where('submission_status', $status))
            ->when($search, function ($q, $search) {
                $q->where(function ($inner) use ($search) {
                    $inner->where('name', 'like', "%{$search}%")
                          ->orWhere('email', 'like', "%{$search}%")
                          ->orWhere('position', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $stats = [
            'pending'  => Teacher::where('is_self_submitted', true)->where('submission_status', 'pending')->count(),
            'approved' => Teacher::where('is_self_submitted', true)->where('submission_status', 'approved')->count(),
            'rejected' => Teacher::where('is_self_submitted', true)->where('submission_status', 'rejected')->count(),
            'total'    => Teacher::where('is_self_submitted', true)->count(),
        ];

        return Inertia::render('Admin/TeacherSubmissions/Index', [
            'submissions'  => $submissions,
            'stats'        => $stats,
            'filters'      => ['status' => $status, 'search' => $search],
            'formSetting'  => $setting,
        ]);
    }

    /**
     * Approve pengajuan guru → tampil di web.
     */
    public function approve(Teacher $teacher): RedirectResponse
    {
        $teacher->update([
            'submission_status' => 'approved',
            'is_active'         => true,
            'rejection_reason'  => null,
        ]);

        return redirect()->back()->with('success', "Data {$teacher->name} telah disetujui dan akan tampil di website.");
    }

    /**
     * Reject pengajuan guru.
     */
    public function reject(Request $request, Teacher $teacher): RedirectResponse
    {
        $request->validate([
            'rejection_reason' => 'required|string|max:500',
        ]);

        // Hapus foto jika ada agar tidak membuang storage
        if ($teacher->photo && Str::startsWith($teacher->photo, '/storage/')) {
            Storage::disk('public')->delete(Str::replaceFirst('/storage/', '', $teacher->photo));
        }

        $teacher->update([
            'submission_status' => 'rejected',
            'is_active'         => false,
            'rejection_reason'  => $request->rejection_reason,
        ]);

        return redirect()->back()->with('success', "Pengajuan {$teacher->name} telah ditolak.");
    }

    /**
     * Pengaturan form guru (buka / tutup / edit teks).
     */
    public function settings(): Response
    {
        return Inertia::render('Admin/TeacherSubmissions/Settings', [
            'formSetting' => TeacherFormSetting::current(),
        ]);
    }

    /**
     * Update pengaturan form.
     */
    public function updateSettings(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'is_open'        => 'required|boolean',
            'title'          => 'required|string|max:255',
            'description'    => 'nullable|string|max:1000',
            'closed_message' => 'nullable|string|max:500',
        ]);

        $setting = TeacherFormSetting::current();
        $setting->update($validated);

        $status = $validated['is_open'] ? 'dibuka' : 'ditutup';
        return redirect()->back()->with('success', "Form pengisian data guru berhasil {$status}.");
    }

    /**
     * Toggle buka/tutup form secara cepat (1 klik).
     */
    public function toggleForm(): RedirectResponse
    {
        $setting          = TeacherFormSetting::current();
        $setting->is_open = !$setting->is_open;
        $setting->save();

        $status = $setting->is_open ? 'dibuka' : 'ditutup';
        return redirect()->back()->with('success', "Form pengisian data guru berhasil {$status}.");
    }
}
