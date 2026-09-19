import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/Public/PageHeader';
import Reveal from '@/Components/UI/Reveal';
import { Award, BookOpen, ShieldCheck, Heart, User, CheckCircle2 } from 'lucide-react';

export default function About({ settings = {}, principal = null }) {
    const schoolName = settings.school_name || 'SD Negeri Percontohan';

    return (
        <PublicLayout
            title="Tentang Kami"
            description={`Profil, sejarah singkat, dan komitmen ${schoolName} dalam mendidik anak bangsa.`}
        >
            {/* Header Banner */}
            <PageHeader
                badge="Profil Satuan Pendidikan"
                title={`Tentang ${schoolName}`}
                description="Membangun generasi cerdas berkarakter, mengutamakan budi pekerti dan prestasi."
            />

            {/* Profile Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-6 space-y-5">
                            <Reveal direction="up">
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                    Sejarah & Perkembangan
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug mt-1">
                                    Lebih dari Dua Dekade Mengabdi untuk Masa Depan Pendidikan Indonesia
                                </h2>
                            </Reveal>

                            <Reveal direction="up" delay={100}>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Didirikan sejak tahun 2001, {schoolName} lahir dari tekad kuat untuk menyediakan wadah pembelajaran sekolah dasar negeri yang inklusif, berkualitas tinggi, serta mampu memadukan kecerdasan intelektual, emosional, dan spiritual anak.
                                </p>
                            </Reveal>

                            <Reveal direction="up" delay={150}>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Melalui implementasi Kurikulum Merdeka dan Program Sekolah Penggerak, kami menciptakan ekosistem belajar yang menyenangkan, menstimulasi nalar kritis, dan menjunjung tinggi nilai-nilai Profil Pelajar Pancasila.
                                </p>
                            </Reveal>

                            <Reveal direction="up" delay={200}>
                                <div className="pt-4 grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover-lift">
                                        <h4 className="font-bold text-slate-900 text-sm mb-1">Akreditasi Sekolah</h4>
                                        <p className="text-xs text-emerald-600 font-semibold">{settings.school_accreditation || 'A (Unggul)'} oleh BAN-SM</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover-lift">
                                        <h4 className="font-bold text-slate-900 text-sm mb-1">Nomor Pokok Sekolah</h4>
                                        <p className="text-xs text-blue-600 font-semibold">NPSN: {settings.school_npsn || '50102030'}</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="lg:col-span-6">
                            <Reveal direction="left" delay={200}>
                                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 group hover-lift">
                                    <img
                                        src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80"
                                        alt="Kegiatan Belajar Siswa"
                                        className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sambutan Kepala Sekolah */}
            <section className="py-16 bg-slate-50 border-t border-slate-200/80">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="up">
                        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs hover-lift">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                                <div className="shrink-0 text-center">
                                    <div className="w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 mx-auto shadow-xs">
                                        {settings.principal_photo ? (
                                            <img
                                                src={settings.principal_photo}
                                                alt={settings.principal_name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-blue-600 bg-blue-50">
                                                <User className="w-14 h-14" />
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="font-bold text-slate-900 text-sm mt-3">
                                        {settings.principal_name}
                                    </h4>
                                    <p className="text-xs text-blue-600 font-medium">Kepala Sekolah</p>
                                </div>

                                <div className="flex-1 space-y-3">
                                    <h3 className="text-xl font-bold text-slate-900">
                                        Pesan dari Kepala Sekolah
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                                        "{settings.principal_speech}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </PublicLayout>
    );
}
