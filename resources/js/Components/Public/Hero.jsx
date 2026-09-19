import React from 'react';
import { Link } from '@inertiajs/react';
import { GraduationCap, ArrowRight, Award, Users, BookOpen } from 'lucide-react';

export default function Hero({ settings = {} }) {
    const schoolName = settings.school_name || 'SD Negeri Percontohan';
    const slogan = settings.school_slogan || 'Membentuk Generasi Cerdas, Berkarakter, dan Berakhlak Mulia';
    const description = settings.school_description || 'Sekolah Dasar ramah anak yang mengedepankan pembentukan budi pekerti luhur, kemandirian berfikir kritis, dan eksplorasi minat bakat siswa dengan fasilitas edukasi modern.';

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-200/60">
            {/* Background Subtle Shapes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-24 right-10 w-96 h-96 rounded-full bg-blue-200/35 blur-3xl animate-float" />
                <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl animate-float-reverse" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column: Heading & Content */}
                    <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                        {/* Accreditation Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 text-blue-800 text-xs font-semibold border border-blue-200/70 shadow-2xs animate-fade-in-down">
                            <Award className="w-3.5 h-3.5 text-blue-600" />
                            <span>Sekolah Penggerak & Akreditasi {settings.school_accreditation || 'A (Unggul)'}</span>
                        </div>

                        {/* Title & Slogan */}
                        <div className="animate-fade-in-up">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                                Selamat Datang di <br />
                                <span className="text-[#02569B]">
                                    {schoolName}
                                </span>
                            </h1>
                            <p className="mt-3 text-lg sm:text-xl font-medium text-slate-700">
                                {slogan}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-fade-in-up delay-100">
                            {description}
                        </p>

                        {/* CTA Buttons */}
                        <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-fade-in-up delay-200">
                            <Link
                                href="/ppdb"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md shadow-emerald-600/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
                            >
                                <span>Informasi PPDB 2026</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/tentang"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 text-sm font-semibold border border-slate-300 shadow-xs hover:border-slate-400 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                            >
                                <span>Profil Sekolah</span>
                            </Link>
                        </div>

                        {/* Key Trust Signals */}
                        <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-center lg:text-left animate-fade-in-up delay-300">
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{settings.stat_students || '500+'}</div>
                                <div className="text-xs text-slate-500 font-medium">Siswa Aktif</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{settings.stat_teachers || '35'}</div>
                                <div className="text-xs text-slate-500 font-medium">Guru & Pendidik</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{settings.stat_years || '20+'}</div>
                                <div className="text-xs text-slate-500 font-medium">Tahun Dedikasi</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Hero Visual Card */}
                    <div className="lg:col-span-5 animate-fade-in-right delay-150">
                        <div className="relative mx-auto max-w-md lg:max-w-none group">
                            {/* Decorative backing card */}
                            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-blue-600 to-emerald-500 opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500" />

                            <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-slate-100 p-2 hover-lift">
                                <img
                                    src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80"
                                    alt="Aktivitas Belajar Sekolah Dasar"
                                    className="w-full h-80 sm:h-96 object-cover rounded-xl group-hover:scale-102 transition-transform duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-slate-100 flex items-center gap-3.5">
                                    <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-900">
                                            Sekolah Ramah Anak & Berprestasi
                                        </h4>
                                        <p className="text-[11px] text-slate-500">
                                            Mencetak generasi literat dan berdaya saing global
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
