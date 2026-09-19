import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import DataTable from '@/Components/Admin/DataTable';
import Dialog from '@/Components/UI/Dialog';
import Modal from '@/Components/UI/Modal';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';
import {
    Users,
    Search,
    Eye,
    Trash2,
    CheckCircle,
    Clock,
    XCircle,
    Phone,
    Settings,
    User,
    Calendar,
    MapPin,
    School,
} from 'lucide-react';

export default function Registrations({
    registrations = { data: [] },
    filters = {},
    stats = { total: 0, pending: 0, verified: 0, accepted: 0, rejected: 0 },
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [trackFilter, setTrackFilter] = useState(filters.track || '');
    const [selectedItem, setSelectedItem] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFilter = (newSearch, newStatus, newTrack) => {
        router.get(
            '/admin/ppdb/pendaftar',
            {
                search: newSearch !== undefined ? newSearch : search,
                status: newStatus !== undefined ? newStatus : statusFilter,
                track: newTrack !== undefined ? newTrack : trackFilter,
            },
            { preserveState: true, replace: true }
        );
    };

    const handleStatusChange = (id, newStatus) => {
        setProcessing(true);
        router.patch(
            `/admin/ppdb/pendaftar/${id}/status`,
            { status: newStatus },
            {
                preserveScroll: true,
                onFinish: () => {
                    setProcessing(false);
                    if (selectedItem && selectedItem.id === id) {
                        setSelectedItem((prev) => ({ ...prev, status: newStatus }));
                    }
                },
            }
        );
    };

    const confirmDelete = () => {
        if (!deleteId) return;
        setProcessing(true);
        router.delete(`/admin/ppdb/pendaftar/${deleteId}`, {
            preserveScroll: true,
            onFinish: () => {
                setProcessing(false);
                setDeleteId(null);
                if (selectedItem && selectedItem.id === deleteId) {
                    setSelectedItem(null);
                }
            },
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <Badge variant="warning">Menunggu</Badge>;
            case 'verified':
                return <Badge variant="info">Diverifikasi</Badge>;
            case 'accepted':
                return <Badge variant="success">Diterima</Badge>;
            case 'rejected':
                return <Badge variant="danger">Ditolak</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const columns = [
        {
            header: 'No. Registrasi',
            render: (item) => (
                <div>
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {item.registration_number}
                    </span>
                    <div className="text-[11px] text-slate-400 mt-1">
                        {new Date(item.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })}
                    </div>
                </div>
            ),
        },
        {
            header: 'Nama Calon Siswa',
            render: (item) => (
                <div>
                    <div className="font-bold text-slate-900 text-sm">{item.student_name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{item.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</span>
                        <span>•</span>
                        <span>{item.birth_place}</span>
                    </div>
                </div>
            ),
        },
        {
            header: 'Jalur',
            field: 'registration_track',
            className: 'text-xs font-semibold text-slate-700',
        },
        {
            header: 'Orang Tua / Kontak',
            render: (item) => (
                <div>
                    <div className="text-xs font-semibold text-slate-800">{item.parent_name}</div>
                    <a
                        href={`https://wa.me/${item.parent_phone?.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-emerald-600 font-medium hover:underline flex items-center gap-1 mt-0.5"
                    >
                        <Phone className="w-3 h-3" />
                        <span>{item.parent_phone}</span>
                    </a>
                </div>
            ),
        },
        {
            header: 'Status',
            render: (item) => (
                <div className="flex items-center gap-2">
                    {getStatusBadge(item.status)}
                    <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className="text-xs py-1 px-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                        disabled={processing}
                    >
                        <option value="pending">Menunggu</option>
                        <option value="verified">Diverifikasi</option>
                        <option value="accepted">Diterima</option>
                        <option value="rejected">Ditolak</option>
                    </select>
                </div>
            ),
        },
        {
            header: 'Aksi',
            align: 'right',
            render: (item) => (
                <div className="flex items-center justify-end gap-1.5">
                    <button
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Lihat Detail"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setDeleteId(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus Data"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout title="Data Pendaftar PPDB Online">
            <PageHeader
                title="Data Pendaftar PPDB Online"
                description="Pantau, verifikasi berkas, dan ubah status pendaftaran peserta didik baru."
                action={
                    <Link
                        href="/admin/ppdb"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-2xs transition-colors"
                    >
                        <Settings className="w-4 h-4" />
                        <span>Pengaturan PPDB</span>
                    </Link>
                }
            />

            {/* Status Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                <button
                    type="button"
                    onClick={() => {
                        setStatusFilter('');
                        handleFilter(search, '', trackFilter);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        !statusFilter
                            ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                            : 'bg-white border-slate-200/80 hover:border-slate-300'
                    }`}
                >
                    <div className="text-xs font-medium text-slate-500">Semua Pendaftar</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{stats.total || 0}</div>
                </button>

                <button
                    type="button"
                    onClick={() => {
                        const next = statusFilter === 'pending' ? '' : 'pending';
                        setStatusFilter(next);
                        handleFilter(search, next, trackFilter);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        statusFilter === 'pending'
                            ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-500/20 shadow-xs'
                            : 'bg-white border-slate-200/80 hover:border-slate-300'
                    }`}
                >
                    <div className="text-xs font-medium text-amber-600">Menunggu</div>
                    <div className="text-2xl font-black text-amber-700 mt-1">{stats.pending || 0}</div>
                </button>

                <button
                    type="button"
                    onClick={() => {
                        const next = statusFilter === 'verified' ? '' : 'verified';
                        setStatusFilter(next);
                        handleFilter(search, next, trackFilter);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        statusFilter === 'verified'
                            ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                            : 'bg-white border-slate-200/80 hover:border-slate-300'
                    }`}
                >
                    <div className="text-xs font-medium text-blue-600">Diverifikasi</div>
                    <div className="text-2xl font-black text-blue-700 mt-1">{stats.verified || 0}</div>
                </button>

                <button
                    type="button"
                    onClick={() => {
                        const next = statusFilter === 'accepted' ? '' : 'accepted';
                        setStatusFilter(next);
                        handleFilter(search, next, trackFilter);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        statusFilter === 'accepted'
                            ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20 shadow-xs'
                            : 'bg-white border-slate-200/80 hover:border-slate-300'
                    }`}
                >
                    <div className="text-xs font-medium text-emerald-600">Diterima</div>
                    <div className="text-2xl font-black text-emerald-700 mt-1">{stats.accepted || 0}</div>
                </button>

                <button
                    type="button"
                    onClick={() => {
                        const next = statusFilter === 'rejected' ? '' : 'rejected';
                        setStatusFilter(next);
                        handleFilter(search, next, trackFilter);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        statusFilter === 'rejected'
                            ? 'bg-rose-50/70 border-rose-300 ring-2 ring-rose-500/20 shadow-xs'
                            : 'bg-white border-slate-200/80 hover:border-slate-300'
                    }`}
                >
                    <div className="text-xs font-medium text-rose-600">Ditolak</div>
                    <div className="text-2xl font-black text-rose-700 mt-1">{stats.rejected || 0}</div>
                </button>
            </div>

            {/* Filter controls */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:max-w-xs">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleFilter(e.target.value, statusFilter, trackFilter)}
                        placeholder="Cari nama, no. registrasi, NIK, HP..."
                        className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                        value={trackFilter}
                        onChange={(e) => {
                            setTrackFilter(e.target.value);
                            handleFilter(search, statusFilter, e.target.value);
                        }}
                        className="text-xs py-2 px-3 border border-slate-300 rounded-xl bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Semua Jalur</option>
                        <option value="Zonasi">Zonasi</option>
                        <option value="Afirmasi">Afirmasi</option>
                        <option value="Perpindahan Tugas Orang Tua">Perpindahan Tugas Orang Tua</option>
                        <option value="Prestasi">Prestasi</option>
                        <option value="Reguler">Reguler / Umum</option>
                    </select>

                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleFilter(search, statusFilter, trackFilter)}
                    >
                        Terapkan
                    </Button>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={registrations.data}
                pagination={registrations}
                emptyTitle="Belum Ada Pendaftar"
                emptyDescription="Data calon siswa yang mendaftar online akan muncul di sini."
                emptyIcon={Users}
            />

            {/* Modal Detail Pendaftar */}
            {selectedItem && (
                <Modal
                    isOpen={!!selectedItem}
                    onClose={() => setSelectedItem(null)}
                    title={`Detail Pendaftaran: ${selectedItem.student_name}`}
                    maxWidth="2xl"
                >
                    <div className="space-y-6">
                        {/* Status bar */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                                    No. Registrasi
                                </span>
                                <span className="font-mono text-base font-bold text-blue-700">
                                    {selectedItem.registration_number}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500">Status Saat Ini:</span>
                                {getStatusBadge(selectedItem.status)}
                            </div>
                        </div>

                        {/* Student Details */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                                <User className="w-4 h-4 text-blue-600" />
                                <span>Data Calon Siswa</span>
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-slate-100 text-xs">
                                <div>
                                    <span className="text-slate-400 block">Nama Lengkap</span>
                                    <span className="font-bold text-slate-900 text-sm">{selectedItem.student_name}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block">NIK Siswa</span>
                                    <span className="font-semibold text-slate-800">{selectedItem.nik || '-'}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block">Jenis Kelamin</span>
                                    <span className="font-semibold text-slate-800">
                                        {selectedItem.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block">Agama</span>
                                    <span className="font-semibold text-slate-800">{selectedItem.religion}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block">Tempat, Tanggal Lahir</span>
                                    <span className="font-semibold text-slate-800">
                                        {selectedItem.birth_place},{' '}
                                        {selectedItem.birth_date
                                            ? new Date(selectedItem.birth_date).toLocaleDateString('id-ID', {
                                                  day: 'numeric',
                                                  month: 'long',
                                                  year: 'numeric',
                                              })
                                            : '-'}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block">Asal Sekolah / TK</span>
                                    <span className="font-semibold text-slate-800">
                                        {selectedItem.previous_school || '-'}
                                    </span>
                                </div>
                                <div className="sm:col-span-2">
                                    <span className="text-slate-400 block">Alamat Tinggal</span>
                                    <span className="font-semibold text-slate-800 leading-relaxed">
                                        {selectedItem.address}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Parent Details */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                                <Users className="w-4 h-4 text-emerald-600" />
                                <span>Data Orang Tua / Wali</span>
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-slate-100 text-xs">
                                <div>
                                    <span className="text-slate-400 block">Nama Orang Tua / Wali</span>
                                    <span className="font-bold text-slate-900">{selectedItem.parent_name}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block">Pekerjaan</span>
                                    <span className="font-semibold text-slate-800">{selectedItem.parent_job || '-'}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block">No. WhatsApp / HP</span>
                                    <a
                                        href={`https://wa.me/${selectedItem.parent_phone?.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:underline"
                                    >
                                        <Phone className="w-3.5 h-3.5" />
                                        <span>{selectedItem.parent_phone}</span>
                                    </a>
                                </div>
                                <div>
                                    <span className="text-slate-400 block">Jalur Pendaftaran</span>
                                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded inline-block mt-0.5">
                                        {selectedItem.registration_track}
                                    </span>
                                </div>
                                {selectedItem.notes && (
                                    <div className="sm:col-span-2">
                                        <span className="text-slate-400 block">Catatan Tambahan</span>
                                        <span className="font-medium text-slate-700 italic">
                                            {selectedItem.notes}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Status Change Buttons */}
                        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-slate-600">Ubah Status:</span>
                                <Button
                                    size="sm"
                                    variant={selectedItem.status === 'verified' ? 'primary' : 'secondary'}
                                    onClick={() => handleStatusChange(selectedItem.id, 'verified')}
                                    disabled={processing}
                                >
                                    Verifikasi
                                </Button>
                                <Button
                                    size="sm"
                                    variant={selectedItem.status === 'accepted' ? 'primary' : 'secondary'}
                                    className={selectedItem.status === 'accepted' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                                    onClick={() => handleStatusChange(selectedItem.id, 'accepted')}
                                    disabled={processing}
                                >
                                    Terima
                                </Button>
                                <Button
                                    size="sm"
                                    variant={selectedItem.status === 'rejected' ? 'danger' : 'secondary'}
                                    onClick={() => handleStatusChange(selectedItem.id, 'rejected')}
                                    disabled={processing}
                                >
                                    Tolak
                                </Button>
                            </div>

                            <Button variant="secondary" size="sm" onClick={() => setSelectedItem(null)}>
                                Tutup
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Confirm Delete Dialog */}
            <Dialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Hapus Data Pendaftaran"
                description="Apakah Anda yakin ingin menghapus data calon siswa ini? Tindakan ini tidak dapat dibatalkan."
                confirmText="Hapus Pendaftar"
                cancelText="Batal"
                variant="danger"
                processing={processing}
            />
        </AdminLayout>
    );
}
