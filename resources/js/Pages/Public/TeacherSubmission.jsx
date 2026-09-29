import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import {
    User,
    Camera,
    CheckCircle2,
    Lock,
    AlertCircle,
    Send,
    ChevronRight,
    ArrowLeft,
} from 'lucide-react';

export default function TeacherSubmission({ formSetting }) {
    const { flash = {}, school_settings = {} } = usePage().props;
    const schoolName = school_settings.school_name || 'SD Negeri Percontohan';

    const isOpen      = Boolean(formSetting?.is_open);
    const pageTitle   = formSetting?.title || 'Form Pengisian Data Guru';
    const [previewUrl, setPreviewUrl] = useState(null);
    const [submitted,  setSubmitted]  = useState(Boolean(flash.success));

    const { data, setData, post, processing, errors, reset } = useForm({
        name:     '',
        nip:      '',
        email:    '',
        phone:    '',
        position: '',
        subject:  '',
        bio:      '',
        photo:    null,
    });

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setData('photo', file);
        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/guru/daftar', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setPreviewUrl(null);
                setSubmitted(true);
            },
        });
    };

    return (
        <PublicLayout
            title={pageTitle}
            description="Form pengisian data guru secara mandiri. Data akan ditampilkan setelah disetujui admin."
        >
            {/* Latar belakang abu-ungu muda ala Google Forms */}
            <div className="min-h-screen bg-[#f0ebf8]">
                <main className="w-full max-w-[640px] mx-auto px-3 py-6 pb-24 space-y-3">

                    {/* ── HEADER CARD ── */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
                        <div className="h-2.5 bg-gradient-to-r from-purple-600 to-purple-400" />
                        <div className="px-6 py-5">
                            <h1 className="text-2xl font-normal text-gray-800 leading-tight">
                                {pageTitle}
                            </h1>
                            {isOpen && (
                                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                    {formSetting?.description ||
                                        'Silakan isi data Anda dengan lengkap dan benar. Data akan ditampilkan di halaman website setelah disetujui oleh admin sekolah.'}
                                </p>
                            )}
                            {isOpen && (
                                <p className="mt-3 text-xs text-gray-500 border-t border-gray-100 pt-3">
                                    Kolom bertanda <span className="text-red-500 font-semibold">*</span> wajib diisi.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ── ERROR FLASH ── */}
                    {flash.error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-start gap-3 shadow-sm">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-red-700">Terjadi Kesalahan</p>
                                <p className="text-sm text-red-600 mt-0.5">{flash.error}</p>
                            </div>
                        </div>
                    )}

                    {/* ── FORM DITUTUP ── */}
                    {!isOpen ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="w-8 h-8 text-gray-400" />
                            </div>
                            <h2 className="text-lg font-medium text-gray-700 mb-2">Form Tidak Tersedia</h2>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                                {formSetting?.closed_message ||
                                    'Mohon maaf, form pengisian data guru saat ini sedang ditutup. Silakan hubungi admin sekolah.'}
                            </p>
                            <a
                                href="/guru"
                                className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-purple-600 hover:text-purple-800"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Kembali ke Halaman Guru
                            </a>
                        </div>

                    ) : submitted ? (
                        /* ── SUKSES ── */
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-12 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-green-500" />
                            </div>
                            <h2 className="text-xl font-normal text-gray-800 mb-2">Respons Anda Telah Disimpan</h2>
                            <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                                {flash.success ||
                                    'Terima kasih! Data Anda sedang menunggu persetujuan admin. Profil Anda akan tampil setelah diverifikasi.'}
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center justify-center gap-1"
                                >
                                    Kirim Respons Lain
                                </button>
                                <a
                                    href="/guru"
                                    className="text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1"
                                >
                                    Lihat Halaman Guru <ChevronRight className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>

                    ) : (
                        /* ── FORM ── */
                        <form onSubmit={handleSubmit} noValidate className="space-y-3">

                            {/* Foto Profil */}
                            <FormCard>
                                <QuestionLabel label="Foto Profil" />
                                <p className="text-xs text-gray-400 mb-4">Format JPG, PNG, WebP. Maks. 2 MB</p>
                                <div className="flex flex-col items-center gap-3">
                                    <div className="relative">
                                        <div
                                            className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center cursor-pointer hover:border-purple-400 transition-colors"
                                            onClick={() => document.getElementById('photo-input').click()}
                                        >
                                            {previewUrl ? (
                                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-10 h-10 text-gray-300" />
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById('photo-input').click()}
                                            className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center shadow-md hover:bg-purple-700 transition-colors"
                                        >
                                            <Camera className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                    <input
                                        id="photo-input"
                                        type="file"
                                        accept="image/jpeg,image/png,image/jpg,image/webp"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="photo-input"
                                        className="text-sm text-purple-600 font-medium cursor-pointer hover:underline"
                                    >
                                        {previewUrl ? 'Ganti Foto' : 'Pilih Foto'}
                                    </label>
                                </div>
                                {errors.photo && <FieldError msg={errors.photo} />}
                            </FormCard>

                            {/* Nama Lengkap */}
                            <FormCard isFirst>
                                <QuestionLabel label="Nama Lengkap & Gelar" required />
                                <GFormInput
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Contoh: Budi Santoso, S.Pd."
                                    error={errors.name}
                                    autoComplete="name"
                                />
                                {errors.name && <FieldError msg={errors.name} />}
                            </FormCard>

                            {/* NIP */}
                            <FormCard>
                                <QuestionLabel label="NIP (Nomor Induk Pegawai)" />
                                <p className="text-xs text-gray-400 mb-3">Kosongkan jika belum memiliki NIP</p>
                                <GFormInput
                                    type="text"
                                    value={data.nip}
                                    onChange={(e) => setData('nip', e.target.value)}
                                    placeholder="19830921 200604 1 001"
                                    error={errors.nip}
                                    inputMode="numeric"
                                />
                                {errors.nip && <FieldError msg={errors.nip} />}
                            </FormCard>

                            {/* Email */}
                            <FormCard>
                                <QuestionLabel label="Alamat Email" required />
                                <GFormInput
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="nama@gmail.com"
                                    error={errors.email}
                                    autoComplete="email"
                                    inputMode="email"
                                />
                                {errors.email && <FieldError msg={errors.email} />}
                            </FormCard>

                            {/* No. Telepon */}
                            <FormCard>
                                <QuestionLabel label="No. Telepon / WhatsApp" />
                                <GFormInput
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="08123456789"
                                    error={errors.phone}
                                    inputMode="tel"
                                    autoComplete="tel"
                                />
                                {errors.phone && <FieldError msg={errors.phone} />}
                            </FormCard>

                            {/* Jabatan */}
                            <FormCard>
                                <QuestionLabel label="Jabatan / Tugas Tambahan" required />
                                <GFormInput
                                    type="text"
                                    value={data.position}
                                    onChange={(e) => setData('position', e.target.value)}
                                    placeholder="Wali Kelas 5A / Guru Matematika / Kepala Sekolah"
                                    error={errors.position}
                                />
                                {errors.position && <FieldError msg={errors.position} />}
                            </FormCard>

                            {/* Mata Pelajaran */}
                            <FormCard>
                                <QuestionLabel label="Mata Pelajaran yang Diampu" />
                                <GFormInput
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    placeholder="Tematik / Matematika / Bahasa Indonesia"
                                    error={errors.subject}
                                />
                                {errors.subject && <FieldError msg={errors.subject} />}
                            </FormCard>

                            {/* Bio */}
                            <FormCard>
                                <QuestionLabel label="Profil Singkat (Bio)" />
                                <p className="text-xs text-gray-400 mb-3">
                                    Ceritakan latar belakang pendidikan dan pengalaman mengajar Anda
                                </p>
                                <GFormTextarea
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    placeholder="Saya lulusan Universitas ... jurusan ... Saya telah mengajar selama ... tahun di bidang ..."
                                    error={errors.bio}
                                    maxLength={1000}
                                />
                                <div className="flex justify-end mt-1">
                                    <span className={`text-xs ${data.bio.length > 900 ? 'text-orange-500' : 'text-gray-400'}`}>
                                        {data.bio.length}/1000
                                    </span>
                                </div>
                                {errors.bio && <FieldError msg={errors.bio} />}
                            </FormCard>

                            {/* Tombol Kirim */}
                            <div className="flex items-center justify-between pt-1">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 px-7 py-3 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:opacity-60 text-white text-sm font-medium rounded-md transition-colors shadow-sm"
                                >
                                    {processing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Mengirim...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Kirim
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (window.confirm('Hapus semua jawaban yang sudah diisi?')) {
                                            reset();
                                            setPreviewUrl(null);
                                        }
                                    }}
                                    className="text-sm text-gray-500 hover:text-gray-700 font-medium px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                                >
                                    Hapus Formulir
                                </button>
                            </div>

                            <p className="text-xs text-gray-400 text-center pb-4">
                                Jangan kirim sandi atau informasi sensitif melalui form ini.
                            </p>
                        </form>
                    )}

                    {/* Footer mini */}
                    <div className="text-center pt-2 pb-6 text-xs text-gray-400 space-x-3">
                        <a href="/" className="hover:underline">{schoolName}</a>
                        <span>·</span>
                        <a href="/guru" className="hover:underline">Halaman Guru</a>
                    </div>
                </main>
            </div>
        </PublicLayout>
    );
}

