import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import {
    Settings,
    ToggleLeft,
    ToggleRight,
    FileText,
    Save,
    CheckCircle,
    AlertCircle,
    ExternalLink,
} from 'lucide-react';

export default function TeacherSubmissionsSettings({ formSetting }) {
    const { flash = {} } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        is_open:        formSetting?.is_open ?? true,
        title:          formSetting?.title || 'Form Pengisian Data Guru',
        description:    formSetting?.description || '',
        closed_message: formSetting?.closed_message || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/teacher-submissions/settings', { preserveScroll: true });
    };

    return (
        <AdminLayout title="Pengaturan Form Guru">
            <PageHeader
                title="Pengaturan Form Guru"
                description="Kelola form pengisian data guru mandiri — buka, tutup, dan edit konten form."
                backHref="/admin/teacher-submissions"
            />

            {/* Flash */}
            {flash.success && (
                <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-700 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0" /> {flash.success}
                </div>
            )}

            <div className="max-w-2xl space-y-6">
                {/* Link ke form publik */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-blue-800">Link Form Publik (untuk Guru)</p>
                        <p className="text-xs text-blue-500 mt-0.5">/guru/daftar</p>
                    </div>
                    <a
                        href="/guru/daftar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Buka Link
                    </a>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4">
                        <h2 className="text-base font-bold text-white flex items-center gap-2">
                            <Settings className="w-4 h-4" /> Konfigurasi Form
                        </h2>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Toggle buka/tutup */}
                        <div>
                            <p className="text-sm font-bold text-slate-700 mb-3">Status Form</p>
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => setData('is_open', true)}
                                    className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                                        data.is_open
                                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                            : 'border-slate-200 text-slate-400 hover:border-slate-300'
                                    }`}
                                >
                                    <ToggleRight className={`w-5 h-5 ${data.is_open ? 'text-emerald-500' : 'text-slate-300'}`} />
                                    Buka Form
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('is_open', false)}
                                    className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                                        !data.is_open
                                            ? 'border-rose-500 bg-rose-50 text-rose-700'
                                            : 'border-slate-200 text-slate-400 hover:border-slate-300'
                                    }`}
                                >
                                    <ToggleLeft className={`w-5 h-5 ${!data.is_open ? 'text-rose-500' : 'text-slate-300'}`} />
                                    Tutup Form
                                </button>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                Saat form ditutup, guru tidak dapat mengisi data. Pesan penutupan akan ditampilkan.
                            </p>
                        </div>

                        <div className="border-t border-dashed border-slate-200" />

                        {/* Judul form */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                                <FileText className="w-4 h-4 text-slate-400" /> Judul Form
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Form Pengisian Data Guru"
                                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                                    errors.title
                                        ? 'border-rose-300 focus:ring-rose-100'
                                        : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
                                }`}
                            />
                            {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
                        </div>

                        {/* Deskripsi form (tampil saat form terbuka) */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Deskripsi Form
                                <span className="ml-1 text-xs text-slate-400 font-normal">(tampil saat form terbuka)</span>
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                                placeholder="Silakan isi data Anda dengan lengkap dan benar..."
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-blue-400 focus:ring-blue-100 resize-none"
                            />
                        </div>

                        {/* Pesan saat form tutup */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Pesan Form Ditutup
                                <span className="ml-1 text-xs text-slate-400 font-normal">(tampil saat form ditutup)</span>
                            </label>
                            <textarea
                                value={data.closed_message}
                                onChange={(e) => setData('closed_message', e.target.value)}
                                rows={2}
                                placeholder="Mohon maaf, form pengisian data guru saat ini sedang ditutup..."
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-blue-400 focus:ring-blue-100 resize-none"
                            />
                        </div>

                        {/* Submit */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-3">
                            <a
                                href="/admin/teacher-submissions"
                                className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors"
                            >
                                Kembali
                            </a>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-60"
                            >
                                <Save className="w-4 h-4" />
                                {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
