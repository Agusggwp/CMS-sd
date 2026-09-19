import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/Public/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import Reveal from '@/Components/UI/Reveal';
import { Trophy, Award, Search } from 'lucide-react';

export default function Achievements({ achievements = { data: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get('/prestasi', {
            search,
            level: filters.level,
        }, { preserveState: true, replace: true });
    };

    const handleLevelFilter = (level) => {
        router.get('/prestasi', {
            level: level === filters.level ? null : level,
            search: filters.search,
        }, { preserveState: true, replace: true });
    };

    const levels = ['Kecamatan', 'Kota / Kabupaten', 'Provinsi', 'Nasional'];

    return (
        <PublicLayout
            title="Prestasi Siswa & Sekolah"
            description="Daftar kejuaraan dan capaian membanggakan siswa di bidang akademik, olahraga, dan seni."
        >
            <PageHeader
                badge="Ruang Penghargaan"
                title="Prestasi Siswa & Sekolah"
                description="Bukti dedikasi, kerja keras, dan pembinaan potensi talenta terbaik peserta didik kami."
            />

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filter bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
                        {/* Level buttons */}
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                type="button"
                                onClick={() => handleLevelFilter(null)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                    !filters.level
                                        ? 'bg-amber-500 text-white shadow-xs'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                            >
                                Semua Tingkat
                            </button>
                            {levels.map((lvl) => (
                                <button
                                    key={lvl}
                                    type="button"
                                    onClick={() => handleLevelFilter(lvl)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                        filters.level === lvl
                                            ? 'bg-amber-500 text-white shadow-xs'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                                >
                                    {lvl}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <form onSubmit={handleSearchSubmit} className="relative max-w-xs w-full">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama siswa atau lomba..."
                                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        </form>
                    </div>

                    {/* Achievements Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {achievements.data.map((item, idx) => (
                            <Reveal key={item.id} direction="up" delay={idx * 60}>
                                <div
                                    className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs hover-lift transition-all flex flex-col justify-between h-full"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                                <Trophy className="w-6 h-6" />
                                            </div>
                                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                                                Tahun {item.year}
                                            </span>
                                        </div>

                                        <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
                                            {item.rank || 'Penghargaan'}
                                        </span>

                                        <h3 className="text-base font-bold text-slate-900 mt-1 mb-2 leading-snug">
                                            {item.title}
                                        </h3>

                                        {item.participant && (
                                            <p className="text-xs font-semibold text-blue-700 mb-2">
                                                Pemenang: {item.participant}
                                            </p>
                                        )}

                                        {item.description && (
                                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-5 pt-3 border-t border-slate-100 text-xs font-medium text-slate-500 flex items-center justify-between">
                                        <span>Tingkat:</span>
                                        <span className="text-slate-800 font-semibold">{item.level}</span>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {achievements.data.length === 0 && (
                        <div className="text-center py-16 text-slate-400 text-sm">
                            Tidak ada data prestasi yang cocok.
                        </div>
                    )}

                    <Pagination links={achievements.links} className="mt-12" />
                </div>
            </section>
        </PublicLayout>
    );
}
