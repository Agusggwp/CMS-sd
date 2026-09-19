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
                        <div className="bg-gradient-to-br from-blue-50/60 to-slate-50/80 rounded-3xl p-6 sm:p-10 md:p-12 border border-blue-100/70 shadow-xs hover-lift">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                {/* Principal Photo */}
                                <div className="lg:col-span-4 text-center">
                                    <div className="relative inline-block">
                                        <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-lg border-4 border-white mx-auto bg-slate-200">
                                            {settings.principal_photo ? (
                                                <img
                                                    src={settings.principal_photo}
                                                    alt={principalName}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600">
                                                    <User className="w-20 h-20" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="font-bold text-slate-900 text-lg sm:text-xl">
                                                {principalName}
                                            </h3>
                                            <p className="text-xs font-semibold text-blue-600 mt-0.5">
                                                {principalTitle}
                                            </p>
                                            {settings.principal_nip && (
                                                <p className="text-[11px] text-slate-400 mt-0.5">
                                                    NIP. {settings.principal_nip}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Principal Speech */}
                                <div className="lg:col-span-8 space-y-4">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <Quote className="w-8 h-8 opacity-40 rotate-180" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                                            Sambutan Kepala Sekolah
                                        </span>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                                        Mewujudkan Generasi Emas yang Cerdas, Mandiri, dan Bertakwa
                                    </h2>
                                    <p className="text-sm text-slate-600 leading-relaxed italic">
                                        "{principalSpeech}"
                                    </p>
                                    <div className="pt-2">
                                        <Link
                                            href="/tentang"
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:translate-x-1 transition-all"
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
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                Sekilas Sekolah
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
                                Mendidik dengan Hati, Menginspirasi dengan Prestasi
                            </h2>
                            <p className="mt-2 text-sm text-slate-600">
                                Komitmen kami dalam menghadirkan lingkungan belajar yang aman, nyaman, dan menyenangkan bagi seluruh siswa.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <Reveal direction="up" delay={50}>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center hover-lift">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <div className="text-3xl font-extrabold text-slate-900 mb-1">
                                    {settings.stat_students || '500+'}
                                </div>
                                <div className="text-xs font-medium text-slate-500">Siswa Aktif</div>
                            </div>
                        </Reveal>

                        <Reveal direction="up" delay={100}>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center hover-lift">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <div className="text-3xl font-extrabold text-slate-900 mb-1">
                                    {settings.stat_teachers || '35'}
                                </div>
                                <div className="text-xs font-medium text-slate-500">Guru Berdedikasi</div>
                            </div>
                        </Reveal>

                        <Reveal direction="up" delay={150}>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center hover-lift">
                                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div className="text-3xl font-extrabold text-slate-900 mb-1">
                                    {settings.stat_years || '20+'}
                                </div>
                                <div className="text-xs font-medium text-slate-500">Tahun Berdiri</div>
                            </div>
                        </Reveal>

                        <Reveal direction="up" delay={200}>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center hover-lift">
                                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
                                    <Trophy className="w-6 h-6" />
                                </div>
                                <div className="text-3xl font-extrabold text-slate-900 mb-1">
                                    {settings.stat_achievements || '48'}
                                </div>
                                <div className="text-xs font-medium text-slate-500">Piala Prestasi</div>
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
                                        className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover-lift transition-all flex items-start gap-4 h-full"
                                    >
                                        <div className="shrink-0 text-center w-14 py-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100">
                                            <span className="block text-xl font-extrabold leading-none">{day}</span>
                                            <span className="block text-xs font-bold uppercase mt-1">{month}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-slate-900 leading-snug hover:text-blue-600 line-clamp-2">
                                                {ev.title}
                                            </h4>
                                            <div className="mt-2 space-y-1 text-xs text-slate-500">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5 text-slate-400" />
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
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                    Dewan Pendidik
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                                    Guru & Tenaga Kependidikan
                                </h2>
                            </div>
                            <Link
                                href="/guru"
                                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 group"
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
                                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                                    Kebanggaan Sekolah
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                                    Prestasi Terbaru Siswa
                                </h2>
                            </div>
                            <Link
                                href="/prestasi"
                                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 group"
                            >
                                <span>Semua Prestasi</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {achievements.map((item, idx) => (
                            <Reveal key={item.id} direction="up" delay={idx * 75}>
                                <div
                                    className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover-lift transition-all flex flex-col h-full"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                                        <Trophy className="w-5 h-5" />
                                    </div>
                                    <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                                        {item.rank || 'Penghargaan'} • {item.year}
                                    </span>
                                    <h4 className="text-sm font-bold text-slate-900 mt-1 mb-2 leading-snug">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-blue-600 font-medium mb-1">
                                        {item.participant}
                                    </p>
                                    <p className="text-xs text-slate-500 line-clamp-2 mt-auto pt-2 border-t border-slate-100">
                                        {item.level}
                                    </p>
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
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                Sarana & Prasarana
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
                                Fasilitas Belajar yang Lengkap & Ramah Anak
                            </h2>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {facilities.map((facility, idx) => (
                            <Reveal key={facility.id} direction="up" delay={idx * 75}>
                                <FacilityCard facility={facility} />
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
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                    Dokumentasi
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                                    Galeri Kegiatan Sekolah
                                </h2>
                            </div>
                            <Link
                                href="/galeri"
                                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 group"
                            >
                                <span>Semua Album</span>
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
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-xl">
                            {/* Decorative subtle ambient lights */}
                            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl pointer-events-none animate-float" />
                            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl pointer-events-none animate-float-reverse" />

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                                <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
                                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-semibold animate-pulse-glow">
                                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                                        Tahun Ajaran {ppdb?.academic_year || '2026/2027'}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                                        Daftarkan Putra-Putri Anda di {schoolName}
                                    </h2>
                                    <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                                        Mari bersama kami menciptakan fondasi karakter yang kokoh, gemar membaca, berakhlak mulia, dan berprestasi sejak jenjang sekolah dasar.
                                    </p>
                                </div>
                                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:justify-end">
                                    <Link
                                        href="/ppdb"
                                        className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-center text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                                    >
                                        {ppdb?.is_registration_open ? 'Daftar Online Sekarang' : 'Informasi & Alur Pendaftaran'}
                                    </Link>
                                    <Link
                                        href="/kontak"
                                        className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-center text-sm border border-slate-700 hover:-translate-y-0.5 transition-all"
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
