<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PPDBRegistration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PPDBRegistrationController extends Controller
{
    public function index(Request $request): Response
    {
        $query = PPDBRegistration::query()->latest();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('student_name', 'like', "%{$search}%")
                  ->orWhere('registration_number', 'like', "%{$search}%")
                  ->orWhere('nik', 'like', "%{$search}%")
                  ->orWhere('parent_name', 'like', "%{$search}%")
                  ->orWhere('parent_phone', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('track')) {
            $query->where('registration_track', $request->input('track'));
        }

        $registrations = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/PPDB/Registrations', [
            'registrations' => $registrations,
            'filters' => $request->only(['search', 'status', 'track']),
            'stats' => [
                'total' => PPDBRegistration::count(),
                'pending' => PPDBRegistration::where('status', 'pending')->count(),
                'verified' => PPDBRegistration::where('status', 'verified')->count(),
                'accepted' => PPDBRegistration::where('status', 'accepted')->count(),
                'rejected' => PPDBRegistration::where('status', 'rejected')->count(),
            ],
        ]);
    }

    public function updateStatus(Request $request, PPDBRegistration $registration): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,verified,accepted,rejected',
        ]);

        $registration->update($validated);

        return redirect()->back()->with('success', "Status pendaftar {$registration->student_name} berhasil diperbarui menjadi {$registration->status}.");
    }

    public function destroy(PPDBRegistration $registration): RedirectResponse
    {
        $name = $registration->student_name;
        $registration->delete();

        return redirect()->back()->with('success', "Data pendaftaran {$name} berhasil dihapus.");
    }
}
