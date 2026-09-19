import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Button from '@/Components/UI/Button';
import { Save } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/documents');
    };

    return (
        <AdminLayout title="Unggah Dokumen Baru">
            <PageHeader
                title="Unggah Dokumen Baru"
                description="Tambahkan dokumen resmi untuk diunduh oleh publik."
                backHref="/admin/documents"
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-4 max-w-2xl">
                <Input
                    label="Nama / Judul Dokumen"
                    name="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    error={errors.title}
                    required
                    placeholder="Contoh: Kalender Pendidikan TA 2026/2027"
                />

                <Textarea
                    label="Keterangan Isi Dokumen (Opsional)"
                    name="description"
                    rows={3}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    error={errors.description}
                    placeholder="Penjelasan singkat isi berkas..."
                />

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Pilih Berkas Dokumen <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="file"
                        required
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip"
                        onChange={(e) => setData('file', e.target.files[0])}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                        Format didukung: PDF, Word (DOC/DOCX), Excel, PPT, ZIP (maksimal 10MB).
                    </p>
                    {errors.file && <p className="mt-1 text-xs text-rose-600">{errors.file}</p>}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button href="/admin/documents" variant="outline">
                        Batal
                    </Button>
                    <Button type="submit" variant="primary" processing={processing}>
                        <Save className="w-4 h-4" />
                        <span>Unggah Dokumen</span>
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
