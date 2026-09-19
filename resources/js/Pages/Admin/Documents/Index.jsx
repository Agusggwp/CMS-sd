import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import DataTable from '@/Components/Admin/DataTable';
import Dialog from '@/Components/UI/Dialog';
import { Plus, Edit2, Trash2, FileText, Download } from 'lucide-react';

export default function Index({ documents = { data: [] }, filters = {} }) {
    const [deleteId, setDeleteId] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSearch = (search) => {
        router.get('/admin/documents', { search }, { preserveState: true, replace: true });
    };

    const confirmDelete = () => {
        if (!deleteId) return;
        setProcessing(true);
        router.delete(`/admin/documents/${deleteId}`, {
            onFinish: () => {
                setProcessing(false);
                setDeleteId(null);
            },
        });
    };

    const columns = [
        { header: 'No', render: (item, idx) => idx + 1, className: 'w-12 text-center', align: 'center' },
        {
            header: 'Nama Dokumen',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm leading-snug">{item.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.description}</p>
                    </div>
                </div>
            ),
        },
        { header: 'Format', field: 'type', align: 'center', className: 'w-24 text-center font-bold text-xs uppercase text-slate-600' },
        { header: 'Ukuran', field: 'size', align: 'center', className: 'w-24 text-center text-xs text-slate-500' },
        { header: 'Unduhan', render: (item) => `${item.download_count}x`, align: 'center', className: 'w-24 text-center text-xs text-slate-600' },
        {
            header: 'Aksi',
            render: (item) => (
                <div className="flex items-center justify-end gap-1.5">
                    <Link
                        href={`/admin/documents/${item.id}/edit`}
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
        <AdminLayout title="Kelola Dokumen Publik">
            <PageHeader
                title="Dokumen & Berkas Publik"
                description="Kelola berkas kalender pendidikan, formulir, dan modul kurikulum."
                actionLabel="Unggah Dokumen"
                actionHref="/admin/documents/create"
                actionIcon={Plus}
            />

            <DataTable
                columns={columns}
                data={documents.data}
                pagination={documents}
                searchValue={filters.search}
                onSearch={handleSearch}
                searchPlaceholder="Cari nama berkas..."
            />

            <Dialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Hapus Dokumen"
                message="Apakah Anda yakin ingin menghapus berkas dokumen ini?"
                processing={processing}
            />
        </AdminLayout>
    );
}
