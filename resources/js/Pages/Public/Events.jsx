import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/Public/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import Reveal from '@/Components/UI/Reveal';
import { Calendar, Clock, MapPin, Search } from 'lucide-react';

export default function Events({ upcomingEvents = { data: [] }, pastEvents = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get('/agenda', { search }, { preserveState: true, replace: true });
    };

    return (
        <PublicLayout
            title="Agenda & Kegiatan Sekolah"
            description="Jadwal kegiatan akademik, ekstrakurikuler, dan peringatan hari besar sekolah."
        >
            <PageHeader
                badge="Kalender Kegiatan"
                title="Agenda & Acara Sekolah"
                description="Jadwal agenda mendatang serta rekam jejak kegiatan yang telah terlaksana."
            />

            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search filter */}
                    <div className="max-w-md mx-auto mb-12">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari kegiatan atau lokasi agenda..."
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

                    {/* Upcoming Events */}
                    <div className="mb-14">
                        <Reveal direction="up">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <span>Agenda Mendatang</span>
                            </h2>
                        </Reveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {upcomingEvents.data.map((ev, idx) => {
                                const d = new Date(ev.start_date);
                                const day = d.getDate();
                                const month = d.toLocaleDateString('id-ID', { month: 'short' });
                                const time = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

                                return (
                                    <Reveal key={ev.id} direction="up" delay={idx * 80}>
                                        <div
                                            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover-lift transition-all flex items-start gap-4 h-full"
                                        >
                                            <div className="shrink-0 w-16 rounded-xl overflow-hidden border border-blue-200/80 shadow-xs bg-white text-center">
                                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase py-0.5 tracking-wider">
                                                    {month}
                                                </div>
                                                <div className="py-2 px-1 bg-gradient-to-b from-blue-50/50 to-white">
                                                    <span className="block text-2xl font-black text-slate-900 leading-none">
                                                        {day}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-slate-900 text-base leading-snug">
                                                    {ev.title}
                                                </h3>
                                                <div className="mt-2.5 space-y-1.5 text-xs text-slate-500">
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                        <span>{time} WIB</span>
                                                    </div>
                                                    {ev.location && (
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                            <span>{ev.location}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                                    {ev.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>

                        {upcomingEvents.data.length === 0 && (
                            <p className="text-center py-8 text-sm text-slate-400 animate-fade-in">
                                Tidak ada agenda mendatang yang terjadwal saat ini.
                            </p>
                        )}

                        <Pagination links={upcomingEvents.links} className="mt-6" />
                    </div>

                    {/* Past Events */}
                    {pastEvents.length > 0 && (
                        <Reveal direction="up">
                            <div className="pt-8 border-t border-slate-200">
                                <h2 className="text-lg font-bold text-slate-900 mb-6">
                                    Kegiatan yang Telah Terlaksana
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {pastEvents.map((pev) => (
                                        <div
                                            key={pev.id}
                                            className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-slate-100 hover-lift transition-all"
                                        >
                                            <span className="text-[11px] text-slate-400">
                                                {new Date(pev.start_date).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                            <h4 className="font-bold text-xs text-slate-800 line-clamp-1 mt-1">
                                                {pev.title}
                                            </h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
