import React, { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/Public/PageHeader';
import Reveal from '@/Components/UI/Reveal';
import {
    GraduationCap,
    CheckCircle2,
    Calendar,
    Phone,
    FileText,
    ExternalLink,
    AlertCircle,
    Download,
    User,
    Users,
    MapPin,
    Lock,
    Send,
    Check,
    Copy,
    ArrowDown,
} from 'lucide-react';

export default function PPDB({ ppdb = null, settings = {}, flash = {} }) {
    const schoolName = settings.school_name || 'SD Negeri Percontohan';
    const academicYear = ppdb?.academic_year || '2026/2027';
    const isRegistrationOpen = Boolean(ppdb?.is_registration_open);

    const formRef = useRef(null);
    const [copied, setCopied] = useState(false);

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        student_name: '',
        nik: '',
        gender: 'L',
        birth_place: '',
        birth_date: '',
        religion: 'Islam',
        previous_school: '',
        address: '',
        parent_name: '',
        parent_phone: '',
        parent_job: '',
        registration_track: 'Zonasi',
        notes: '',
        agreement: false,
    });

    const handleSubmitRegistration = (e) => {
        e.preventDefault();
        post('/ppdb/daftar', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    const copyRegNumber = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const requirements = ppdb?.requirements
        ? ppdb.requirements.split('\n').filter(Boolean)
        : [
              '1. Berusia minimal 6 tahun pada 1 Juli tahun berjalan.',
              '2. Fotokopi Akta Kelahiran resmi (2 lembar).',
              '3. Fotokopi Kartu Keluarga (KK) orang tua/wali.',
              '4. Fotokopi KTP kedua orang tua.',
              '5. Pas foto formal calon siswa ukuran 3x4 berwarna (3 lembar).',
          ];

    const schedules = ppdb?.schedule
        ? ppdb.schedule.split('\n').filter(Boolean)
        : [
              '• Pendaftaran & Verifikasi Dokumen: 2 Mei - 20 Mei 2026',
              '• Observasi Kesiapan & Ramah Anak: 22 - 25 Mei 2026',
              '• Pengumuman Hasil Seleksi: 28 Mei 2026 (Pukul 09.00 WIB)',
              '• Daftar Ulang Peserta Diterima: 30 Mei - 5 Juni 2026',
              '• Masa Pengenalan Lingkungan Sekolah: 13 - 15 Juli 2026',
          ];

    const registeredData = flash?.registered;

    return (
        <PublicLayout
            title={`PPDB Tahun Pelajaran ${academicYear}`}
            description={`Informasi dan formulir pendaftaran peserta didik baru (PPDB) ${schoolName} tahun ajaran ${academicYear}.`}
        >
            <PageHeader
                badge="Penerimaan Siswa Baru"
                title={`PPDB Tahun Pelajaran ${academicYear}`}
                description={`Selamat datang di portal informasi dan pendaftaran calon peserta didik baru ${schoolName}.`}
            />

            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    {/* SUCCESS REGISTRATION BANNER */}
                    {registeredData && (
                        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 text-emerald-950 shadow-sm animate-in fade-in duration-300">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                                    <CheckCircle2 className="w-7 h-7" />
                                </div>
                                <div className="flex-1">
                                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                                        Pendaftaran Berhasil Dikirim!
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                                        Selamat, data pendaftaran telah kami terima.
                                    </h3>
                                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                                        Calon siswa <strong>{registeredData.student_name}</strong> telah terdaftar di jalur <strong>{registeredData.registration_track}</strong>.
                                    </p>

                                    <div className="mt-5 p-4 bg-white rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div>
                                            <span className="text-xs text-slate-400 font-medium block">
                                                Nomor Registrasi Resmi:
                                            </span>
                                            <span className="font-mono text-2xl font-extrabold text-blue-700 tracking-wide">
                                                {registeredData.registration_number}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => copyRegNumber(registeredData.registration_number)}
                                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                                        >
                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            <span>{copied ? 'Tersalin!' : 'Salin Nomor Registrasi'}</span>
                                        </button>
                                    </div>

                                    <p className="text-xs text-emerald-800 mt-3 font-medium">
                                        💡 Harap simpan atau catat nomor registrasi di atas untuk konfirmasi dan verifikasi berkas fisik ke sekretariat sekolah.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* INTRO & QUICK STATUS CARD */}
                    <Reveal animation="fade-in-up">
                        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-2xs hover-lift transition-all">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                        Portal Resmi
                                    </span>
                                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                                        {ppdb?.title || 'Informasi Pendaftaran Siswa Baru'}
                                    </h2>
                                </div>

                                {/* Status Indicator */}
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-slate-500">Status Pendaftaran:</span>
                                    {isRegistrationOpen ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-xs">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            Dibuka Online
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                                            <Lock className="w-3 h-3 text-rose-600" />
                                            Sedang Ditutup
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div
                                className="mt-6 text-sm text-slate-700 leading-relaxed space-y-2"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        ppdb?.description ||
                                        '<p>Kami menyambut hangat calon siswa baru dan keluarga untuk bergabung dalam ekosistem pendidikan sekolah dasar yang ramah anak, berprestasi, dan berakhlak mulia.</p>',
                                }}
                            />

                            {/* Action buttons */}
                            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-4">
                                {isRegistrationOpen ? (
                                    <button
                                        type="button"
                                        onClick={scrollToForm}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md shadow-emerald-600/20 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                                    >
                                        <span>Isi Formulir Pendaftaran Online</span>
                                        <ArrowDown className="w-4 h-4 animate-bounce" />
                                    </button>
                                ) : (
                                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-200 text-slate-600 text-xs font-semibold cursor-not-allowed">
                                        <Lock className="w-4 h-4" />
                                        <span>Pendaftaran Online Ditutup</span>
                                    </div>
                                )}

                                {ppdb?.registration_link && (
                                    <a
                                        href={ppdb.registration_link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        <span>Tautan Formulir Tambahan</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                )}

                                {ppdb?.brochure_file && (
                                    <a
                                        href={ppdb.brochure_file}
                                        download
                                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-300 hover:border-slate-400 hover:shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        <Download className="w-4 h-4 text-blue-600" />
                                        <span>Unduh Brosur PPDB</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </Reveal>

                    {/* 2. FORMULIR PENDAFTARAN ONLINE (KETIKA AKTIF) ATAU PEMBERITAHUAN DITUTUP (KETIKA NONAKTIF) */}
                    <div ref={formRef} className="scroll-mt-8">
                        {isRegistrationOpen ? (
                            <Reveal animation="fade-in-up">
                                <div className="bg-white border-2 border-blue-200 rounded-3xl p-6 sm:p-10 shadow-md">
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                            <GraduationCap className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-extrabold text-slate-900">
                                                Formulir Pendaftaran Siswa Baru
                                            </h3>
                                            <p className="text-xs text-slate-500">
                                                Silakan lengkapi data calon peserta didik baru dan orang tua/wali dengan benar.
                                            </p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmitRegistration} className="space-y-8">
                                        {/* SEKSI 1: DATA CALON SISWA */}
                                        <div>
                                            <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 mb-4 flex items-center gap-1.5 pb-2 border-b border-blue-50">
                                                <User className="w-4 h-4" />
                                                <span>1. Data Calon Siswa</span>
                                            </h4>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="sm:col-span-2">
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Nama Lengkap Anak <span className="text-rose-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.student_name}
                                                        onChange={(e) => setData('student_name', e.target.value)}
                                                        placeholder="Contoh: Muhammad Bintang Pratama"
                                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                    {errors.student_name && (
                                                        <p className="text-[11px] text-rose-500 mt-1">{errors.student_name}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        NIK Calon Siswa (16 Digit)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        maxLength={20}
                                                        value={data.nik}
                                                        onChange={(e) => setData('nik', e.target.value)}
                                                        placeholder="Sesuai Kartu Keluarga (KK)"
                                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    {errors.nik && (
                                                        <p className="text-[11px] text-rose-500 mt-1">{errors.nik}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Jenis Kelamin <span className="text-rose-500">*</span>
                                                    </label>
                                                    <div className="flex items-center gap-6 mt-2">
                                                        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                                                            <input
                                                                type="radio"
                                                                name="gender"
                                                                value="L"
                                                                checked={data.gender === 'L'}
                                                                onChange={(e) => setData('gender', e.target.value)}
                                                                className="text-blue-600 focus:ring-blue-500"
                                                            />
                                                            <span>Laki-laki</span>
                                                        </label>
                                                        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                                                            <input
                                                                type="radio"
                                                                name="gender"
                                                                value="P"
                                                                checked={data.gender === 'P'}
                                                                onChange={(e) => setData('gender', e.target.value)}
                                                                className="text-blue-600 focus:ring-blue-500"
                                                            />
                                                            <span>Perempuan</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Tempat Lahir <span className="text-rose-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.birth_place}
                                                        onChange={(e) => setData('birth_place', e.target.value)}
                                                        placeholder="Contoh: Jakarta / Surabaya"
                                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                    {errors.birth_place && (
                                                        <p className="text-[11px] text-rose-500 mt-1">{errors.birth_place}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Tanggal Lahir <span className="text-rose-500">*</span>
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={data.birth_date}
                                                        onChange={(e) => setData('birth_date', e.target.value)}
                                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                    {errors.birth_date && (
                                                        <p className="text-[11px] text-rose-500 mt-1">{errors.birth_date}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Agama <span className="text-rose-500">*</span>
                                                    </label>
                                                    <select
                                                        value={data.religion}
                                                        onChange={(e) => setData('religion', e.target.value)}
                                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                                        required
                                                    >
                                                        <option value="Islam">Islam</option>
                                                        <option value="Kristen Protestan">Kristen Protestan</option>
                                                        <option value="Katolik">Katolik</option>
                                                        <option value="Hindu">Hindu</option>
                                                        <option value="Buddha">Buddha</option>
                                                        <option value="Khonghucu">Khonghucu</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Asal Sekolah (TK / PAUD)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.previous_school}
                                                        onChange={(e) => setData('previous_school', e.target.value)}
                                                        placeholder="Contoh: TK Pertiwi / PAUD Melati"
                                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* SEKSI 2: DATA ORANG TUA / WALI */}
                                        <div>
                                            <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 mb-4 flex items-center gap-1.5 pb-2 border-b border-blue-50">
                                                <Users className="w-4 h-4" />
                                                <span>2. Data Orang Tua / Wali</span>
                                            </h4>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Nama Lengkap Orang Tua / Wali <span className="text-rose-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.parent_name}
                                                        onChange={(e) => setData('parent_name', e.target.value)}
                                                        placeholder="Nama Ayah / Ibu / Wali"
                                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                    {errors.parent_name && (
                                                        <p className="text-[11px] text-rose-500 mt-1">{errors.parent_name}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        value={data.parent_phone}
                                                        onChange={(e) => setData('parent_phone', e.target.value)}
                                                        placeholder="Contoh: 081234567890"
                                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                    {errors.parent_phone && (
                                                        <p className="text-[11px] text-rose-500 mt-1">{errors.parent_phone}</p>
                                                    )}
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Pekerjaan Orang Tua / Wali
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.parent_job}
                                                        onChange={(e) => setData('parent_job', e.target.value)}
                                                        placeholder="Contoh: Pegawai Negeri, Karyawan Swasta, Wiraswasta"
                                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* SEKSI 3: JALUR & ALAMAT */}
                                        <div>
                                            <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 mb-4 flex items-center gap-1.5 pb-2 border-b border-blue-50">
                                                <MapPin className="w-4 h-4" />
                                                <span>3. Jalur Pendaftaran & Alamat</span>
                                            </h4>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Pilih Jalur Pendaftaran <span className="text-rose-500">*</span>
                                                    </label>
                                                    <select
                                                        value={data.registration_track}
                                                        onChange={(e) => setData('registration_track', e.target.value)}
                                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                                        required
                                                    >
                                                        <option value="Zonasi">Jalur Zonasi (Domisili Terdekat)</option>
                                                        <option value="Afirmasi">Jalur Afirmasi (Keluarga Ekonomi Tidak Mampu)</option>
                                                        <option value="Perpindahan Tugas Orang Tua">Jalur Perpindahan Tugas Orang Tua / Wali</option>
                                                        <option value="Prestasi">Jalur Prestasi (Akademik / Non-Akademik)</option>
                                                        <option value="Reguler">Jalur Reguler / Umum</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Alamat Lengkap Tempat Tinggal <span className="text-rose-500">*</span>
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        value={data.address}
                                                        onChange={(e) => setData('address', e.target.value)}
                                                        placeholder="Nama jalan, RT/RW, Dusun/Kelurahan, Kecamatan, Kota/Kabupaten"
                                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                    {errors.address && (
                                                        <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Catatan Tambahan (Opsional)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.notes}
                                                        onChange={(e) => setData('notes', e.target.value)}
                                                        placeholder="Keterangan khusus anak atau informasi lainnya"
                                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* AGREEMENT & SUBMIT */}
                                        <div className="pt-4 border-t border-slate-200 space-y-4">
                                            <label className="flex items-start gap-2.5 cursor-pointer select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={data.agreement}
                                                    onChange={(e) => setData('agreement', e.target.checked)}
                                                    className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                                                    required
                                                />
                                                <span className="text-xs text-slate-600 leading-relaxed">
                                                    Saya menyatakan bahwa seluruh data yang diisikan adalah benar dan dapat dipertanggungjawabkan sesuai dokumen resmi kependudukan yang sah.
                                                </span>
                                            </label>

                                            <button
                                                type="submit"
                                                disabled={processing || !data.agreement}
                                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-sm font-bold shadow-md shadow-blue-600/20 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:cursor-not-allowed"
                                            >
                                                <Send className="w-4 h-4" />
                                                <span>{processing ? 'Mengirim Data...' : 'Kirim Pendaftaran Sekarang'}</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Reveal>
                        ) : (
                            /* PEMBERITAHUAN FORMULIR DITUTUP */
                            <Reveal animation="fade-in-up">
                                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 sm:p-12 text-center hover-lift transition-all">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-200/80 text-slate-500 flex items-center justify-center mx-auto mb-4">
                                        <Lock className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                                        Formulir Pendaftaran Online Sedang Ditutup
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-2 leading-relaxed">
                                        Pendaftaran online calon peserta didik baru belum dibuka atau periode seleksi telah berakhir.
                                        Silakan perhatikan jadwal seleksi di bawah atau hubungi panitia PPDB untuk informasi pembukaan gelombang berikutnya.
                                    </p>
                                </div>
                            </Reveal>
                        )}
                    </div>

                    {/* REQUIREMENTS CARD */}
                    <Reveal animation="fade-in-up">
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-2xs hover-lift transition-all">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    Syarat Pendaftaran
                                </h3>
                            </div>

                            <div className="space-y-3">
                                {requirements.map((req, idx) => (
                                    <div
                                        key={idx}
                                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 hover:bg-slate-100/80 transition-colors"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
                                        <span>{req.replace(/^\d+\.\s*/, '')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {/* SCHEDULE TIMELINE */}
                    <Reveal animation="fade-in-up">
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-2xs hover-lift transition-all">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    Jadwal Pelaksanaan PPDB
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {schedules.map((sch, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs sm:text-sm text-slate-700 font-medium hover:bg-emerald-50 transition-colors"
                                    >
                                        {sch}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {/* CONTACT PANITIA */}
                    <Reveal animation="fade-in-up">
                        <div className="bg-blue-50/70 border border-blue-200/80 rounded-3xl p-8 text-center space-y-3 hover-lift transition-all">
                            <Phone className="w-8 h-8 text-blue-600 mx-auto animate-pulse-glow" />
                            <h3 className="font-bold text-slate-900 text-base">
                                Bantuan Informasi & Sekretariat PPDB
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                                {ppdb?.contact_info ||
                                    `Sekretariat PPDB dibuka setiap hari kerja pukul 08.00 - 14.00 WIB. Telepon: ${settings.school_phone || '(021) 567-8901'} atau WhatsApp: ${settings.school_whatsapp || '0812-3456-7890'}.`}
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>
        </PublicLayout>
    );
}
