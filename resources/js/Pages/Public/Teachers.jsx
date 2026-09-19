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
            title="Guru & Tenaga Kependidikan"
            description="Daftar tenaga pendidik profesional dan staf sekolah yang berdedikasi."
        >
            <PageHeader
                badge="Sumber Daya Manusia"
                title="Guru & Tenaga Kependidikan"
                description="Pendidik berpengalaman dan berdedikasi tinggi yang mendampingi tumbuh kembang putra-putri Anda."
            />

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search filter */}
                    <div className="max-w-md mx-auto mb-12">
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
