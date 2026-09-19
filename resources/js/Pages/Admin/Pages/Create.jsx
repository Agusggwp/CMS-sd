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
        content: '',
        meta_title: '',
        meta_description: '',
        is_published: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/pages');
    };

    return (
        <AdminLayout title="Tambah Halaman Baru">
            <PageHeader
                title="Tambah Halaman Baru"
                description="Buat halaman informasi khusus sekolah baru."
                backHref="/admin/pages"
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-4 max-w-3xl">
                <Input
                    label="Judul Halaman"
                    name="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    error={errors.title}
                    required
                    placeholder="Contoh: Tata Tertib Peserta Didik"
                />

                <Textarea
                    label="Isi Konten Halaman (Mendukung Format HTML)"
                    name="content"
                    rows={12}
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    error={errors.content}
                    required
                    placeholder="Tuliskan isi halaman secara detail..."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                    <Input
                        label="Meta Title (SEO)"
                        name="meta_title"
                        value={data.meta_title}
                        onChange={(e) => setData('meta_title', e.target.value)}
                    />
                    <Input
                        label="Meta Description (SEO)"
                        name="meta_description"
                        value={data.meta_description}
                        onChange={(e) => setData('meta_description', e.target.value)}
                    />
                </div>

                <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700">
                        <input
                            type="checkbox"
                            checked={data.is_published}
                            onChange={(e) => setData('is_published', e.target.checked)}
                            className="rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                        />
                        <span>Langsung Publikasikan Halaman Ini</span>
                    </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button href="/admin/pages" variant="outline">
                        Batal
                    </Button>
                    <Button type="submit" variant="primary" processing={processing}>
                        <Save className="w-4 h-4" />
                        <span>Simpan Halaman</span>
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
