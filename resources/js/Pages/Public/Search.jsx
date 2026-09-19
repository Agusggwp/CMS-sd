import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/Public/PageHeader';
import NewsCard from '@/Components/Public/NewsCard';
import TeacherCard from '@/Components/Public/TeacherCard';
import Reveal from '@/Components/UI/Reveal';
import { Search as SearchIcon, Newspaper, Calendar, Bell, Trophy, Users } from 'lucide-react';

export default function Search({
    query = '',
    news = [],
    announcements = [],
    events = [],
    achievements = [],
    teachers = [],
}) {
    const [searchTerm, setSearchTerm] = useState(query);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.get('/search', { q: searchTerm.trim() }, { preserveState: true });
        }
    };

    const totalResults = news.length + announcements.length + events.length + achievements.length + teachers.length;

    return (
        <PublicLayout
            title={query ? `Hasil Pencarian: "${query}"` : 'Pencarian'}
            description="Pencarian informasi di seluruh halaman website sekolah."
        >
            <PageHeader title="Pencarian Portal Sekolah">
                <Reveal animation="fade-in-down" className="mt-6 max-w-xl mx-auto">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Ketik kata kunci yang ingin Anda cari..."
                            className="w-full pl-11 pr-24 py-3 text-sm rounded-2xl bg-white text-slate-900 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
                        />
                        <SearchIcon className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 px-5 py-1.5 text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-xs hover:shadow-md transition-all cursor-pointer"
                        >
                            Cari
                        </button>
                    </form>
                </Reveal>
            </PageHeader>

            <section className="py-16 bg-white min-h-[50vh]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {query ? (
                        <Reveal animation="fade-in">
                            <div className="mb-10 pb-4 border-b border-slate-200 flex items-center justify-between">
                                <p className="text-sm text-slate-600">
                                    Ditemukan <strong className="text-slate-900">{totalResults} hasil</strong> untuk kata kunci: <span className="text-blue-600 font-semibold">"{query}"</span>
                                </p>
                            </div>
                        </Reveal>
                    ) : (
                        <p className="text-center py-12 text-slate-400 text-sm">
                            Silakan masukkan kata kunci untuk memulai pencarian.
                        </p>
                    )}

                    {/* Results: News */}
                    {news.length > 0 && (
                        <Reveal animation="fade-in-up" className="mb-12">
                            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Newspaper className="w-4 h-4 text-blue-600" />
                                <span>Berita ({news.length})</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {news.map((item) => (
                                    <NewsCard key={item.id} news={item} />
                                ))}
                            </div>
                        </Reveal>
                    )}

                    {/* Results: Announcements */}
                    {announcements.length > 0 && (
                        <Reveal animation="fade-in-up" className="mb-12">
                            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Bell className="w-4 h-4 text-amber-500" />
                                <span>Pengumuman ({announcements.length})</span>
                            </h2>
                            <div className="space-y-3">
                                {announcements.map((ann, idx) => (
                                    <div key={ann.id} className="hover-lift p-4 rounded-xl bg-slate-50 border border-slate-200 transition-all">
                                        <h3 className="text-sm font-bold text-slate-900 mb-1">
                                            <Link href="/pengumuman" className="hover:text-blue-600 transition-colors">
                                                {ann.title}
                                            </Link>
                                        </h3>
                                        <p className="text-xs text-slate-600 line-clamp-2">{ann.content}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    )}

                    {/* Results: Events */}
                    {events.length > 0 && (
                        <Reveal animation="fade-in-up" className="mb-12">
                            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-emerald-600" />
                                <span>Agenda & Acara ({events.length})</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {events.map((ev) => (
                                    <div key={ev.id} className="hover-lift p-4 rounded-xl bg-white border border-slate-200 shadow-2xs transition-all">
                                        <h3 className="text-sm font-bold text-slate-900">{ev.title}</h3>
                                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">{ev.location}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    )}

                    {/* Results: Teachers */}
                    {teachers.length > 0 && (
                        <Reveal animation="fade-in-up" className="mb-12">
                            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Users className="w-4 h-4 text-purple-600" />
                                <span>Guru & Tenaga Pendidik ({teachers.length})</span>
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {teachers.map((t) => (
                                    <TeacherCard key={t.id} teacher={t} />
                                ))}
                            </div>
                        </Reveal>
                    )}

                    {/* Results: Achievements */}
                    {achievements.length > 0 && (
                        <Reveal animation="fade-in-up" className="mb-12">
                            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-amber-600" />
                                <span>Prestasi ({achievements.length})</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {achievements.map((ach) => (
                                    <div key={ach.id} className="hover-lift p-4 rounded-xl bg-white border border-slate-200 transition-all">
                                        <span className="text-xs font-bold text-amber-600">{ach.rank} ({ach.year})</span>
                                        <h3 className="text-sm font-bold text-slate-900 mt-1">{ach.title}</h3>
                                        <p className="text-xs text-blue-600">{ach.participant}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    )}

                    {query && totalResults === 0 && (
                        <Reveal animation="fade-in">
                            <div className="text-center py-16 text-slate-500 text-sm">
                                Tidak ditemukan konten yang cocok dengan kata kunci "{query}".
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
