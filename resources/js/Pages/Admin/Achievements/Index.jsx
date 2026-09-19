import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import DataTable from '@/Components/Admin/DataTable';
import Dialog from '@/Components/UI/Dialog';
import { Plus, Edit2, Trash2, Trophy } from 'lucide-react';

export default function Index({ achievements = { data: [] }, filters = {} }) {
    const [deleteId, setDeleteId] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSearch = (search) => {
        router.get('/admin/achievements', { search }, { preserveState: true, replace: true });
    };

    const confirmDelete = () => {
        if (!deleteId) return;
        setProcessing(true);
        router.delete(`/admin/achievements/${deleteId}`, {
            onFinish: () => {
                setProcessing(false);
                setDeleteId(null);
            },
        });
    };

    const columns = [
        { header: 'No', render: (item, idx) => idx + 1, className: 'w-12 text-center', align: 'center' },
        {
            header: 'Nama Prestasi & Penghargaan',
            render: (item) => (
                <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">{item.title}</h4>
                    <p className="text-xs text-blue-600 font-semibold mt-0.5">{item.participant}</p>
                </div>
            ),
        },
        { header: 'Peringkat', field: 'rank', className: 'text-xs font-semibold text-amber-700' },
        { header: 'Tingkat', field: 'level', className: 'text-xs text-slate-600' },
        { header: 'Tahun', field: 'year', align: 'center', className: 'w-20 text-center text-xs' },
        {
            header: 'Aksi',
            render: (item) => (
                <div className="flex items-center justify-end gap-1.5">
                    <Link
                        href={`/admin/achievements/${item.id}/edit`}
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
        <AdminLayout title="Prestasi Siswa">
            <PageHeader
                title="Prestasi & Kejuaraan"
                description="Kelola rekam jejak capaian lomba dan kejuaraan siswa dan sekolah."
                actionLabel="Tambah Prestasi"
                actionHref="/admin/achievements/create"
                actionIcon={Plus}
            />

            <DataTable
                columns={columns}
                data={achievements.data}
                pagination={achievements}
                searchValue={filters.search}
                onSearch={handleSearch}
                searchPlaceholder="Cari prestasi atau siswa..."
            />

            <Dialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Hapus Prestasi"
                message="Apakah Anda yakin ingin menghapus catatan prestasi ini?"
                processing={processing}
            />
        </AdminLayout>
    );
}
