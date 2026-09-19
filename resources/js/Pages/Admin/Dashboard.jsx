import React from 'react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatCard from '@/Components/Admin/StatCard';
import {
    Newspaper,
    Users,
    Calendar,
    Bell,
    Image,
    Trophy,
    Plus,
    Clock,
    ArrowRight,
    ExternalLink,
} from 'lucide-react';

export default function Dashboard({
    stats = {},
    recentNews = [],
    upcomingEvents = [],
    recentAnnouncements = [],
}) {
    return (
        <AdminLayout title="Dashboard">
            <PageHeader
                title="Ringkasan Sistem & Dashboard"
                description="Selamat datang di panel administrasi portal resmi sekolah dasar. Pantau statistik dan kelola konten dari sini."
            />

            {/* 6 Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <StatCard
                    title="Berita"
                    value={stats.news_count || 0}
                    icon={Newspaper}
                    color="blue"
                />
                <StatCard
                    title="Guru & Staf"
                    value={stats.teachers_count || 0}
                    icon={Users}
                    color="emerald"
                />
                <StatCard
                    title="Agenda"
                    value={stats.events_count || 0}
                    icon={Calendar}
                    color="teal"
                />
                <StatCard
                    title="Pengumuman"
                    value={stats.announcements_count || 0}
                    icon={Bell}
                    color="amber"
                />
                <StatCard
                    title="Album Galeri"
                    value={stats.galleries_count || 0}
                    icon={Image}
                    color="purple"
                />
                <StatCard
                    title="Prestasi"
                    value={stats.achievements_count || 0}
                    icon={Trophy}
                    color="rose"
                />
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 mb-8 shadow-2xs">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Aksi Cepat Operator
                </h3>
                <div className="flex flex-wrap gap-2.5">
                    <Link
                        href="/admin/news/create"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tulis Berita Baru</span>
                    </Link>
                    <Link
                        href="/admin/announcements/create"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Buat Pengumuman</span>
                    </Link>
                    <Link
                        href="/admin/events/create"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Jadwalkan Agenda</span>
                    </Link>
                    <Link
                        href="/admin/teachers/create"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Data Guru</span>
                    </Link>
                    <Link
                        href="/admin/galleries/create"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Unggah Foto Galeri</span>
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                        <span>Ubah Identitas Sekolah</span>
                    </Link>
                </div>
            </div>

            {/* Content Tables Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Recent News (7 cols) */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                        <h3 className="font-bold text-slate-900 text-sm">
                            Berita Terbaru
                        </h3>
                        <Link href="/admin/news" className="text-xs font-semibold text-blue-600 hover:underline">
                            Lihat Semua
                        </Link>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {recentNews.map((item) => (
                            <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                                <div className="min-w-0">
                                    <h4 className="text-xs font-bold text-slate-900 truncate">
                                        <Link href={`/admin/news/${item.id}/edit`} className="hover:text-blue-600">
                                            {item.title}
                                        </Link>
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                                        <span>{item.category?.name || 'Umum'}</span>
                                        <span>•</span>
                                        <span>{new Date(item.created_at).toLocaleDateString('id-ID')}</span>
                                    </div>
                                </div>
                                <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                                        item.status === 'published'
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                            : 'bg-slate-100 text-slate-600'
                                    }`}
                                >
                                    {item.status}
                                </span>
                            </div>
                        ))}

                        {recentNews.length === 0 && (
                            <p className="text-xs text-slate-400 text-center py-6">Belum ada data berita.</p>
                        )}
                    </div>
                </div>

                {/* Upcoming Events & Announcements (5 cols) */}
                <div className="lg:col-span-5 space-y-8">
                    {/* Events */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                            <h3 className="font-bold text-slate-900 text-sm">
                                Agenda Terdekat
                            </h3>
                            <Link href="/admin/events" className="text-xs font-semibold text-blue-600 hover:underline">
                                Semua
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {upcomingEvents.map((ev) => (
                                <div key={ev.id} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50">
                                    <div className="w-10 text-center py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold shrink-0">
                                        {new Date(ev.start_date).getDate()} {new Date(ev.start_date).toLocaleDateString('id-ID', { month: 'short' })}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h5 className="text-xs font-bold text-slate-800 truncate">{ev.title}</h5>
                                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{ev.location || 'Sekolah'}</p>
                                    </div>
                                </div>
                            ))}
                            {upcomingEvents.length === 0 && (
                                <p className="text-xs text-slate-400 text-center py-4">Belum ada agenda terdekat.</p>
                            )}
                        </div>
                    </div>

                    {/* Announcements */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                            <h3 className="font-bold text-slate-900 text-sm">
                                Pengumuman Terakhir
                            </h3>
                            <Link href="/admin/announcements" className="text-xs font-semibold text-blue-600 hover:underline">
                                Semua
                            </Link>
                        </div>
                        <div className="space-y-2.5">
                            {recentAnnouncements.map((ann) => (
                                <div key={ann.id} className="text-xs">
                                    <Link href={`/admin/announcements/${ann.id}/edit`} className="font-semibold text-slate-800 hover:text-blue-600 line-clamp-1">
                                        {ann.title}
                                    </Link>
                                    <span className="text-[10px] text-slate-400">
                                        {new Date(ann.created_at).toLocaleDateString('id-ID')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
