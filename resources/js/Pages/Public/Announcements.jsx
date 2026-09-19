import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/Public/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import Reveal from '@/Components/UI/Reveal';
import { Bell, Calendar, Search } from 'lucide-react';

export default function Announcements({ announcements = { data: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get('/pengumuman', { search }, { preserveState: true, replace: true });
    };

    return (
        <PublicLayout
            title="Pengumuman Resmi"
            description="Informasi dan pengumuman kedinasan resmi bagi orang tua murid dan peserta didik."
        >
            <PageHeader
                badge="Pemberitahuan"
                title="Pengumuman Sekolah"
                description="Pemberitahuan resmi terkait jadwal ujian, libur sekolah, serta kegiatan penting lainnya."
            />

            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search filter */}
                    <div className="max-w-md mx-auto mb-10">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari pengumuman..."
                                className="w-full pl-10 pr-20 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 shadow-2xs"
                            />
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            <button
                                type="submit"
                                className="absolute right-2 top-1.5 px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Cari
                            </button>
                        </form>
                    </div>

                    {/* Announcement Cards */}
                    <div className="space-y-6">
                        {announcements.data.map((item, idx) => (
                            <Reveal key={item.id} direction="up" delay={idx * 75}>
                                <div
                                    className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-300 hover-lift transition-all"
                                >
                                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
                                        <Bell className="w-4 h-4 text-amber-500" />
                                        <span>
                                            Diterbitkan:{' '}
                                            {item.created_at
                                                ? new Date(item.created_at).toLocaleDateString('id-ID', {
                                                      day: 'numeric',
                                                      month: 'long',
                                                      year: 'numeric',
                                                  })
                                                : ''}
                                        </span>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                        {item.content}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {announcements.data.length === 0 && (
                        <div className="text-center py-16 text-slate-400 text-sm animate-fade-in">
                            Tidak ada pengumuman yang sesuai.
                        </div>
                    )}

                    <Pagination links={announcements.links} className="mt-8" />
                </div>
            </section>
        </PublicLayout>
    );
}
