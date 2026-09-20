import React, { useState, useEffect, useRef } from 'react';
import { Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/Public/PageHeader';
import NewsCard from '@/Components/Public/NewsCard';
import TeacherCard from '@/Components/Public/TeacherCard';
import Reveal from '@/Components/UI/Reveal';
import {
    Search as SearchIcon,
    Newspaper,
    Calendar,
    Bell,
    Trophy,
    Users,
    FileText,
    GraduationCap,
    Download,
    ArrowRight,
    Loader2,
    X,
} from 'lucide-react';

export default function Search({
    query = '',
    news = [],
    announcements = [],
    events = [],
    achievements = [],
    teachers = [],
    documents = [],
    ppdb = null,
}) {
    const [searchTerm, setSearchTerm] = useState(query);
    const [isTypingSearching, setIsTypingSearching] = useState(false);
    const debounceRef = useRef(null);

    useEffect(() => {
        setSearchTerm(query);
    }, [query]);

    const executeSearch = (val) => {
        const trimmed = val.trim();
        setIsTypingSearching(false);
        router.get(
            '/search',
            trimmed ? { q: trimmed } : {},
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    const handleInputChange = (val) => {
        setSearchTerm(val);
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        setIsTypingSearching(true);
        debounceRef.current = setTimeout(() => {
            executeSearch(val);
        }, 350);
    };

    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault();
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        executeSearch(searchTerm);
    };

    const handleClear = () => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        setSearchTerm('');
        executeSearch('');
    };

    const totalResults =
        news.length +
        announcements.length +
        events.length +
        achievements.length +
        teachers.length +
        documents.length +
        (ppdb ? 1 : 0);

    const suggestions = ['Berita', 'Prestasi', 'Guru', 'PPDB', 'Dokumen', 'Agenda', 'Visi Misi'];

    return (
        <PublicLayout
            title={query ? `Hasil Pencarian: "${query}"` : 'Pencarian Portal'}
            description="Pencarian informasi di seluruh halaman website sekolah tanpa refresh."
        >
            <PageHeader title="Pencarian Portal Sekolah">
                <Reveal animation="fade-in-down" className="mt-6 max-w-xl mx-auto">
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => handleInputChange(e.target.value)}
                            placeholder="Ketik kata kunci: berita, prestasi, guru, dokumen, PPDB..."
                            className="w-full pl-11 pr-28 py-3 text-sm rounded-2xl bg-white text-slate-900 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all border border-slate-200"
                        />
                        <SearchIcon className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                        
                        <div className="absolute right-2 top-2 flex items-center gap-1.5">
                            {isTypingSearching && (
                                <Loader2 className="w-4 h-4 text-blue-600 animate-spin mr-1" />
                            )}
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors cursor-pointer"
                                    title="Hapus pencarian"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                            <button
                                type="submit"
                                className="px-4 py-1.5 text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-xs hover:shadow-md transition-all cursor-pointer"
                            >
                                Cari
                            </button>
                        </div>
                    </form>

                    {/* Quick suggestion tags */}
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs">
                        <span className="text-white/80 font-medium mr-1">Rekomendasi:</span>
                        {suggestions.map((sug) => (
                            <button
                                key={sug}
                                type="button"
                                onClick={() => {
                                    setSearchTerm(sug);
                                    executeSearch(sug);
                                }}
                                className="px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-blue-900 font-medium transition-all backdrop-blur-xs cursor-pointer text-[11px]"
                            >
                                {sug}
                            </button>
                        ))}
                    </div>
                </Reveal>
            </PageHeader>

            <section className="py-12 bg-slate-50 min-h-[50vh]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {query ? (
                        <Reveal animation="fade-in">
                            <div className="mb-8 pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <p className="text-sm text-slate-600">
                                    Ditemukan <strong className="text-slate-900">{totalResults} hasil</strong> untuk kata kunci: <span className="text-blue-600 font-bold">"{query}"</span>
                                </p>
                                {totalResults > 0 && (
                                    <span className="text-xs text-slate-400">
                                        Pencarian live otomatis tanpa reload halaman
                                    </span>
                                )}
                            </div>
                        </Reveal>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-xs">
                                <SearchIcon className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-bold text-slate-800">Mulai Pencarian</h3>
                            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                                Ketik kata kunci pada kotak pencarian di atas untuk menemukan berita, guru, prestasi, pengumuman, dan informasi PPDB secara langsung.
                            </p>
                        </div>
                    )}

                    {/* Results: PPDB Alert Card */}
                    {ppdb && (
                        <Reveal animation="fade-in-up" className="mb-10">
                            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0B1E63] to-blue-800 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20">
                                        <GraduationCap className="w-7 h-7 text-amber-300" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-bold text-white">
                                                PPDB Online {ppdb.academic_year || ''}
                                            </h3>
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-900">
                                                {ppdb.is_registration_open ? 'PENDAFTARAN BUKA' : 'INFORMASI'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-blue-100 mt-1 line-clamp-2 max-w-2xl">
                                            {ppdb.title || 'Informasi Penerimaan Peserta Didik Baru, jadwal seleksi, alur pendaftaran, dan syarat berkas.'}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/ppdb"
                                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 shadow-sm"
                                >
                                    <span>Halaman PPDB</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </Reveal>
                    )}

                    {/* Results: News */}
                    {news.length > 0 && (
                        <Reveal animation="fade-in-up" className="mb-12">
                            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Newspaper className="w-4 h-4 text-blue-600" />
                                <span>Berita & Informasi ({news.length})</span>
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
                                {announcements.map((ann) => (
                                    <div key={ann.id} className="hover-lift p-4 rounded-xl bg-white border border-slate-200 transition-all shadow-2xs">
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
                                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">{ev.location || 'Lingkungan SDN Lebak Bulus 07'}</p>
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
                                <span>Prestasi Siswa ({achievements.length})</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {achievements.map((ach) => (
                                    <div key={ach.id} className="hover-lift p-4 rounded-xl bg-white border border-slate-200 transition-all shadow-2xs">
                                        <span className="text-xs font-bold text-amber-600">{ach.ranking || ach.rank} ({ach.year})</span>
                                        <h3 className="text-sm font-bold text-slate-900 mt-1">{ach.title}</h3>
                                        <p className="text-xs text-blue-600">{ach.participant}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    )}

                    {/* Results: Documents */}
                    {documents.length > 0 && (
                        <Reveal animation="fade-in-up" className="mb-12">
                            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-cyan-700" />
                                <span>Dokumen & Brosur ({documents.length})</span>
                            </h2>
                            <div className="space-y-3">
                                {documents.map((doc) => (
                                    <div key={doc.id} className="hover-lift p-4 rounded-xl bg-white border border-slate-200 transition-all shadow-2xs flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-slate-900">{doc.title}</h3>
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    {doc.type?.toUpperCase() || 'DOKUMEN'} {doc.size ? `• ${doc.size}` : ''}
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            href={`/dokumen/${doc.id}/download`}
                                            className="px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            <span>Unduh</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    )}

                    {query && totalResults === 0 && (
                        <Reveal animation="fade-in">
                            <div className="text-center py-16 text-slate-500 text-sm bg-white rounded-2xl border border-slate-200/80 p-8 shadow-2xs">
                                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                                    <SearchIcon className="w-6 h-6" />
                                </div>
                                <h4 className="text-sm font-bold text-slate-800 mb-1">
                                    Tidak ditemukan konten yang cocok
                                </h4>
                                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                                    Tidak ada hasil untuk kata kunci "{query}". Silakan coba dengan kata kunci lain di bawah ini.
                                </p>
                                <div className="flex flex-wrap justify-center gap-1.5 text-xs">
                                    {suggestions.map((sug) => (
                                        <button
                                            key={sug}
                                            type="button"
                                            onClick={() => {
                                                setSearchTerm(sug);
                                                executeSearch(sug);
                                            }}
                                            className="px-3 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-full text-slate-600 transition-colors cursor-pointer"
                                        >
                                            {sug}
                                        </button>
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
