import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/Public/PageHeader';
import TeacherCard from '@/Components/Public/TeacherCard';
import Pagination from '@/Components/UI/Pagination';
import Reveal from '@/Components/UI/Reveal';
import { Search } from 'lucide-react';

export default function Teachers({ teachers = { data: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get('/guru', { search }, { preserveState: true, replace: true });
    };

    return (
        <PublicLayout
            title="Guru & Tenaga Kependidikan | SDN 4 Sebatu"
            description="Daftar profil dewan guru dan tenaga kependidikan SDN 4 Sebatu di Sebatu, Tegallalang, Gianyar. Pendidik berdedikasi tinggi untuk generasi penerus bangsa."
        >
            <PageHeader
                badge="Sumber Daya Manusia"
                title="Guru & Tenaga Kependidikan SDN 4 Sebatu"
                description="Profil guru dan tenaga kependidikan SDN 4 Sebatu, Desa Sebatu, Kecamatan Tegallalang, Gianyar yang berdedikasi membimbing dan mendidik putra-putri bangsa."
            />

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search filter */}
                    <div className="max-w-md mx-auto mb-8">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama guru, jabatan, atau mata pelajaran..."
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

                    {/* CTA Banner for teacher self-registration */}
                    <div className="max-w-2xl mx-auto mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                                    <line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">Bapak/Ibu Guru?</p>
                                <p className="text-xs text-slate-500">Isi data profil Anda sendiri untuk ditampilkan di halaman ini.</p>
                            </div>
                        </div>
                        <a
                            href="/guru/daftar"
                            className="shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                        >
                            Isi Data Saya →
                        </a>
                    </div>

                    {/* Teachers Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {teachers.data.map((teacher, idx) => (
                            <Reveal key={teacher.id} direction="up" delay={idx * 60}>
                                <TeacherCard teacher={teacher} />
                            </Reveal>
                        ))}
                    </div>

                    {teachers.data.length === 0 && (
                        <div className="text-center py-12 text-slate-500 text-sm animate-fade-in">
                            Tidak ada data guru yang cocok dengan pencarian Anda.
                        </div>
                    )}

                    <Pagination links={teachers.links} className="mt-8" />
                </div>
            </section>
        </PublicLayout>
    );
}
