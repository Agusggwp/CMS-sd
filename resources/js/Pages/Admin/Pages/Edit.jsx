import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Button from '@/Components/UI/Button';
import { Save } from 'lucide-react';

export default function Edit({ page }) {
    const { data, setData, put, processing, errors } = useForm({
        title: page.title || '',
        content: page.content || '',
        meta_title: page.meta_title || '',
        meta_description: page.meta_description || '',
        is_published: Boolean(page.is_published),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/pages/${page.id}`);
    };

    return (
        <AdminLayout title={`Edit Halaman: ${page.title}`}>
            <PageHeader
                title="Edit Halaman Statis"
                description={`Ubah informasi halaman "${page.title}".`}
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
                />

                <Textarea
                    label="Isi Konten Halaman"
                    name="content"
                    rows={12}
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    error={errors.content}
                    required
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
                        <span>Simpan Perubahan</span>
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