/* ─── Sub-komponen ─── */

function FormCard({ children, isFirst }) {
    return (
        <div className={`bg-white rounded-xl shadow-sm border overflow-hidden ${
            isFirst ? 'border-l-4 border-purple-500 border-t border-r border-b border-gray-200' : 'border-gray-200'
        }`}>
            <div className="px-5 py-5">
                {children}
            </div>
        </div>
    );
}

function QuestionLabel({ label, required }) {
    return (
        <p className="text-sm font-normal text-gray-800 mb-4 leading-snug">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </p>
    );
}

function GFormInput({ error, ...props }) {
    return (
        <input
            {...props}
            className={`w-full border-b-2 border-t-0 border-l-0 border-r-0 rounded-none px-0 py-2 text-sm text-gray-800 bg-transparent placeholder-gray-400 outline-none transition-colors focus:border-purple-600 ${
                error ? 'border-red-400' : 'border-gray-300'
            }`}
        />
    );
}

function GFormTextarea({ error, ...props }) {
    return (
        <textarea
            {...props}
            rows={4}
            className={`w-full border-b-2 border-t-0 border-l-0 border-r-0 rounded-none px-0 py-2 text-sm text-gray-800 bg-transparent placeholder-gray-400 outline-none resize-none transition-colors focus:border-purple-600 ${
                error ? 'border-red-400' : 'border-gray-300'
            }`}
        />
    );
}

function FieldError({ msg }) {
    return (
        <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            {msg}
        </p>
    );
}
