import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import DataTable from '@/Components/Admin/DataTable';
import Dialog from '@/Components/UI/Dialog';
import Badge from '@/Components/UI/Badge';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function Index({ announcements = { data: [] } }) {
    const [deleteId, setDeleteId] = useState(null);
    const [processing, setProcessing] = useState(false);

    const confirmDelete = () => {
        if (!deleteId) return;
        setProcessing(true);
        router.delete(`/admin/announcements/${deleteId}`, {
            onFinish: () => {
                setProcessing(false);
                setDeleteId(null);
            },
        });
    };

    const columns = [
        { header: 'No', render: (item, idx) => idx + 1, className: 'w-12 text-center', align: 'center' },
        {
            header: 'Judul Pengumuman',
            render: (item) => (
                <div>
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.content}</p>
                </div>
            ),
        },
        {
            header: 'Status',
            render: (item) => (
                <Badge variant={item.is_active ? 'success' : 'slate'} size="sm">
                    {item.is_active ? 'Aktif' : 'Non-Aktif'}
                </Badge>
            ),
            align: 'center',
            className: 'w-28',
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
                        href={`/admin/announcements/${item.id}/edit`}
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
        <AdminLayout title="Kelola Pengumuman">
            <PageHeader
                title="Pengumuman Sekolah"
                description="Kelola pengumuman dinas, informasi penting, atau edaran orang tua murid."
                actionLabel="Tambah Pengumuman"
                actionHref="/admin/announcements/create"
                actionIcon={Plus}
            />

            <DataTable
                columns={columns}
                data={announcements.data}
                pagination={announcements}
                searchable={false}
            />

            <Dialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Hapus Pengumuman"
                message="Apakah Anda yakin ingin menghapus pengumuman ini?"
                processing={processing}
            />
        </AdminLayout>
    );
}
