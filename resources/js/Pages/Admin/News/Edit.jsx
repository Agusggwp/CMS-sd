import React from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Select from '@/Components/UI/Select';
import Button from '@/Components/UI/Button';
import { Save } from 'lucide-react';

export default function Edit({ article, categories = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: article.title || '',
        category_id: article.category_id || '',
        excerpt: article.excerpt || '',
        content: article.content || '',
        image: null,
        status: article.status || 'published',
        published_at: article.published_at ? article.published_at.slice(0, 16) : '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/news/${article.id}`);
    };

    return (
        <AdminLayout title={`Edit: ${article.title}`}>
            <PageHeader
                title="Edit Berita"
                description={`Mengubah informasi artikel "${article.title}".`}
                backHref="/admin/news"
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-5 max-w-4xl">
                <Input
                    label="Judul Berita"
                    name="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    error={errors.title}
                    required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                        label="Kategori Berita"
                        name="category_id"
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                        options={categories.map((c) => ({ value: c.id, label: c.name }))}
                        error={errors.category_id}
                        required
                    />
                    <Select
                        label="Status Publikasi"
                        name="status"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        options={[
                            { value: 'published', label: 'Terbitkan (Published)' },
                            { value: 'draft', label: 'Simpan Sebagai Draf' },
                        ]}
                        error={errors.status}
                        required
                    />
                </div>

                <Textarea
                    label="Ringkasan Singkat (Excerpt)"
                    name="excerpt"
                    rows={2}
                    value={data.excerpt}
                    onChange={(e) => setData('excerpt', e.target.value)}
                    error={errors.excerpt}
                />

                <Textarea
                    label="Konten Lengkap Berita (Mendukung HTML)"
                    name="content"
                    rows={10}
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    error={errors.content}
                    required
                />

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Ubah Gambar Sampul
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('image', e.target.files[0])}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {article.image && (
                        <div className="mt-3 flex items-center gap-3">
                            <span className="text-xs text-slate-400">Gambar saat ini:</span>
                            <img src={article.image} alt={article.title} className="w-16 h-12 object-cover rounded-lg" />
                        </div>
                    )}
                    {errors.image && <p className="mt-1.5 text-xs text-rose-600">{errors.image}</p>}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button href="/admin/news" variant="outline">
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
