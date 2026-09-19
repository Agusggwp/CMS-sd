import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import DataTable from '@/Components/Admin/DataTable';
import Dialog from '@/Components/UI/Dialog';
import { Plus, Edit2, Trash2, Building2 } from 'lucide-react';

export default function Index({ facilities = { data: [] } }) {
    const [deleteId, setDeleteId] = useState(null);
    const [processing, setProcessing] = useState(false);

    const confirmDelete = () => {
        if (!deleteId) return;
        setProcessing(true);
        router.delete(`/admin/facilities/${deleteId}`, {
            onFinish: () => {
                setProcessing(false);
                setDeleteId(null);
            },
        });
    };

    const columns = [
        { header: 'No', render: (item, idx) => idx + 1, className: 'w-12 text-center', align: 'center' },
        {
            header: 'Fasilitas & Sarana',
            render: (item) => (
                <div className="flex items-center gap-3">
                    {item.image ? (
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg shrink-0" />
                    ) : (
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                            <Building2 className="w-5 h-5" />
                        </div>
                    )}
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.description}</p>
                    </div>
                </div>
            ),
        },
        { header: 'Icon Key', field: 'icon', render: (item) => item.icon || 'Standard', className: 'text-xs text-slate-500 font-mono w-28 text-center', align: 'center' },
        {
            header: 'Aksi',
            render: (item) => (
                <div className="flex items-center justify-end gap-1.5">
                    <Link
                        href={`/admin/facilities/${item.id}/edit`}
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
        <AdminLayout title="Fasilitas Sekolah">
            <PageHeader
                title="Sarana & Prasarana Sekolah"
                description="Kelola data gedung, laboratorium, perpustakaan, dan area olahraga."
                actionLabel="Tambah Fasilitas"
                actionHref="/admin/facilities/create"
                actionIcon={Plus}
            />

            <DataTable
                columns={columns}
                data={facilities.data}
                pagination={facilities}
                searchable={false}
            />

            <Dialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Hapus Fasilitas"
                message="Apakah Anda yakin ingin menghapus data fasilitas ini?"
                processing={processing}
            />
        </AdminLayout>
    );
}
