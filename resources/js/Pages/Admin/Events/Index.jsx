import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import DataTable from '@/Components/Admin/DataTable';
import Dialog from '@/Components/UI/Dialog';
import { Plus, Edit2, Trash2, Calendar, MapPin } from 'lucide-react';

export default function Index({ events = { data: [] } }) {
    const [deleteId, setDeleteId] = useState(null);
    const [processing, setProcessing] = useState(false);

    const confirmDelete = () => {
        if (!deleteId) return;
        setProcessing(true);
        router.delete(`/admin/events/${deleteId}`, {
            onFinish: () => {
                setProcessing(false);
                setDeleteId(null);
            },
        });
    };

    const columns = [
        { header: 'No', render: (item, idx) => idx + 1, className: 'w-12 text-center', align: 'center' },
        {
            header: 'Nama Kegiatan / Agenda',
            render: (item) => (
                <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    {item.location && (
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{item.location}</span>
                        </p>
                    )}
                </div>
            ),
        },
        {
            header: 'Waktu Pelaksanaan',
            render: (item) => {
                const date = new Date(item.start_date);
                return (
                    <span className="text-xs font-semibold text-slate-700">
                        {date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} • {date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                    </span>
                );
            },
            align: 'center',
            className: 'w-56',
        },
        {
            header: 'Aksi',
            render: (item) => (
                <div className="flex items-center justify-end gap-1.5">
                    <Link
                        href={`/admin/events/${item.id}/edit`}
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
        <AdminLayout title="Kelola Agenda & Kegiatan">
            <PageHeader
                title="Agenda & Kegiatan Sekolah"
                description="Kelola jadwal upacara, rapat komite, ujian, study tour, dan lomba sekolah."
                actionLabel="Tambah Agenda"
                actionHref="/admin/events/create"
                actionIcon={Plus}
            />

            <DataTable
                columns={columns}
                data={events.data}
                pagination={events}
                searchable={false}
            />

            <Dialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Hapus Agenda"
                message="Apakah Anda yakin ingin menghapus agenda kegiatan ini?"
                processing={processing}
            />
        </AdminLayout>
    );
}
