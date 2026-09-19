import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/Public/PageHeader';
import NewsCard from '@/Components/Public/NewsCard';
import Pagination from '@/Components/UI/Pagination';
import Reveal from '@/Components/UI/Reveal';
import { Search, Tag } from 'lucide-react';

export default function Index({ news = { data: [] }, categories = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get('/berita', {
            search,
            category: filters.category,
        }, { preserveState: true, replace: true });
    };

    const handleCategoryFilter = (slug) => {
        router.get('/berita', {
            category: slug === filters.category ? null : slug,
            search: filters.search,
        }, { preserveState: true, replace: true });
    };

    return (
        <PublicLayout
            title="Berita & Artikel Sekolah"
            description="Kumpulan berita resmi, liputan kegiatan siswa, dan prestasi sekolah dasar."
        >
            <PageHeader
                badge="Portal Berita"
                title="Kabar & Berita Sekolah"
                description="Ikuti perkembangan kegiatan, prestasi membanggakan, dan wawasan pendidikan terkini."
            />

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filter and Search Bar */}
                    <Reveal animation="fade-in-down">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
                            {/* Category Pills */}
                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleCategoryFilter(null)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                        !filters.category
                                            ? 'bg-blue-600 text-white shadow-xs scale-105'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                                >
                                    Semua Kategori
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => handleCategoryFilter(cat.slug)}
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                            filters.category === cat.slug
                                                ? 'bg-blue-600 text-white shadow-xs scale-105'
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                    >
                                        {cat.name} ({cat.news_count ?? 0})
                                    </button>
                                ))}
                            </div>

                            {/* Search Input */}
                            <form onSubmit={handleSearchSubmit} className="relative max-w-xs w-full">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari judul atau isi berita..."
                                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 shadow-2xs focus:shadow-xs transition-all"
                                />
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                            </form>
                        </div>
                    </Reveal>

                    {/* News Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.data.map((item, idx) => (
                            <Reveal key={item.id} animation="fade-in-up" delay={Math.min(idx * 75, 450)}>
                                <NewsCard news={item} />
                            </Reveal>
                        ))}
                    </div>

                    {news.data.length === 0 && (
                        <div className="text-center py-16 text-slate-500 text-sm">
                            Tidak ada berita ditemukan yang sesuai dengan kriteria filter Anda.
                        </div>
                    )}

                    <Pagination links={news.links} className="mt-12" />
                </div>
            </section>
        </PublicLayout>
    );
}
