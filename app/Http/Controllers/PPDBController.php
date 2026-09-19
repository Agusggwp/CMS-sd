<?php

namespace App\Http\Controllers;

use App\Models\PPDB;
use App\Models\PPDBRegistration;
use App\Models\SchoolSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PPDBController extends Controller
{
    public function index(): Response
    {
        $ppdb = PPDB::where('is_active', true)->latest()->first();

        return Inertia::render('Public/PPDB', [
            'ppdb' => $ppdb,
            'settings' => SchoolSetting::getAll(),
            'flash' => [
                'registered' => session('registered_data'),
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $ppdb = PPDB::where('is_active', true)->latest()->first();

        if (!$ppdb || !$ppdb->is_registration_open) {
            return redirect()->back()->with('error', 'Mohon maaf, formulir pendaftaran online saat ini sedang ditutup atau belum dibuka.');
        }

        $validated = $request->validate([
            'student_name' => 'required|string|max:255',
            'nik' => 'nullable|string|digits_between:10,20',
            'gender' => 'required|in:L,P',
            'birth_place' => 'required|string|max:100',
            'birth_date' => 'required|date',
            'religion' => 'required|string|max:50',
            'previous_school' => 'nullable|string|max:255',
            'address' => 'required|string|max:500',
            'parent_name' => 'required|string|max:255',
            'parent_phone' => 'required|string|max:30',
            'parent_job' => 'nullable|string|max:100',
            'registration_track' => 'required|string|max:50',
            'notes' => 'nullable|string|max:500',
        ], [
            'student_name.required' => 'Nama lengkap calon siswa wajib diisi.',
            'gender.required' => 'Jenis kelamin wajib dipilih.',
            'birth_place.required' => 'Tempat lahir wajib diisi.',
            'birth_date.required' => 'Tanggal lahir wajib diisi.',
            'religion.required' => 'Agama wajib dipilih.',
            'address.required' => 'Alamat tempat tinggal wajib diisi.',
            'parent_name.required' => 'Nama orang tua / wali wajib diisi.',
            'parent_phone.required' => 'Nomor WhatsApp / telepon wajib diisi.',
            'registration_track.required' => 'Jalur pendaftaran wajib dipilih.',
        ]);

        $validated['registration_number'] = PPDBRegistration::generateRegistrationNumber();
        $validated['status'] = 'pending';

        $registration = PPDBRegistration::create($validated);

        return redirect()->route('ppdb.index')->with('registered_data', [
            'registration_number' => $registration->registration_number,
            'student_name' => $registration->student_name,
            'registration_track' => $registration->registration_track,
            'created_at' => $registration->created_at->format('d F Y, H:i'),
        ])->with('success', "Pendaftaran online berhasil! Nomor registrasi Anda: {$registration->registration_number}");
    }
}
