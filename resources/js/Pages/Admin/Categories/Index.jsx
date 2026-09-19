import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import DataTable from '@/Components/Admin/DataTable';
import Dialog from '@/Components/UI/Dialog';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function Index({ categories = { data: [] } }) {
    const [deleteId, setDeleteId] = useState(null);
    const [processing, setProcessing] = useState(false);

    const confirmDelete = () => {
        if (!deleteId) return;
        setProcessing(true);
        router.delete(`/admin/categories/${deleteId}`, {
            onFinish: () => {
                setProcessing(false);
                setDeleteId(null);
            },
        });
    };

    const columns = [
        { header: 'No', render: (item, idx) => idx + 1, className: 'w-12 text-center', align: 'center' },
        { header: 'Nama Kategori', render: (item) => <span className="font-bold text-slate-900">{item.name}</span> },
        { header: 'Slug', field: 'slug', className: 'text-slate-500 font-mono text-xs' },
        { header: 'Deskripsi', field: 'description', render: (item) => item.description || '-' },
        { header: 'Jumlah Berita', render: (item) => `${item.news_count ?? 0} artikel`, align: 'center', className: 'w-32' },
        {
            header: 'Aksi',
            render: (item) => (
                <div className="flex items-center justify-end gap-1.5">
                    <Link
                        href={`/admin/categories/${item.id}/edit`}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Edit Kategori"
                    >
                        <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                        type="button"
                        onClick={() => setDeleteId(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus Kategori"
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
        <AdminLayout title="Kategori Berita">
            <PageHeader
                title="Kategori Berita"
                description="Kelola pengelompokan rubrik berita dan artikel sekolah."
                actionLabel="Tambah Kategori"
                actionHref="/admin/categories/create"
                actionIcon={Plus}
            />

            <DataTable
                columns={columns}
                data={categories.data}
                pagination={categories}
                searchable={false}
            />

            <Dialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Hapus Kategori"
                message="Apakah Anda yakin ingin menghapus kategori ini?"
                processing={processing}
            />
        </AdminLayout>
    );
}
