import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Select from '@/Components/UI/Select';
import Button from '@/Components/UI/Button';
import { Save } from 'lucide-react';

export default function Create({ categories = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category_id: categories.length > 0 ? categories[0].id : '',
        excerpt: '',
        content: '',
        image: null,
        status: 'published',
        published_at: new Date().toISOString().slice(0, 16),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/news');
    };

    return (
        <AdminLayout title="Tulis Berita Baru">
            <PageHeader
                title="Tulis Berita Baru"
                description="Publikasikan liputan berita atau artikel kegiatan sekolah terbaru."
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
                    placeholder="Contoh: Upacara Peringatan Hari Pendidikan Nasional 2026"
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
                            { value: 'published', label: 'Terbitkan Langsung (Published)' },
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
                    placeholder="Ringkasan 1-2 kalimat pengantar berita..."
                    helperText="Jika dikosongkan, sistem akan otomatis mengambil kutipan dari isi konten berita."
                />

                <Textarea
                    label="Konten Lengkap Berita (Mendukung HTML)"
                    name="content"
                    rows={10}
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    error={errors.content}
                    required
                    placeholder="Tuliskan berita lengkap di sini. Anda juga dapat menggunakan tag HTML seperti <p>, <b>, <i>, <ul>, <li>..."
                />

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Gambar Sampul Utama (Opsional)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('image', e.target.files[0])}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {errors.image && <p className="mt-1.5 text-xs text-rose-600">{errors.image}</p>}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button href="/admin/news" variant="outline">
                        Batal
                    </Button>
                    <Button type="submit" variant="primary" processing={processing}>
                        <Save className="w-4 h-4" />
                        <span>Simpan & Terbitkan</span>
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
