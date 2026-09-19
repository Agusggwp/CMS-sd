import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import DataTable from '@/Components/Admin/DataTable';
import Dialog from '@/Components/UI/Dialog';
import Badge from '@/Components/UI/Badge';
import { Plus, Edit2, Trash2, UserCheck } from 'lucide-react';

export default function Index({ users = { data: [] } }) {
    const [deleteId, setDeleteId] = useState(null);
    const [processing, setProcessing] = useState(false);

    const confirmDelete = () => {
        if (!deleteId) return;
        setProcessing(true);
        router.delete(`/admin/users/${deleteId}`, {
            onFinish: () => {
                setProcessing(false);
                setDeleteId(null);
            },
        });
    };

    const columns = [
        { header: 'No', render: (item, idx) => idx + 1, className: 'w-12 text-center', align: 'center' },
        {
            header: 'Nama Pengguna',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm leading-snug">{item.name}</h4>
                        <p className="text-xs text-slate-400">{item.email}</p>
                    </div>
                </div>
            ),
        },
        {
            header: 'Hak Akses / Peran',
            render: (item) => (
                <Badge variant={item.role === 'admin' ? 'primary' : 'purple'} size="sm">
                    {item.role === 'admin' ? 'Administrator' : 'Operator Konten'}
                </Badge>
            ),
            align: 'center',
            className: 'w-40',
        },
        {
            header: 'Terdaftar Sejak',
            render: (item) => new Date(item.created_at).toLocaleDateString('id-ID'),
            align: 'center',
            className: 'w-36',
        },
        {
            header: 'Aksi',
            render: (item) => (
                <div className="flex items-center justify-end gap-1.5">
                    <Link
                        href={`/admin/users/${item.id}/edit`}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                        type="button"
                        onClick={() => setDeleteId(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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
        <AdminLayout title="Kelola Pengguna Admin">
            <PageHeader
                title="Pengguna & Operator CMS"
                description="Kelola akun pengelola website yang memiliki hak akses ke panel CMS."
                actionLabel="Tambah Pengguna"
                actionHref="/admin/users/create"
                actionIcon={Plus}
            />

            <DataTable
                columns={columns}
                data={users.data}
                pagination={users}
                searchable={false}
            />

            <Dialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Hapus Pengguna"
                message="Apakah Anda yakin ingin menghapus akun pengguna ini?"
                processing={processing}
            />
        </AdminLayout>
    );
}
