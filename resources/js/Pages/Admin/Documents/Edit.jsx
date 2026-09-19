import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Button from '@/Components/UI/Button';
import { Save } from 'lucide-react';

export default function Edit({ document: doc }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: doc.title || '',
        description: doc.description || '',
        file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/documents/${doc.id}`);
    };

    return (
        <AdminLayout title={`Edit: ${doc.title}`}>
            <PageHeader
                title="Edit Dokumen"
                description={`Ubah rincian berkas "${doc.title}".`}
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
                />

                <Textarea
                    label="Keterangan Isi Dokumen"
                    name="description"
                    rows={3}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    error={errors.description}
                />

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Ganti File Dokumen (Biarkan kosong jika tidak ingin mengubah berkas)
                    </label>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip"
                        onChange={(e) => setData('file', e.target.files[0])}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                        Berkas saat ini: {doc.title} ({doc.size})
                    </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button href="/admin/documents" variant="outline">
                        Batal
                    </Button>
                    <Button type="submit" variant="primary" processing={processing}>
                        <Save className="w-4 h-4" />
                        <span>Simpan Perubahan</span>
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
