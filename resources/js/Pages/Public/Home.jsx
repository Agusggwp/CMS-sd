import React, { useState } from 'react';
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
    HelpCircle,
    ChevronDown,
    Building2,
    Compass,
    Sparkles,
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
    const schoolName = settings.school_name || 'SD Negeri 4 Sebatu';
    const principalName = settings.principal_name || 'I Wayan Sudiarta, S.Pd., M.Pd.';
    const principalTitle = settings.principal_title || 'Kepala Sekolah SDN 4 Sebatu';
    const principalSpeech = settings.principal_speech || 'Om Swastyastu. Selamat datang di website resmi SDN 4 Sebatu. Kami berkomitmen memberikan pendidikan terbaik yang ramah anak, berakar pada kearifan lokal Bali, budi pekerti luhur, dan menstimulasi keunggulan potensi tiap siswa.';

    const [openFaqIndex, setOpenFaqIndex] = useState(0);

    // FAQ Data for Users & Structured Data Schema
    const faqs = [
        {
            question: 'Apa itu SDN 4 Sebatu?',
            answer: 'SDN 4 Sebatu (SD Negeri 4 Sebatu) merupakan salah satu sekolah dasar negeri resmi di bawah naungan Dinas Pendidikan Kabupaten Gianyar yang menyelenggarakan pendidikan formal jenjang SD (kelas 1 sampai kelas 6) dengan kurikulum ramah anak, berkualitas, dan berakar pada nilai-nilai budaya luhur.',
        },
        {
            question: 'Di mana lokasi dan alamat resmi SDN 4 Sebatu?',
            answer: 'SDN 4 Sebatu beralamat di Banjar Sebatu, Desa Sebatu, Kecamatan Tegallalang, Kabupaten Gianyar, Provinsi Bali, Kode Pos 80561. Lokasinya berada di kawasan Desa Sebatu yang tenang, aman, dan kondusif untuk proses belajar mengajar anak-anak.',
        },
        {
            question: 'SDN 4 Sebatu berada di kecamatan dan kabupaten apa?',
            answer: 'SDN 4 Sebatu berada di wilayah Desa Sebatu, Kecamatan Tegallalang, Kabupaten Gianyar, Provinsi Bali.',
        },
        {
            question: 'Kurikulum apa yang diterapkan di SDN 4 Sebatu?',
            answer: 'SDN 4 Sebatu menerapkan Kurikulum Merdeka yang berorientasi pada penguatan Profil Pelajar Pancasila, pembelajaran berbasis kompetensi esensial, penanaman budi pekerti, literasi, numerasi, serta pelestarian seni dan kearifan budaya lokal Bali.',
        },
        {
            question: 'Informasi apa saja yang tersedia di website resmi SDN 4 Sebatu?',
            answer: 'Website resmi SDN 4 Sebatu menyediakan informasi profil sekolah, visi misi, data dewan guru dan tenaga kependidikan, berita dan liputan kegiatan siswa, prestasi sekolah, galeri dokumentasi foto, kalender agenda, fasilitas, serta informasi pendaftaran siswa baru (PPDB online).',
        },
        {
            question: 'Bagaimana cara menghubungi atau mendaftar di SDN 4 Sebatu?',
            answer: 'Orang tua atau masyarakat dapat menghubungi panitia melalui halaman Kontak di website ini, telepon/WhatsApp resmi di (0361) 908-1234 / 0812-3456-7890, atau datang langsung ke kantor SDN 4 Sebatu pada hari kerja (Senin - Sabtu pukul 07.00 - 14.00 WITA).',
        },
    ];

    return (
        <PublicLayout
            title="SDN 4 Sebatu | SD Negeri di Sebatu, Tegallalang, Gianyar"
            description="SDN 4 Sebatu merupakan sekolah dasar negeri di Sebatu, Tegallalang, Gianyar, Bali yang menyediakan informasi profil sekolah, kegiatan, berita, prestasi, guru, dan informasi pendidikan."
            keywords="SDN 4 Sebatu, SD 4 Sebatu, SD Sebatu, SD Tegallalang, SD Negeri 4 Sebatu, sekolah dasar Sebatu, sekolah di Sebatu, SD negeri di Sebatu, SD di Tegallalang, sekolah dasar Tegallalang, sekolah negeri Tegallalang, SDN Sebatu, SD Sebatu Tegallalang, pendidikan Sebatu, sekolah dasar Gianyar, SD negeri Gianyar, sekolah dasar di Gianyar Bali, SD Negeri 4 Sebatu Tegallalang, SDN 4 Sebatu Tegallalang Gianyar, alamat SDN 4 Sebatu, profil SDN 4 Sebatu, informasi SDN 4 Sebatu, SD 4 Sebatu Gianyar, SD Sebatu Gianyar Bali, sekolah dasar dekat Tegallalang"
            faq={faqs}
        >
            {/* 1. HERO SECTION (With Single H1: SDN 4 Sebatu) */}
            <Hero settings={settings} />

            {/* 2. PROFIL SDN 4 SEBATU & SAMBUTAN KEPALA SEKOLAH */}
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
                                                    alt={`Foto ${principalName} - ${principalTitle}`}
                                                    className="w-full h-full object-cover hover:scale-108 transition-transform duration-700 ease-out"
                                                    loading="lazy"
                                                    decoding="async"
                                                    width="208"
                                                    height="208"
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
                                        Profil SDN 4 Sebatu di Sebatu, Tegallalang, Gianyar
                                    </h2>
                                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed italic border-l-2 border-blue-300 pl-4">
                                        "{principalSpeech}"
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                                        SDN 4 Sebatu berkomitmen menghadirkan ekosistem pembelajaran yang ramah anak dan inklusif bagi seluruh siswa di wilayah Desa Sebatu, Kecamatan Tegallalang, Kabupaten Gianyar, Bali. Kami menggabungkan keunggulan akademik dengan pembentukan budi pekerti luhur dan pelestarian nilai-nilai kearifan lokal Bali.
                                    </p>
                                    <div className="pt-2">
                                        <Link
                                            href="/profil"
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:translate-x-1 transition-all"
                                        >
                                            <span>Profil SDN 4 Sebatu selengkapnya</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* 3. INFORMASI SEKOLAH SEBATU & STATISTIK */}
            <section className="py-16 md:py-20 bg-slate-50/60 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-4 py-1.5 rounded-full border border-blue-200 shadow-2xs">
                                Pusat Informasi Pendidikan
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3.5 tracking-tight">
                                Informasi Sekolah Sebatu
                            </h2>
                            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                                SDN 4 Sebatu merupakan salah satu sekolah dasar negeri yang berada di wilayah Sebatu, Kecamatan Tegallalang, Kabupaten Gianyar, Bali. Website ini menjadi pusat informasi sekolah yang menyajikan profil, kegiatan, berita, prestasi, informasi guru dan tenaga kependidikan, serta berbagai informasi pendidikan bagi siswa, orang tua, dan masyarakat.
                            </p>
                        </div>
                    </Reveal>

                    {(() => {
                        const hasVal = (v) => v !== null && v !== undefined && String(v).trim() !== '';
                        const statStudents = hasVal(settings.stat_students) ? settings.stat_students : '180+';
                        const statTeachers = hasVal(settings.stat_teachers) ? settings.stat_teachers : '14';
                        const statYears = hasVal(settings.stat_years) ? settings.stat_years : '25+';
                        const statAchievements = hasVal(settings.stat_achievements) ? settings.stat_achievements : '30+';

                        return (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <Reveal direction="up" delay={50}>
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center hover-lift hover:border-blue-300 transition-all">
                                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto mb-3.5 shadow-md shadow-blue-500/25">
                                            <GraduationCap className="w-6 h-6" />
                                        </div>
                                        <div className="text-3xl font-black text-slate-900 mb-1 tracking-tight">
                                            {statStudents}
                                        </div>
                                        <div className="text-xs font-semibold text-slate-500">Siswa Aktif SDN 4 Sebatu</div>
                                    </div>
                                </Reveal>

                                <Reveal direction="up" delay={100}>
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center hover-lift hover:border-emerald-300 transition-all">
                                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mx-auto mb-3.5 shadow-md shadow-emerald-500/25">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <div className="text-3xl font-black text-slate-900 mb-1 tracking-tight">
                                            {statTeachers}
                                        </div>
                                        <div className="text-xs font-semibold text-slate-500">Guru & Tenaga Pendidik</div>
                                    </div>
                                </Reveal>

                                <Reveal direction="up" delay={150}>
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center hover-lift hover:border-amber-300 transition-all">
                                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center mx-auto mb-3.5 shadow-md shadow-amber-500/25">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        <div className="text-3xl font-black text-slate-900 mb-1 tracking-tight">
                                            {statYears}
                                        </div>
                                        <div className="text-xs font-semibold text-slate-500">Tahun Dedikasi Pendidikan</div>
                                    </div>
                                </Reveal>

                                <Reveal direction="up" delay={200}>
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center hover-lift hover:border-purple-300 transition-all">
                                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-600 text-white flex items-center justify-center mx-auto mb-3.5 shadow-md shadow-purple-500/25">
                                            <Trophy className="w-6 h-6" />
                                        </div>
                                        <div className="text-3xl font-black text-slate-900 mb-1 tracking-tight">
                                            {statAchievements}
                                        </div>
                                        <div className="text-xs font-semibold text-slate-500">Prestasi & Kejuaraan</div>
                                    </div>
                                </Reveal>
                            </div>
                        );
                    })()}
                </div>
            </section>

            {/* 4. KEGIATAN & KABAR TERKINI SDN 4 SEBATU */}
            <section className="py-16 md:py-20 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                    Kabar & Artikel Sekolah
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                                    Kegiatan & Berita SDN 4 Sebatu
                                </h2>
                            </div>
                            <Link
                                href="/berita"
                                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 group"
                            >
                                <span>Lihat Berita Sekolah</span>
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
                            {latestNews.length === 0 && (
                                <p className="text-sm text-slate-500 py-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                                    Belum ada artikel berita terbaru.
                                </p>
                            )}
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
                                            <h3 className="font-bold text-slate-900 text-base">Pengumuman Sekolah</h3>
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

            {/* 5. AGENDA KEGIATAN SDN 4 SEBATU */}
            <section className="py-16 md:py-20 bg-slate-50/60 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                    Kalender Akademik
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                                    Agenda Sekolah Sebatu
                                </h2>
                            </div>
                            <Link
                                href="/agenda"
                                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 group"
                            >
                                <span>Semua Agenda Sekolah</span>
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
                                            <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {ev.title}
                                            </h3>
                                            <div className="mt-2.5 space-y-1 text-xs text-slate-500">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                                                    <span>Pukul {time} WITA</span>
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
                        {upcomingEvents.length === 0 && (
                            <div className="col-span-3 text-center py-8 text-xs text-slate-400">
                                Belum ada agenda kegiatan mendatang yang dijadwalkan.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 6. GURU DAN TENAGA KEPENDIDIKAN SDN 4 SEBATU */}
            <section className="py-16 md:py-20 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-4 py-1.5 rounded-full border border-blue-200 shadow-2xs">
                                    Tenaga Pendidik
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3.5">
                                    Guru dan Tenaga Kependidikan SDN 4 Sebatu
                                </h2>
                            </div>
                            <Link
                                href="/guru"
                                className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 group"
                            >
                                <span>Lihat Profil Guru</span>
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

            {/* 7. PRESTASI SISWA SDN 4 SEBATU */}
            <section className="py-16 md:py-20 bg-slate-50/60 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-4 py-1.5 rounded-full border border-amber-200 shadow-2xs">
                                    Jejak Prestasi
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3.5">
                                    Prestasi Siswa SDN 4 Sebatu
                                </h2>
                            </div>
                            <Link
                                href="/prestasi"
                                className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 group"
                            >
                                <span>Lihat Semua Prestasi Siswa</span>
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
                                        <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-1.5">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-slate-600 font-medium">
                                            {item.participant}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                                        <span>Tingkat: <strong className="text-slate-700">{item.level || 'Kecamatan / Kabupaten'}</strong></span>
                                        <span className="text-amber-500 font-semibold">Berprestasi</span>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. FASILITAS SDN 4 SEBATU DI TEGALLALANG */}
            <section className="py-16 md:py-20 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-4 py-1.5 rounded-full border border-blue-200 shadow-2xs">
                                    Sarana Prasarana
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3.5">
                                    Fasilitas SDN 4 Sebatu di Tegallalang
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

            {/* 9. DOKUMENTASI & GALERI KEGIATAN SDN 4 SEBATU */}
            <section className="py-16 md:py-20 bg-slate-50/60 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-4 py-1.5 rounded-full border border-blue-200 shadow-2xs">
                                    Dokumentasi Kegiatan
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3.5">
                                    Dokumentasi & Galeri Kegiatan SDN 4 Sebatu
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
            <section className="py-12 md:py-16 bg-white border-b border-slate-100">
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
                                        Penerimaan Peserta Didik Baru (PPDB) SDN 4 Sebatu
                                    </h2>
                                    <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                                        Mari bersama SDN 4 Sebatu membentuk fondasi karakter yang kokoh, gemar membaca, berakhlak mulia, berbudaya, dan berprestasi sejak jenjang sekolah dasar di Sebatu, Tegallalang.
                                    </p>
                                </div>
                                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center lg:justify-end">
                                    <Link
                                        href="/ppdb"
                                        className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-center text-sm shadow-lg shadow-amber-500/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                                    >
                                        {ppdb?.is_registration_open ? 'Daftar PPDB Online Sekarang' : 'Informasi & Alur PPDB SDN 4 Sebatu'}
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

            {/* 11. FAQ SECTION (PERTANYAAN UMUM SEPUTAR SDN 4 SEBATU) */}
            <section className="py-16 md:py-20 bg-slate-50/70 border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="text-center mb-12">
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-4 py-1.5 rounded-full border border-blue-200 shadow-2xs">
                                Tanya Jawab
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3.5 tracking-tight">
                                Pertanyaan Umum (FAQ) Seputar SDN 4 Sebatu
                            </h2>
                            <p className="mt-2 text-sm text-slate-600">
                                Jawaban resmi untuk pertanyaan yang sering diajukan mengenai SDN 4 Sebatu, lokasi, kurikulum, dan informasi pendaftaran.
                            </p>
                        </div>
                    </Reveal>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaqIndex === idx;
                            return (
                                <Reveal key={idx} direction="up" delay={idx * 60}>
                                    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all">
                                        <button
                                            type="button"
                                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                            className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer"
                                            aria-expanded={isOpen}
                                        >
                                            <span className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-3">
                                                <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                                                <span>{faq.question}</span>
                                            </span>
                                            <ChevronDown
                                                className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                                                    isOpen ? 'rotate-180 text-blue-600' : ''
                                                }`}
                                            />
                                        </button>
                                        {isOpen && (
                                            <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/40">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 12. LOKASI DAN KONTAK RESMI SDN 4 SEBATU */}
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
                                    Lokasi dan Kontak Resmi SDN 4 Sebatu
                                </h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    Kami siap melayani informasi kurikulum, pendaftaran siswa baru (PPDB), dan layanan administrasi sekolah di Banjar Sebatu, Tegallalang, Gianyar, Bali.
                                </p>
                            </div>

                            <div className="space-y-4 text-sm text-slate-700">
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
                                            Alamat Resmi SDN 4 Sebatu
                                        </h3>
                                        <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                                            {settings.school_address || 'Banjar Sebatu, Desa Sebatu, Kecamatan Tegallalang, Kabupaten Gianyar, Bali 80561'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
                                            Telepon & WhatsApp
                                        </h3>
                                        <p className="mt-1 text-xs text-slate-600">
                                            {settings.school_phone || '(0361) 908-1234'}
                                        </p>
                                        {settings.school_whatsapp && (
                                            <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                                                WhatsApp: {settings.school_whatsapp}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
                                            Surat Elektronik (Email)
                                        </h3>
                                        <p className="mt-1 text-xs text-slate-600">
                                            {settings.school_email || 'info@sdn4sebatu.sch.id'}
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
                                        title="Peta Lokasi Resmi SDN 4 Sebatu di Tegallalang Gianyar"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-sm">
                                        <MapPin className="w-8 h-8 mb-2 text-blue-600" />
                                        <span className="font-semibold text-slate-700">Peta Lokasi SDN 4 Sebatu</span>
                                        <span className="text-xs text-slate-500 mt-1">Banjar Sebatu, Desa Sebatu, Kec. Tegallalang, Gianyar, Bali</span>
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
