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
        cover_image: null,
        images: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/galleries');
    };

    return (
        <AdminLayout title="Buat Album Galeri">
            <PageHeader
                title="Buat Album Galeri"
                description="Buat album baru dan unggah foto-foto dokumentasi."
                backHref="/admin/galleries"
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-4 max-w-2xl">
                <Input
                    label="Nama / Judul Album"
                    name="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    error={errors.title}
                    required
                    placeholder="Contoh: Perayaan Hari Kemerdekaan RI Ke-81"
                />

                <Textarea
                    label="Deskripsi Album"
                    name="description"
                    rows={3}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    error={errors.description}
                    placeholder="Keterangan singkat momen atau kegiatan dalam album..."
                />

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Foto Sampul Album (Cover)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('cover_image', e.target.files[0])}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Pilih Foto-Foto Kegiatan (Dapat Memilih Banyak Sekaligus)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setData('images', Array.from(e.target.files))}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                        Format didukung: JPG, PNG, WEBP (maksimal 3MB per foto).
                    </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button href="/admin/galleries" variant="outline">
                        Batal
                    </Button>
                    <Button type="submit" variant="primary" processing={processing}>
                        <Save className="w-4 h-4" />
                        <span>Simpan & Buat Album</span>
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
