import React from 'react';
import { Link } from '@inertiajs/react';
import { GraduationCap, ArrowRight, Award, Users, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Hero({ settings = {} }) {
    const schoolName = settings.school_name || 'SD Negeri Percontohan';
    const slogan = settings.school_slogan || 'Membentuk Generasi Cerdas, Berkarakter, dan Berakhlak Mulia';
    const description = settings.school_description || 'Sekolah Dasar ramah anak yang mengedepankan pembentukan budi pekerti luhur, kemandirian berfikir kritis, dan eksplorasi minat bakat siswa dengan fasilitas edukasi modern.';

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-slate-50/80 pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-200/60">
            {/* Background Subtle Shapes & Ambient Mesh */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-24 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-blue-300/30 to-indigo-300/20 blur-3xl animate-float" />
                <div className="absolute top-1/2 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-emerald-300/25 to-teal-300/20 blur-3xl animate-float-reverse" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column: Heading & Content */}
                    <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                        {/* Accreditation Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 text-blue-900 text-xs font-bold border border-blue-200 shadow-xs backdrop-blur-md animate-fade-in-down">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                            <Award className="w-3.5 h-3.5 text-blue-600" />
                            <span>Sekolah Penggerak & Akreditasi {settings.school_accreditation || 'A (Unggul)'}</span>
                        </div>

                        {/* Title & Slogan */}
                        <div className="animate-fade-in-up">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                                Selamat Datang di <br />
                                <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                                    {schoolName}
                                </span>
                            </h1>
                            <p className="mt-4 text-base sm:text-lg md:text-xl font-semibold text-slate-700 leading-snug">
                                {slogan}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-fade-in-up delay-100">
                            {description}
                        </p>

                        {/* CTA Buttons */}
                        <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-fade-in-up delay-200">
                            <Link
                                href="/ppdb"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                            >
                                <span>Informasi PPDB 2026</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/tentang"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-blue-600 text-sm font-bold border border-slate-300/80 shadow-xs hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                            >
                                <span>Profil Sekolah</span>
                            </Link>
                        </div>

                        {/* Key Trust Signals */}
                        <div className="pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-center lg:text-left animate-fade-in-up delay-300">
                            <div className="p-3 sm:p-4 rounded-2xl bg-white/70 border border-slate-200/60 shadow-2xs hover:border-blue-200 transition-colors">
                                <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">{settings.stat_students || '500+'}</div>
                                <div className="text-xs text-slate-500 font-semibold mt-0.5">Siswa Aktif</div>
                            </div>
                            <div className="p-3 sm:p-4 rounded-2xl bg-white/70 border border-slate-200/60 shadow-2xs hover:border-blue-200 transition-colors">
                                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700">{settings.stat_teachers || '35'}</div>
                                <div className="text-xs text-slate-500 font-semibold mt-0.5">Guru & Pendidik</div>
                            </div>
                            <div className="p-3 sm:p-4 rounded-2xl bg-white/70 border border-slate-200/60 shadow-2xs hover:border-blue-200 transition-colors">
                                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">{settings.stat_years || '20+'}</div>
                                <div className="text-xs text-slate-500 font-semibold mt-0.5">Tahun Dedikasi</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Hero Visual Card */}
                    <div className="lg:col-span-5 animate-fade-in-right delay-150">
                        <div className="relative mx-auto max-w-md lg:max-w-none group">
                            {/* Decorative backing card */}
                            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-500 opacity-25 blur-xl group-hover:opacity-35 transition-opacity duration-700" />

                            <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl border-4 border-white p-2 hover-lift">
                                <div className="relative rounded-2xl overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80"
                                        alt="Aktivitas Belajar Sekolah Dasar"
                                        className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

                                    {/* Top Floating Badge */}
                                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-white/60 text-xs font-bold text-slate-800">
                                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                        <span>Sekolah Ramah Anak</span>
                                    </div>
                                </div>

                                {/* Bottom Glass Overlay Card */}
                                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100/80 flex items-center gap-3.5">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                                            Kurikulum Merdeka & Berprestasi
                                        </h4>
                                        <p className="text-[11px] text-slate-500 mt-0.5">
                                            Membina akhlak mulia dan kecerdasan masa depan
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

