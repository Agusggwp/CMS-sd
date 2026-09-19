import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Button from '@/Components/UI/Button';
import Dialog from '@/Components/UI/Dialog';
import { Save, Trash2, Plus } from 'lucide-react';

export default function Edit({ gallery }) {
    const [deleteImageId, setDeleteImageId] = useState(null);
    const [processingDelete, setProcessingDelete] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: gallery.title || '',
        description: gallery.description || '',
        cover_image: null,
        images: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/galleries/${gallery.id}`);
    };

    const confirmDeleteImage = () => {
        if (!deleteImageId) return;
        setProcessingDelete(true);
        router.delete(`/admin/gallery-images/${deleteImageId}`, {
            preserveScroll: true,
            onFinish: () => {
                setProcessingDelete(false);
                setDeleteImageId(null);
            },
        });
    };

    return (
        <AdminLayout title={`Edit Album: ${gallery.title}`}>
            <PageHeader
                title="Edit Album Galeri"
                description={`Kelola album "${gallery.title}" dan foto-foto di dalamnya.`}
                backHref="/admin/galleries"
            />

            <div className="space-y-8 max-w-4xl">
                {/* Edit Album Details */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-4">
                    <Input
                        label="Nama / Judul Album"
                        name="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        error={errors.title}
                        required
                    />

                    <Textarea
                        label="Deskripsi Album"
                        name="description"
                        rows={3}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        error={errors.description}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Ubah Cover Album
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
                                Tambah Foto Baru (Multiple)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => setData('images', Array.from(e.target.files))}
                                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                        <Button href="/admin/galleries" variant="outline">
                            Batal
                        </Button>
                        <Button type="submit" variant="primary" processing={processing}>
                            <Save className="w-4 h-4" />
                            <span>Simpan Perubahan & Unggah Foto</span>
                        </Button>
                    </div>
                </form>

                {/* Existing Photos Grid with delete option */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs">
                    <h3 className="text-base font-bold text-slate-900 mb-4">
                        Foto-Foto Dalam Album Ini ({gallery.images?.length || 0})
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {gallery.images?.map((img) => (
                            <div
                                key={img.id}
                                className="group relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
                            >
                                <img
                                    src={img.image}
                                    alt={img.caption || 'Foto'}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => setDeleteImageId(img.id)}
                                    className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-700 shadow-sm"
                                    title="Hapus foto ini"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {(!gallery.images || gallery.images.length === 0) && (
                        <p className="text-xs text-slate-400 text-center py-8">
                            Belum ada foto yang diunggah ke album ini.
                        </p>
                    )}
                </div>
            </div>

            <Dialog
                isOpen={!!deleteImageId}
                onClose={() => setDeleteImageId(null)}
                onConfirm={confirmDeleteImage}
                title="Hapus Foto"
                message="Apakah Anda yakin ingin menghapus foto ini dari album?"
                processing={processingDelete}
            />
        </AdminLayout>
    );
}
