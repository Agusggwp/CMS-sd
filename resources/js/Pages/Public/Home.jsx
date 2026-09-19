import React from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Hero from '@/Components/Public/Hero';
import NewsCard from '@/Components/Public/NewsCard';
import TeacherCard from '@/Components/Public/TeacherCard';
import GalleryCard from '@/Components/Public/GalleryCard';
import FacilityCard from '@/Components/Public/FacilityCard';
import Reveal from '@/Components/UI/Reveal';
import {
    Calendar,
    MapPin,
    ArrowRight,
    Bell,
    BookOpen,
    Trophy,
    GraduationCap,
    Clock,
    Phone,
    Mail,
    MessageCircle,
    CheckCircle2,
    Quote,
    User,
} from 'lucide-react';

export default function Home({
    settings = {},
    latestNews = [],
    announcements = [],
    upcomingEvents = [],
    teachers = [],
    achievements = [],
    facilities = [],
    galleries = [],
    ppdb = null,
}) {
    const schoolName = settings.school_name || 'SD Negeri Percontohan';
    const principalName = settings.principal_name || 'Dra. Hj. Sri Wahyuni, M.Pd.';
    const principalTitle = settings.principal_title || 'Kepala Sekolah SD Negeri Percontohan';
    const principalSpeech = settings.principal_speech || 'Selamat datang di portal resmi kami. Kami berkomitmen memberikan pendidikan terbaik yang ramah anak, berakar pada budi pekerti, dan menstimulasi keunggulan potensi tiap siswa.';

    return (
        <PublicLayout
            title="Beranda"
            description={`${schoolName} - Membentuk Generasi Cerdas, Berkarakter, dan Berakhlak Mulia.`}
        >
            {/* 1. HERO SECTION */}
            <Hero settings={settings} />

            {/* 2. SAMBUTAN KEPALA SEKOLAH */}
            <section className="py-16 md:py-20 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-white rounded-3xl p-6 sm:p-10 md:p-12 border border-blue-100/90 shadow-sm hover-lift relative overflow-hidden">
                            {/* Decorative ambient shape */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
                            
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                                {/* Principal Photo */}
                                <div className="lg:col-span-4 text-center">
                                    <div className="relative inline-block">
                                        <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden shadow-xl border-4 border-white mx-auto bg-slate-100 ring-4 ring-blue-200/50">
                                            {settings.principal_photo ? (
                                                <img
                                                    src={settings.principal_photo}
                                                    alt={principalName}
                                                    className="w-full h-full object-cover hover:scale-108 transition-transform duration-700 ease-out"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600">
                                                    <User className="w-20 h-20" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-snug">
                                                {principalName}
                                            </h3>
                                            <p className="text-xs font-bold text-blue-700 mt-1">
                                                {principalTitle}
                                            </p>
                                            {settings.principal_nip && (
                                                <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                                                    NIP. {settings.principal_nip}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Principal Speech */}
                                <div className="lg:col-span-8 space-y-4">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center shadow-xs">
                                            <Quote className="w-5 h-5 rotate-180" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                                            Sambutan Kepala Sekolah
                                        </span>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                                        Mewujudkan Generasi Emas yang Cerdas, Mandiri, dan Bertakwa
                                    </h2>
                                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed italic border-l-2 border-blue-300 pl-4">
                                        "{principalSpeech}"
                                    </p>
                                    <div className="pt-2">
                                        <Link
                                            href="/tentang"
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:translate-x-1 transition-all"
                                        >
                                            <span>Selengkapnya tentang profil sekolah</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* 3. TENTANG SEKOLAH & STATISTIK */}
            <section className="py-16 md:py-20 bg-slate-50/60 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-4 py-1.5 rounded-full border border-blue-200 shadow-2xs">
                                Sekilas Sekolah
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3.5 tracking-tight">
                                Mendidik dengan Hati, Menginspirasi dengan Prestasi
                            </h2>
                            <p className="mt-2 text-sm text-slate-600">
                                Komitmen kami dalam menghadirkan lingkungan belajar yang aman, nyaman, dan menyenangkan bagi seluruh siswa.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <Reveal direction="up" delay={50}>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center hover-lift hover:border-blue-300 transition-all">
                                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto mb-3.5 shadow-md shadow-blue-500/25">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <div className="text-3xl font-black text-slate-900 mb-1 tracking-tight">
                                    {settings.stat_students || '500+'}
                                </div>
                                <div className="text-xs font-semibold text-slate-500">Siswa Aktif</div>
                            </div>
                        </Reveal>

                        <Reveal direction="up" delay={100}>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center hover-lift hover:border-emerald-300 transition-all">
                                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mx-auto mb-3.5 shadow-md shadow-emerald-500/25">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <div className="text-3xl font-black text-slate-900 mb-1 tracking-tight">
                                    {settings.stat_teachers || '35'}
                                </div>
                                <div className="text-xs font-semibold text-slate-500">Guru Berdedikasi</div>
                            </div>
                        </Reveal>

                        <Reveal direction="up" delay={150}>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center hover-lift hover:border-amber-300 transition-all">
                                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center mx-auto mb-3.5 shadow-md shadow-amber-500/25">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div className="text-3xl font-black text-slate-900 mb-1 tracking-tight">
                                    {settings.stat_years || '20+'}
                                </div>
                                <div className="text-xs font-semibold text-slate-500">Tahun Berdiri</div>
                            </div>
                        </Reveal>

                        <Reveal direction="up" delay={200}>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center hover-lift hover:border-purple-300 transition-all">
                                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-600 text-white flex items-center justify-center mx-auto mb-3.5 shadow-md shadow-purple-500/25">
                                    <Trophy className="w-6 h-6" />
                                </div>
                                <div className="text-3xl font-black text-slate-900 mb-1 tracking-tight">
                                    {settings.stat_achievements || '48'}
                                </div>
                                <div className="text-xs font-semibold text-slate-500">Piala Prestasi</div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 4. BERITA TERBARU & PENGUMUMAN (GRID 2 KOLOM) */}
            <section className="py-16 md:py-20 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                    Berita & Informasi
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                                    Kabar Terkini Sekolah
                                </h2>
                            </div>
                            <Link
                                href="/berita"
                                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 group"
                            >
                                <span>Semua Berita</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Berita (8 Kolom) */}
                        <div className="lg:col-span-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {latestNews.map((news, idx) => (
                                    <Reveal key={news.id} direction="up" delay={idx * 75}>
                                        <NewsCard news={news} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>

                        {/* Pengumuman (4 Kolom) */}
                        <div className="lg:col-span-4">
                            <Reveal direction="left" delay={150}>
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover-lift">
                                    <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                                                <Bell className="w-4 h-4" />
                                            </div>
                                            <h3 className="font-bold text-slate-900 text-base">Pengumuman</h3>
                                        </div>
                                        <Link
                                            href="/pengumuman"
                                            className="text-xs font-semibold text-blue-600 hover:underline"
                                        >
                                            Lihat Semua
                                        </Link>
                                    </div>

                                    <div className="space-y-4">
                                        {announcements.map((ann) => (
                                            <div
                                                key={ann.id}
                                                className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-2xs hover:border-blue-300 hover:-translate-y-0.5 transition-all"
                                            >
                                                <div className="text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {ann.created_at
                                                        ? new Date(ann.created_at).toLocaleDateString('id-ID', {
                                                              day: 'numeric',
                                                              month: 'short',
                                                              year: 'numeric',
                                                          })
                                                        : ''}
                                                </div>
                                                <h4 className="text-xs font-bold text-slate-900 leading-snug hover:text-blue-600">
                                                    <Link href="/pengumuman">{ann.title}</Link>
                                                </h4>
                                                <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                                                    {ann.content}
                                                </p>
                                            </div>
                                        ))}
                                        {announcements.length === 0 && (
                                            <p className="text-xs text-slate-400 text-center py-4">
                                                Belum ada pengumuman terbaru.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. AGENDA / EVENT MENDATANG */}
            <section className="py-16 md:py-20 bg-slate-50/60 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                    Kalender Akademik
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                                    Agenda Kegiatan Mendatang
                                </h2>
                            </div>
                            <Link
                                href="/agenda"
                                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 group"
                            >
                                <span>Semua Agenda</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {upcomingEvents.map((ev, idx) => {
                            const dateObj = new Date(ev.start_date);
                            const day = dateObj.getDate();
                            const month = dateObj.toLocaleDateString('id-ID', { month: 'short' });
                            const time = dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

                            return (
                                <Reveal key={ev.id} direction="up" delay={idx * 100}>
                                    <div
                                        className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-xl hover:border-blue-300/80 hover-lift transition-all flex items-start gap-4 h-full group"
                                    >
                                        {/* Tear-off Calendar Badge */}
                                        <div className="shrink-0 text-center w-14 rounded-xl overflow-hidden border border-blue-200/80 shadow-xs group-hover:scale-105 transition-transform">
                                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold uppercase py-1 tracking-wider">
                                                {month}
                                            </div>
                                            <div className="bg-blue-50/80 text-blue-900 text-xl font-black py-1.5 leading-none">
                                                {day}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {ev.title}
                                            </h4>
                                            <div className="mt-2.5 space-y-1 text-xs text-slate-500">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                                                    <span>Pukul {time} WIB</span>
                                                </div>
                                                {ev.location && (
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                        <span className="line-clamp-1">{ev.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 6. GURU & TENAGA PENDIDIK */}
            <section className="py-16 md:py-20 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-4 py-1.5 rounded-full border border-blue-200 shadow-2xs">
                                    Dewan Pendidik
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3.5">
                                    Guru & Tenaga Kependidikan
                                </h2>
                            </div>
                            <Link
                                href="/guru"
                                className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 group"
                            >
                                <span>Lihat Semua Guru</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {teachers.map((teacher, idx) => (
                            <Reveal key={teacher.id} direction="up" delay={idx * 75}>
                                <TeacherCard teacher={teacher} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. PRESTASI SISWA */}
            <section className="py-16 md:py-20 bg-slate-50/60 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-4 py-1.5 rounded-full border border-amber-200 shadow-2xs">
                                    Jejak Prestasi
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3.5">
                                    Prestasi Membanggakan Siswa
                                </h2>
                            </div>
                            <Link
                                href="/prestasi"
                                className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 group"
                            >
                                <span>Lihat Semua Prestasi</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {achievements.map((item, idx) => (
                            <Reveal key={item.id} direction="up" delay={idx * 100}>
                                <div
                                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-xl hover:border-amber-300 hover-lift transition-all flex flex-col justify-between h-full group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
                                                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                                                <span>{item.rank}</span>
                                            </span>
                                            <span className="text-xs font-mono font-semibold text-slate-400">
                                                {item.year}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-1.5">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-slate-600 font-medium">
                                            {item.participant}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                                        <span>Tingkat: <strong className="text-slate-700">{item.level || 'Kota/Provinsi'}</strong></span>
                                        <span className="text-amber-500 font-semibold">Berprestasi</span>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. FASILITAS SEKOLAH */}
            <section className="py-16 md:py-20 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-4 py-1.5 rounded-full border border-blue-200 shadow-2xs">
                                    Fasilitas Unggulan
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3.5">
                                    Sarana Penunjang Belajar Modern
                                </h2>
                            </div>
                            <Link
                                href="/fasilitas"
                                className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 group"
                            >
                                <span>Lihat Semua Fasilitas</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {facilities.map((fac, idx) => (
                            <Reveal key={fac.id} direction="up" delay={idx * 100}>
                                <FacilityCard facility={fac} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. GALERI TERBARU */}
            <section className="py-16 md:py-20 bg-slate-50/60 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-4 py-1.5 rounded-full border border-blue-200 shadow-2xs">
                                    Dokumentasi Kegiatan
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3.5">
                                    Momen Ceria & Pembiasaan Karakter
                                </h2>
                            </div>
                            <Link
                                href="/galeri"
                                className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 group"
                            >
                                <span>Lihat Semua Galeri</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {galleries.map((gallery, idx) => (
                            <Reveal key={gallery.id} direction="up" delay={idx * 100}>
                                <GalleryCard gallery={gallery} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10. PPDB CTA SECTION */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="scale">
                        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border border-blue-800/40 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
                            {/* Decorative subtle ambient lights */}
                            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none animate-float" />
                            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none animate-float-reverse" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/10 blur-3xl pointer-events-none" />

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                                <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
                                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-amber-300 text-xs font-bold shadow-md">
                                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                                        Tahun Ajaran {ppdb?.academic_year || '2026/2027'}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                                        Daftarkan Putra-Putri Anda di {schoolName}
                                    </h2>
                                    <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                                        Mari bersama kami menciptakan fondasi karakter yang kokoh, gemar membaca, berakhlak mulia, dan berprestasi sejak jenjang sekolah dasar.
                                    </p>
                                </div>
                                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center lg:justify-end">
                                    <Link
                                        href="/ppdb"
                                        className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-center text-sm shadow-lg shadow-amber-500/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                                    >
                                        {ppdb?.is_registration_open ? 'Daftar Online Sekarang' : 'Informasi & Alur Pendaftaran'}
                                    </Link>
                                    <Link
                                        href="/kontak"
                                        className="px-7 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-center text-sm border border-slate-700 shadow-md hover:border-slate-600 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                                    >
                                        Hubungi Panitia PPDB
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* 11. KONTAK & PETA */}
            <section className="py-16 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        {/* Information Details */}
                        <div className="lg:col-span-5 space-y-6">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                    Lokasi & Layanan
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                                    Hubungi Kami
                                </h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    Kami siap melayani pertanyaan seputar kurikulum, pendaftaran siswa baru, maupun kunjungan sekolah.
                                </p>
                            </div>

                            <div className="space-y-4 text-sm text-slate-700">
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
                                            Alamat Resmi
                                        </h4>
                                        <p className="mt-1 text-xs text-slate-600">
                                            {settings.school_address || 'Jl. Pendidikan No. 45, Kebon Jeruk, Jakarta Barat'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
                                            Telepon & WhatsApp
                                        </h4>
                                        <p className="mt-1 text-xs text-slate-600">
                                            {settings.school_phone || '(021) 567-8901'}
                                        </p>
                                        {settings.school_whatsapp && (
                                            <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                                                WA: {settings.school_whatsapp}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
                                            Surat Elektronik (Email)
                                        </h4>
                                        <p className="mt-1 text-xs text-slate-600">
                                            {settings.school_email || 'info@sdpercontohan.sch.id'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Google Maps Embed */}
                        <div className="lg:col-span-7">
                            <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs h-96 bg-slate-100">
                                {settings.school_maps ? (
                                    <iframe
                                        src={settings.school_maps}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Peta Lokasi Sekolah"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-sm">
                                        <MapPin className="w-8 h-8 mb-2" />
                                        <span>Peta lokasi Google Maps</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
