import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import DataTable from '@/Components/Admin/DataTable';
import Dialog from '@/Components/UI/Dialog';
import { Plus, Edit2, Trash2, Image } from 'lucide-react';

export default function Index({ galleries = { data: [] } }) {
    const [deleteId, setDeleteId] = useState(null);
    const [processing, setProcessing] = useState(false);

    const confirmDelete = () => {
        if (!deleteId) return;
        setProcessing(true);
        router.delete(`/admin/galleries/${deleteId}`, {
            onFinish: () => {
                setProcessing(false);
                setDeleteId(null);
            },
        });
    };

    const columns = [
        { header: 'No', render: (item, idx) => idx + 1, className: 'w-12 text-center', align: 'center' },
        {
            header: 'Album Galeri',
            render: (item) => (
                <div className="flex items-center gap-3">
                    {item.cover_image ? (
                        <img src={item.cover_image} alt={item.title} className="w-12 h-12 object-cover rounded-lg shrink-0" />
                    ) : (
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                            <Image className="w-5 h-5" />
                        </div>
                    )}
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm leading-snug">{item.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.description || 'Tidak ada deskripsi'}</p>
                    </div>
                </div>
            ),
        },
        {
            header: 'Jumlah Foto',
            render: (item) => `${item.images_count || 0} foto`,
            align: 'center',
            className: 'w-32',
        },
        {
            header: 'Tanggal Dibuat',
            render: (item) => new Date(item.created_at).toLocaleDateString('id-ID'),
            align: 'center',
            className: 'w-32',
        },
        {
            header: 'Aksi',
            render: (item) => (
                <div className="flex items-center justify-end gap-1.5">
                    <Link
                        href={`/admin/galleries/${item.id}/edit`}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Kelola Album & Foto"
                    >
                        <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                        type="button"
                        onClick={() => setDeleteId(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus Album"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
            align: 'right',
            className: 'w-24 text-right',
        },
    ];

    return (
        <AdminLayout title="Galeri Dokumentasi Foto">
            <PageHeader
                title="Galeri Dokumentasi"
                description="Kelola album dan arsip foto kegiatan peserta didik serta acara sekolah."
                actionLabel="Buat Album Baru"
                actionHref="/admin/galleries/create"
                actionIcon={Plus}
            />

            <DataTable
                columns={columns}
                data={galleries.data}
                pagination={galleries}
                searchable={false}
            />

            <Dialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Hapus Album Galeri"
                message="Apakah Anda yakin ingin menghapus album ini beserta seluruh foto di dalamnya?"
                processing={processing}
            />
        </AdminLayout>
    );
}
