import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/Public/PageHeader';
import Reveal from '@/Components/UI/Reveal';
import { Target, Compass, CheckCircle2, Award } from 'lucide-react';

export default function VisionMission({ settings = {} }) {
    const schoolName = settings.school_name || 'SD Negeri Percontohan';
    const vision = settings.vision || 'Terwujudnya peserta didik yang beriman dan bertakwa, cerdas bernalar kritis, unggul dalam prestasi, serta berwawasan lingkungan dan global.';
    const mission = settings.mission || "1. Menumbuhkan penghayatan nilai keagamaan.\n2. Melaksanakan pembelajaran inovatif dan berpusat pada siswa.\n3. Mengembangkan bakat, minat, dan kreativitas siswa.\n4. Membiasakan budaya literasi dan numerasi.\n5. Mewujudkan lingkungan sekolah sehat dan aman.";

    const missionItems = mission.split('\n').filter(Boolean);

    return (
        <PublicLayout
            title="Visi & Misi"
            description={`Visi, Misi, dan Nilai Utama ${schoolName}.`}
        >
            <PageHeader
                badge="Landasan & Arah Pendidikan"
                title="Visi & Misi Sekolah"
                description={`Pedoman bagi setiap langkah pembinaan dan pembelajaran di ${schoolName}.`}
            />

            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    {/* VISI */}
                    <Reveal direction="up">
                        <div className="bg-blue-50/70 border border-blue-200/80 rounded-3xl p-8 sm:p-10 relative overflow-hidden hover-lift">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                                    <Compass className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
                                    Visi Sekolah
                                </h2>
                            </div>
                            <blockquote className="text-base sm:text-xl font-medium text-slate-800 leading-relaxed italic">
                                "{vision}"
                            </blockquote>
                        </div>
                    </Reveal>

                    {/* MISI */}
                    <Reveal direction="up" delay={100}>
                        <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-3xl p-8 sm:p-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                                    <Target className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
                                    Misi Sekolah
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {missionItems.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-emerald-100 shadow-2xs hover:border-emerald-300 hover-lift transition-all">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                            {item.replace(/^\d+\.\s*/, '')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {/* NILAI PANCASILA */}
                    <Reveal direction="up" delay={150}>
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center hover-lift">
                            <h3 className="font-bold text-slate-900 text-lg mb-2">
                                Profil Pelajar Pancasila
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-6">
                                Menanamkan 6 dimensi karakter utama bagi seluruh peserta didik kami:
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-700">
                                <div className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">1. Beriman & Bertakwa</div>
                                <div className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">2. Berkebhinekaan Global</div>
                                <div className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">3. Bergotong Royong</div>
                                <div className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">4. Mandiri</div>
                                <div className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">5. Bernalar Kritis</div>
                                <div className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">6. Kreatif</div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </PublicLayout>
    );
}
