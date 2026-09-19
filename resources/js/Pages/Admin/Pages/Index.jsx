import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import DataTable from '@/Components/Admin/DataTable';
import Dialog from '@/Components/UI/Dialog';
import Badge from '@/Components/UI/Badge';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function Index({ pages = { data: [] } }) {
    const [deleteId, setDeleteId] = useState(null);
    const [processing, setProcessing] = useState(false);

    const confirmDelete = () => {
        if (!deleteId) return;
        setProcessing(true);
        router.delete(`/admin/pages/${deleteId}`, {
            onFinish: () => {
                setProcessing(false);
                setDeleteId(null);
            },
        });
    };

    const columns = [
        { header: 'No', render: (item, idx) => idx + 1, className: 'w-12 text-center', align: 'center' },
        { header: 'Judul Halaman', field: 'title', className: 'font-bold text-slate-900 text-sm' },
        { header: 'Slug URL', field: 'slug', className: 'text-xs text-slate-500 font-mono' },
        {
            header: 'Status',
            render: (item) => (
                <Badge variant={item.is_published ? 'success' : 'slate'} size="sm">
                    {item.is_published ? 'Dipublikasikan' : 'Draf'}
                </Badge>
            ),
            align: 'center',
            className: 'w-32',
        },
        {
            header: 'Aksi',
            render: (item) => (
                <div className="flex items-center justify-end gap-1.5">
                    <Link
                        href={`/admin/pages/${item.id}/edit`}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                        type="button"
                        onClick={() => setDeleteId(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus"
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
        <AdminLayout title="Halaman Statis">
            <PageHeader
                title="Halaman Statis & Kustom"
                description="Kelola halaman informasi tambahan seperti profil, kebijakan, atau program khusus."
                actionLabel="Tambah Halaman"
                actionHref="/admin/pages/create"
                actionIcon={Plus}
            />

            <DataTable
                columns={columns}
                data={pages.data}
                pagination={pages}
                searchable={false}
            />

            <Dialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Hapus Halaman"
                message="Apakah Anda yakin ingin menghapus halaman ini?"
                processing={processing}
            />
        </AdminLayout>
    );
}
