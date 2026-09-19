import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/Public/PageHeader';
import Pagination from '@/Components/UI/Pagination';
import Reveal from '@/Components/UI/Reveal';
import { FileText, Download, Search } from 'lucide-react';

export default function Documents({ documents = { data: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get('/dokumen', { search }, { preserveState: true, replace: true });
    };

    return (
        <PublicLayout
            title="Unduh Dokumen Publik"
            description="Pusat unduhan berkas panduan, kalender pendidikan, dan formulir resmi sekolah."
        >
            <PageHeader
                badge="Pusat Unduhan"
                title="Dokumen & Berkas Publik"
                description="Akses berkas kurikulum, kalender pendidikan, formulir, dan pedoman resmi sekolah."
            />

            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search */}
                    <Reveal animation="fade-in-down" className="max-w-md mx-auto mb-10">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama dokumen atau berkas..."
                                className="w-full pl-10 pr-20 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 shadow-2xs focus:shadow-md transition-all"
                            />
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            <button
                                type="submit"
                                className="absolute right-2 top-1.5 px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
                            >
                                Cari
                            </button>
                        </form>
                    </Reveal>

                    {/* Documents List */}
                    <div className="space-y-4">
                        {documents.data.map((doc, idx) => (
                            <Reveal key={doc.id} animation="fade-in-up" delay={Math.min(idx * 60, 400)}>
                                <div
                                    className="hover-lift p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                >
                                    <div className="flex items-start gap-3.5">
                                        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-sm leading-snug">
                                                {doc.title}
                                            </h3>
                                            {doc.description && (
                                                <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                                                    {doc.description}
                                                </p>
                                            )}
                                            <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
                                                <span className="font-semibold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                                    {doc.type || 'FILE'}
                                                </span>
                                                {doc.size && <span>Ukuran: {doc.size}</span>}
                                                <span>Diunduh: {doc.download_count}x</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="shrink-0">
                                        <a
                                            href={`/dokumen/${doc.id}/download`}
                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-semibold border border-blue-200 hover:border-blue-600 transition-all duration-200 shadow-2xs"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            <span>Unduh Berkas</span>
                                        </a>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {documents.data.length === 0 && (
                        <div className="text-center py-16 text-slate-400 text-sm">
                            Tidak ada dokumen yang sesuai dengan pencarian Anda.
                        </div>
                    )}

                    <Pagination links={documents.links} className="mt-8" />
                </div>
            </section>
        </PublicLayout>
    );
}
