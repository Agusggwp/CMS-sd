import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import DataTable from '@/Components/Admin/DataTable';
import Dialog from '@/Components/UI/Dialog';
import Badge from '@/Components/UI/Badge';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';

export default function Index({ news = { data: [] }, filters = {} }) {
    const [deleteId, setDeleteId] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSearch = (search) => {
        router.get('/admin/news', { search }, { preserveState: true, replace: true });
    };

    const confirmDelete = () => {
        if (!deleteId) return;
        setProcessing(true);
        router.delete(`/admin/news/${deleteId}`, {
            onFinish: () => {
                setProcessing(false);
                setDeleteId(null);
            },
        });
    };

    const columns = [
        { header: 'No', render: (item, idx) => idx + 1, className: 'w-12 text-center', align: 'center' },
        {
            header: 'Artikel Berita',
            render: (item) => (
                <div className="flex items-center gap-3">
                    {item.image ? (
                        <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg shrink-0" />
                    ) : (
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-xs text-slate-400 shrink-0">
                            Foto
                        </div>
                    )}
                    <div className="min-w-0">
                        <Link href={`/admin/news/${item.id}/edit`} className="font-bold text-slate-900 hover:text-blue-600 line-clamp-1">
                            {item.title}
                        </Link>
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                            Kategori: {item.category?.name || 'Umum'} • Penulis: {item.author?.name || 'Admin'}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            header: 'Status',
            render: (item) => (
                <Badge variant={item.status === 'published' ? 'success' : 'slate'} size="sm">
                    {item.status === 'published' ? 'Terbit' : 'Draf'}
                </Badge>
            ),
            align: 'center',
            className: 'w-24',
        },
        {
            header: 'Dilihat',
            render: (item) => `${item.views || 0}x`,
            align: 'center',
            className: 'w-20',
        },
        {
            header: 'Tanggal',
            render: (item) => new Date(item.created_at).toLocaleDateString('id-ID'),
            align: 'center',
            className: 'w-28',
        },
        {
            header: 'Aksi',
            render: (item) => (
                <div className="flex items-center justify-end gap-1.5">
                    <a
                        href={`/berita/${item.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Lihat di Web"
                    >
                        <Eye className="w-4 h-4" />
                    </a>
                    <Link
                        href={`/admin/news/${item.id}/edit`}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Edit Berita"
                    >
                        <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                        type="button"
                        onClick={() => setDeleteId(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus Berita"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
            align: 'right',
            className: 'w-28 text-right',
        },
    ];

    return (
        <AdminLayout title="Kelola Berita Sekolah">
            <PageHeader
                title="Berita & Artikel Sekolah"
                description="Kelola seluruh publikasi berita, liputan kegiatan, dan artikel seputar sekolah."
                actionLabel="Tulis Berita Baru"
                actionHref="/admin/news/create"
                actionIcon={Plus}
            />

            <DataTable
                columns={columns}
                data={news.data}
                pagination={news}
                searchValue={filters.search}
                onSearch={handleSearch}
                searchPlaceholder="Cari judul berita..."
            />

            <Dialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Hapus Berita"
                message="Apakah Anda yakin ingin menghapus berita ini secara permanen?"
                processing={processing}
            />
        </AdminLayout>
    );
}
