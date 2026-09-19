import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Button from '@/Components/UI/Button';
import { Save, Users, CheckCircle, Clock, ExternalLink } from 'lucide-react';

export default function Edit({ ppdb, stats = { total: 0, pending: 0, verified: 0, accepted: 0 } }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        title: ppdb.title || '',
        academic_year: ppdb.academic_year || '',
        description: ppdb.description || '',
        requirements: ppdb.requirements || '',
        schedule: ppdb.schedule || '',
        contact_info: ppdb.contact_info || '',
        registration_link: ppdb.registration_link || '',
        is_active: Boolean(ppdb.is_active),
        is_registration_open: Boolean(ppdb.is_registration_open),
        brochure_file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/ppdb');
    };

    return (
        <AdminLayout title="Pengaturan PPDB">
            <PageHeader
                title="Kelola Informasi PPDB"
                description="Atur periode tahun ajaran, syarat, alur seleksi, serta aktif/non-aktifkan formulir pendaftaran online."
                action={
                    <Link
                        href="/admin/ppdb/pendaftar"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                        <Users className="w-4 h-4" />
                        <span>Lihat Data Pendaftar ({stats.total || 0})</span>
                    </Link>
                }
            />

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                        <span className="text-xs font-medium">Total Pendaftar</span>
                        <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-2xl font-extrabold text-slate-900">{stats.total || 0}</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="flex items-center justify-between text-amber-600 mb-1">
                        <span className="text-xs font-medium">Menunggu Verifikasi</span>
                        <Clock className="w-4 h-4" />
                    </div>
                    <div className="text-2xl font-extrabold text-amber-600">{stats.pending || 0}</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="flex items-center justify-between text-blue-600 mb-1">
                        <span className="text-xs font-medium">Sudah Diverifikasi</span>
                        <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="text-2xl font-extrabold text-blue-600">{stats.verified || 0}</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="flex items-center justify-between text-emerald-600 mb-1">
                        <span className="text-xs font-medium">Diterima</span>
                        <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="text-2xl font-extrabold text-emerald-600">{stats.accepted || 0}</div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-6 max-w-4xl">
                {/* 1. SAKLAR / STATUS FORMULIR ONLINE */}
                <div className="p-5 rounded-2xl border-2 transition-all duration-200 bg-slate-50 border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 text-sm">
                                    Formulir Pendaftaran Online
                                </span>
                                {data.is_registration_open ? (
                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                                        SEDANG AKTIF (DIBUKA)
                                    </span>
                                ) : (
                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
                                        NON-AKTIF (DITUTUP)
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 mt-1 max-w-xl">
                                {data.is_registration_open
                                    ? 'Formulir dapat diakses dan diisi langsung oleh calon wali murid melalui website publik.'
                                    : 'Formulir online ditutup. Halaman publik akan menampilkan status "Pendaftaran Sedang Ditutup".'}
                            </p>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
                            <input
                                type="checkbox"
                                checked={data.is_registration_open}
                                onChange={(e) => setData('is_registration_open', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            <span className="ml-3 text-xs font-semibold text-slate-700">
                                {data.is_registration_open ? 'Buka Pendaftaran' : 'Tutup Pendaftaran'}
                            </span>
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                        <Input
                            label="Judul PPDB"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            error={errors.title}
                            required
                        />
                    </div>
                    <Input
                        label="Tahun Pelajaran"
                        name="academic_year"
                        value={data.academic_year}
                        onChange={(e) => setData('academic_year', e.target.value)}
                        error={errors.academic_year}
                        required
                        placeholder="2026/2027"
                    />
                </div>

                <Textarea
                    label="Deskripsi / Pengantar PPDB"
                    name="description"
                    rows={4}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    error={errors.description}
                    helperText="Mendukung format paragraf atau informasi pengantar bagi calon wali murid."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Textarea
                        label="Persyaratan Pendaftaran (Pisahkan per baris)"
                        name="requirements"
                        rows={7}
                        value={data.requirements}
                        onChange={(e) => setData('requirements', e.target.value)}
                        error={errors.requirements}
                    />

                    <Textarea
                        label="Jadwal Pelaksanaan Seleksi (Pisahkan per baris)"
                        name="schedule"
                        rows={7}
                        value={data.schedule}
                        onChange={(e) => setData('schedule', e.target.value)}
                        error={errors.schedule}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Tautan Pendaftaran Eksternal (Opsional)"
                        name="registration_link"
                        value={data.registration_link}
                        onChange={(e) => setData('registration_link', e.target.value)}
                        error={errors.registration_link}
                        placeholder="https://forms.google.com/..."
                        helperText="Isi jika ingin menyertakan link eksternal (misal Google Form)."
                    />

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Unggah Berkas Brosur PPDB (PDF / Gambar)
                        </label>
                        <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={(e) => setData('brochure_file', e.target.files[0])}
                            className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {ppdb.brochure_file && (
                            <p className="text-xs text-slate-400 mt-1">
                                Berkas brosur telah terunggah sebelumnya.
                            </p>
                        )}
                    </div>
                </div>

                <Textarea
                    label="Informasi Kontak & Sekretariat Panitia"
                    name="contact_info"
                    rows={3}
                    value={data.contact_info}
                    onChange={(e) => setData('contact_info', e.target.value)}
                    error={errors.contact_info}
                />

                <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                            className="rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                        />
                        <span>Aktifkan Halaman Informasi PPDB di Navigasi Publik</span>
                    </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Button type="submit" variant="primary" processing={processing}>
                        <Save className="w-4 h-4" />
                        <span>Simpan Pengaturan PPDB</span>
                    </Button>

                    {recentlySuccessful && (
                        <span className="text-xs font-semibold text-emerald-600">
                            Pengaturan PPDB berhasil disimpan!
                        </span>
                    )}
                </div>
            </form>
        </AdminLayout>
    );
}
