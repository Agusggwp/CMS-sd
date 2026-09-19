import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import DataTable from '@/Components/Admin/DataTable';
import Dialog from '@/Components/UI/Dialog';
import Badge from '@/Components/UI/Badge';
import { Plus, Edit2, Trash2, User } from 'lucide-react';

export default function Index({ teachers = { data: [] }, filters = {} }) {
    const [deleteId, setDeleteId] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSearch = (search) => {
        router.get('/admin/teachers', { search }, { preserveState: true, replace: true });
    };

    const confirmDelete = () => {
        if (!deleteId) return;
        setProcessing(true);
        router.delete(`/admin/teachers/${deleteId}`, {
            onFinish: () => {
                setProcessing(false);
                setDeleteId(null);
            },
        });
    };

    const columns = [
        { header: 'No', render: (item, idx) => idx + 1, className: 'w-12 text-center', align: 'center' },
        {
            header: 'Foto & Nama Guru',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        {item.photo ? (
                            <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <User className="w-5 h-5" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm leading-snug">{item.name}</h4>
                        {item.nip && <p className="text-[11px] text-slate-400">NIP: {item.nip}</p>}
                    </div>
                </div>
            ),
        },
        { header: 'Jabatan / Tugas', field: 'position', className: 'text-xs font-semibold text-slate-700' },
        { header: 'Mata Pelajaran', field: 'subject', render: (item) => item.subject || '-', className: 'text-xs text-slate-500' },
        { header: 'Urutan', field: 'order', align: 'center', className: 'w-20 text-center text-xs' },
        {
            header: 'Status',
            render: (item) => (
                <Badge variant={item.is_active ? 'success' : 'slate'} size="sm">
                    {item.is_active ? 'Aktif' : 'Non-Aktif'}
                </Badge>
            ),
            align: 'center',
            className: 'w-24',
        },
        {
            header: 'Aksi',
            render: (item) => (
                <div className="flex items-center justify-end gap-1.5">
                    <Link
                        href={`/admin/teachers/${item.id}/edit`}
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
        <AdminLayout title="Kelola Guru & Staf">
            <PageHeader
                title="Guru & Tenaga Kependidikan"
                description="Kelola profil guru, kepala sekolah, dan tenaga kependidikan."
                actionLabel="Tambah Guru"
                actionHref="/admin/teachers/create"
                actionIcon={Plus}
            />

            <DataTable
                columns={columns}
                data={teachers.data}
                pagination={teachers}
                searchValue={filters.search}
                onSearch={handleSearch}
                searchPlaceholder="Cari nama guru..."
            />

            <Dialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Hapus Data Guru"
                message="Apakah Anda yakin ingin menghapus data guru ini?"
                processing={processing}
            />
        </AdminLayout>
    );
}
