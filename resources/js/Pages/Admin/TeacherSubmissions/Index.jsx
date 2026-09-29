import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Badge from '@/Components/UI/Badge';
import Dialog from '@/Components/UI/Dialog';
import {
    Users,
    Clock,
    CheckCircle,
    XCircle,
    User,
    Mail,
    Phone,
    Briefcase,
    BookOpen,
    Settings,
    Search,
    ChevronLeft,
    ChevronRight,
    Eye,
    Check,
    X,
    ToggleLeft,
    ToggleRight,
    AlertTriangle,
} from 'lucide-react';

const STATUS_TABS = [
    { key: 'pending',  label: 'Menunggu',  icon: Clock,         color: 'amber' },
    { key: 'approved', label: 'Disetujui', icon: CheckCircle,   color: 'emerald' },
    { key: 'rejected', label: 'Ditolak',   icon: XCircle,       color: 'rose' },
    { key: 'all',      label: 'Semua',     icon: Users,          color: 'slate' },
];

export default function TeacherSubmissionsIndex({ submissions = { data: [] }, stats = {}, filters = {}, formSetting }) {
    const { flash = {} } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [activeTab, setActiveTab] = useState(filters.status || 'pending');
    const [detailItem, setDetailItem] = useState(null);
    const [rejectDialog, setRejectDialog] = useState({ open: false, teacher: null });
    const [rejectReason, setRejectReason] = useState('');
    const [processing, setProcessing] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        const url = `${window.location.origin}/guru/daftar`;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/teacher-submissions', { search, status: activeTab }, { preserveState: true, replace: true });
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        router.get('/admin/teacher-submissions', { search, status: tab }, { preserveState: true, replace: true });
    };

    const handleApprove = (teacher) => {
        setProcessing(true);
        router.post(`/admin/teacher-submissions/${teacher.id}/approve`, {}, {
            onFinish: () => {
                setProcessing(false);
                setDetailItem(null);
            },
        });
    };

    const openRejectDialog = (teacher) => {
        setRejectDialog({ open: true, teacher });
        setRejectReason('');
    };

    const handleReject = () => {
        if (!rejectDialog.teacher || !rejectReason.trim()) return;
        setProcessing(true);
        router.post(`/admin/teacher-submissions/${rejectDialog.teacher.id}/reject`, { rejection_reason: rejectReason }, {
            onFinish: () => {
                setProcessing(false);
                setRejectDialog({ open: false, teacher: null });
                setRejectReason('');
                setDetailItem(null);
            },
        });
    };

    const handleToggleForm = () => {
        router.post('/admin/teacher-submissions/toggle-form', {}, { preserveScroll: true });
    };

    const statusBadge = (status) => {
        const map = {
            pending:  { variant: 'warning', label: 'Menunggu' },
            approved: { variant: 'success', label: 'Disetujui' },
            rejected: { variant: 'danger',  label: 'Ditolak' },
        };
        const s = map[status] || { variant: 'slate', label: status };
        return <Badge variant={s.variant} size="sm">{s.label}</Badge>;
    };

    return (
        <AdminLayout title="Pengajuan Data Guru">
            <PageHeader
                title="Pengajuan Data Guru"
                description="Review dan kelola data guru yang diisi secara mandiri."
            >
                <a
                    href="/admin/teacher-submissions/settings"
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors"
                >
                    <Settings className="w-4 h-4" />
                    <span>Pengaturan Form</span>
                </a>
                <button
                    type="button"
                    onClick={handleToggleForm}
                    className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold rounded-xl transition-all ${
                        formSetting?.is_open
                            ? 'bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100'
                            : 'bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100'
                    }`}
                >
                    {formSetting?.is_open ? (
                        <><ToggleRight className="w-4 h-4" /> Tutup Form</>
                    ) : (
                        <><ToggleLeft className="w-4 h-4" /> Buka Form</>
                    )}
                </button>
            </PageHeader>

            {/* Flash message */}
            {flash.success && (
                <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-700 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0" /> {flash.success}
                </div>
            )}

            {/* Form status banner */}
            <div className={`mb-6 rounded-2xl p-4 flex items-center justify-between ${
                formSetting?.is_open
                    ? 'bg-emerald-50 border border-emerald-200'
                    : 'bg-rose-50 border border-rose-200'
            }`}>
                <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${formSetting?.is_open ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                    <span className={`text-sm font-semibold ${formSetting?.is_open ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {formSetting?.is_open ? 'Form pengisian data guru sedang DIBUKA' : 'Form pengisian data guru sedang DITUTUP'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {/* Salin Link */}
                    <button
                        type="button"
                        onClick={handleCopyLink}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                            copied
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
                        }`}
                        title="Salin link form pendaftaran"
                    >
                        {copied ? (
                            <>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Tersalin!
                            </>
                        ) : (
                            <>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <rect x="9" y="9" width="13" height="13" rx="2" />
                                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                </svg>
                                Salin Link
                            </>
                        )}
                    </button>
                    {/* Lihat form publik */}
                    <a
                        href="/guru/daftar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-500 hover:text-slate-700 underline underline-offset-2"
                    >
                        Lihat form publik ↗
                    </a>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Total Pengajuan', value: stats.total || 0, icon: Users, color: 'blue' },
                    { label: 'Menunggu Review', value: stats.pending || 0, icon: Clock, color: 'amber' },
                    { label: 'Disetujui', value: stats.approved || 0, icon: CheckCircle, color: 'emerald' },
                    { label: 'Ditolak', value: stats.rejected || 0, icon: XCircle, color: 'rose' },
                ].map((s) => (
                    <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
                        <div className={`w-9 h-9 rounded-xl bg-${s.color}-50 flex items-center justify-center mb-3`}>
                            <s.icon className={`w-5 h-5 text-${s.color}-600`} />
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Tabs + Search */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                {/* Tab navigation */}
                <div className="flex items-center border-b border-slate-100 px-4 pt-4 gap-1 overflow-x-auto">
                    {STATUS_TABS.map((tab) => {
                        const count = tab.key === 'all' ? stats.total : stats[tab.key];
                        return (
                            <button
                                key={tab.key}
                                onClick={() => handleTabChange(tab.key)}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                                    activeTab === tab.key
                                        ? `border-blue-600 text-blue-600 bg-blue-50`
                                        : 'border-transparent text-slate-500 hover:text-slate-800'
                                }`}
                            >
                                <tab.icon className="w-3.5 h-3.5" />
                                {tab.label}
                                {count !== undefined && (
                                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                                        activeTab === tab.key ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                                    }`}>{count}</span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Search */}
                <div className="p-4 border-b border-slate-100">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama, email, atau jabatan..."
                                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            />
                        </div>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                            Cari
                        </button>
                    </form>
                </div>

                {/* Table */}
                {submissions.data.length === 0 ? (
                    <div className="py-20 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-slate-500 font-medium">Belum ada pengajuan</p>
                        <p className="text-slate-400 text-sm mt-1">Pengajuan guru akan muncul di sini.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {submissions.data.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                                {/* Photo */}
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                    {item.photo ? (
                                        <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <User className="w-6 h-6 text-slate-300" />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                                        {statusBadge(item.submission_status)}
                                    </div>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 flex-wrap">
                                        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{item.position}</span>
                                        {item.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{item.email}</span>}
                                    </div>
                                    {item.rejection_reason && (
                                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                                            <AlertTriangle className="w-3 h-3" /> Alasan penolakan: {item.rejection_reason}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                        onClick={() => setDetailItem(item)}
                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                        title="Lihat Detail"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    {item.submission_status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleApprove(item)}
                                                disabled={processing}
                                                className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                                                title="Setujui"
                                            >
                                                <Check className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => openRejectDialog(item)}
                                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                                                title="Tolak"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                    {item.submission_status === 'rejected' && (
                                        <button
                                            onClick={() => handleApprove(item)}
                                            disabled={processing}
                                            className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors"
                                        >
                                            Setujui Ulang
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {submissions.last_page > 1 && (
                    <div className="flex items-center justify-between p-4 border-t border-slate-100">
                        <p className="text-xs text-slate-500">
                            Menampilkan {submissions.from}–{submissions.to} dari {submissions.total} data
                        </p>
                        <div className="flex items-center gap-1">
                            {submissions.prev_page_url && (
                                <button
                                    onClick={() => router.get(submissions.prev_page_url)}
                                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                            )}
                            <span className="text-xs text-slate-500 px-2">
                                {submissions.current_page} / {submissions.last_page}
                            </span>
                            {submissions.next_page_url && (
                                <button
                                    onClick={() => router.get(submissions.next_page_url)}
                                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {detailItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDetailItem(null)} />
                    <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-start justify-between p-6 border-b border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                    {detailItem.photo ? (
                                        <img src={detailItem.photo} alt={detailItem.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <User className="w-8 h-8 text-slate-300" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">{detailItem.name}</h3>
                                    <p className="text-sm text-slate-500">{detailItem.position}</p>
                                    <div className="mt-1">{statusBadge(detailItem.submission_status)}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setDetailItem(null)}
                                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            <DetailRow icon={<Hash className="w-4 h-4" />} label="NIP" value={detailItem.nip || '-'} />
                            <DetailRow icon={<Mail className="w-4 h-4" />} label="Email" value={detailItem.email || '-'} />
                            <DetailRow icon={<Phone className="w-4 h-4" />} label="Telepon" value={detailItem.phone || '-'} />
                            <DetailRow icon={<BookOpen className="w-4 h-4" />} label="Mata Pelajaran" value={detailItem.subject || '-'} />
                            {detailItem.bio && (
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Bio</p>
                                    <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-3">{detailItem.bio}</p>
                                </div>
                            )}
                            {detailItem.rejection_reason && (
                                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
                                    <p className="text-xs font-semibold text-rose-600 mb-1">Alasan Penolakan</p>
                                    <p className="text-sm text-rose-700">{detailItem.rejection_reason}</p>
                                </div>
                            )}
                        </div>

                        {/* Footer Actions */}
                        {detailItem.submission_status === 'pending' && (
                            <div className="p-6 border-t border-slate-100 flex gap-3">
                                <button
                                    onClick={() => openRejectDialog(detailItem)}
                                    className="flex-1 py-2.5 px-4 text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <X className="w-4 h-4" /> Tolak
                                </button>
                                <button
                                    onClick={() => handleApprove(detailItem)}
                                    disabled={processing}
                                    className="flex-1 py-2.5 px-4 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                                >
                                    <Check className="w-4 h-4" /> Setujui
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Reject Dialog */}
            {rejectDialog.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setRejectDialog({ open: false, teacher: null })} />
                    <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-rose-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Tolak Pengajuan</h3>
                                <p className="text-sm text-slate-500">{rejectDialog.teacher?.name}</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Alasan Penolakan <span className="text-rose-500">*</span>
                            </label>
                            <textarea
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                rows={3}
                                placeholder="Contoh: Foto tidak sesuai standar / Data tidak lengkap / ..."
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-400 resize-none"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setRejectDialog({ open: false, teacher: null })}
                                className="flex-1 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={!rejectReason.trim() || processing}
                                className="flex-1 py-2.5 text-sm font-bold text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition-colors disabled:opacity-60"
                            >
                                {processing ? 'Memproses...' : 'Tolak Pengajuan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

function DetailRow({ icon, label, value }) {
    return (
        <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                {icon}
            </div>
            <div>
                <p className="text-xs text-slate-400 font-medium">{label}</p>
                <p className="text-sm font-semibold text-slate-800">{value}</p>
            </div>
        </div>
    );
}

function Hash({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
            <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
        </svg>
    );
}
