import React from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/Public/PageHeader';
import Reveal from '@/Components/UI/Reveal';
import { Award, BookOpen, ShieldCheck, Heart, User, CheckCircle2, MapPin, Target, Compass, ArrowRight } from 'lucide-react';

export default function About({ settings = {}, principal = null }) {
    const schoolName = settings.school_name || 'SD Negeri 4 Sebatu';

    const historyBadge = settings.history_badge || 'Sejarah & Perkembangan';
    const historyTitle = settings.history_title || 'Mengabdi untuk Pendidikan Berkualitas di Desa Sebatu, Tegallalang';
    const historyP1 = settings.history_paragraph_1 || `SDN 4 Sebatu berlokasi di Banjar Sebatu, Desa Sebatu, Kecamatan Tegallalang, Kabupaten Gianyar, Bali. Berdiri di tengah masyarakat yang menjunjung tinggi adat, seni, budaya, dan nilai gotong royong, sekolah ini hadir sebagai pusat pembinaan generasi muda yang unggul secara akademik, berbudi pekerti luhur, dan berakar pada Profil Pelajar Pancasila.`;
    const historyP2 = settings.history_paragraph_2 || 'Melalui penerapan Kurikulum Merdeka, SDN 4 Sebatu menciptakan ekosistem pembelajaran yang aktif, menyenangkan, dan ramah anak. Kami menstimulasi potensi daya nalar kritis siswa serta membekali anak dengan keterampilan hidup dan kecintaan terhadap kebudayaan Bali.';
    const historyPhoto = settings.history_photo || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80';

    return (
        <PublicLayout
            title="Profil SDN 4 Sebatu | Sekolah Dasar Negeri di Sebatu, Tegallalang"
            description="Profil resmi SDN 4 Sebatu di Desa Sebatu, Kecamatan Tegallalang, Gianyar, Bali. Informasi sejarah, visi dan misi, tujuan pendidikan, akreditasi, dan kepemimpinan sekolah."
            breadcrumbs={[
                { name: 'Profil SDN 4 Sebatu', url: '/profil' },
            ]}
        >
            {/* Header Banner with H1 */}
            <PageHeader
                badge="Profil Resmi Sekolah"
                title="Profil SDN 4 Sebatu"
                description="Sekolah Dasar Negeri di Banjar Sebatu, Desa Sebatu, Kecamatan Tegallalang, Kabupaten Gianyar, Bali."
            />

            {/* Section 1: Tentang SDN 4 Sebatu & SDN 4 Sebatu di Sebatu, Tegallalang */}
            <section className="py-16 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-6 space-y-6">
                            <Reveal direction="up">
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                                    Identitas Satuan Pendidikan
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mt-3">
                                    Tentang SDN 4 Sebatu
                                </h2>
                                <p className="text-sm text-slate-600 leading-relaxed mt-2">
                                    SDN 4 Sebatu merupakan salah satu sekolah dasar negeri yang berada di wilayah Desa Sebatu, Kecamatan Tegallalang, Kabupaten Gianyar, Bali. Sebagai lembaga pendidikan dasar formal, SDN 4 Sebatu melayani anak-anak usia sekolah dasar dari kelas 1 hingga kelas 6 dengan kurikulum nasional yang berorientasi pada kemajuan intelektual, spiritual, dan sosial.
                                </p>
                            </Reveal>

                            <Reveal direction="up" delay={100}>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                    SDN 4 Sebatu di Sebatu, Tegallalang
                                </h2>
                                <p className="text-sm text-slate-600 leading-relaxed mt-1">
                                    Terletak di kawasan asri Desa Sebatu, Tegallalang, SDN 4 Sebatu dikelilingi oleh lingkungan alam yang tenang dan kekayaan adat budaya Bali yang kental. Lingkungan ini menjadi laboratorium nyata bagi peserta didik untuk belajar tentang pelestarian lingkungan, kearifan lokal, dan nilai-nilai kebersamaan Tri Hita Karana.
                                </p>
                            </Reveal>

                            <Reveal direction="up" delay={150}>
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover-lift">
                                        <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">Akreditasi Sekolah</h4>
                                        <p className="text-xs text-emerald-600 font-bold">{settings.school_accreditation || 'B oleh BAN-SM'}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover-lift">
                                        <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">Nomor Pokok Sekolah</h4>
                                        <p className="text-xs text-blue-600 font-bold">NPSN: {settings.school_npsn || '50101995'}</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="lg:col-span-6">
                            <Reveal direction="left" delay={200}>
                                <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 group hover-lift bg-slate-100">
                                    <img
                                        src={historyPhoto}
                                        alt="Gedung dan suasana lingkungan belajar SDN 4 Sebatu Tegallalang Gianyar"
                                        className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                        decoding="async"
                                        width="1000"
                                        height="667"
                                    />
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Sejarah Sekolah */}
            <section className="py-16 bg-slate-50/70 border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <Reveal direction="up">
                        <div className="text-center max-w-2xl mx-auto mb-8">
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-4 py-1.5 rounded-full border border-amber-200">
                                Rekam Jejak
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                                Sejarah Sekolah
                            </h2>
                        </div>
                    </Reveal>

                    <Reveal direction="up" delay={100}>
                        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-2xs space-y-4">
                            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                                {historyP1}
                            </p>
                            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                                {historyP2}
                            </p>
                            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                                Seiring perjalanan waktu, SDN 4 Sebatu terus melahirkan lulusan-lulusan yang berprestasi dan melanjutkan ke jenjang sekolah menengah pertama unggulan di wilayah Gianyar dan sekitarnya.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Section 3: Visi dan Misi & Tujuan Pendidikan */}
            <section className="py-16 bg-white border-b border-slate-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Visi dan Misi */}
                        <Reveal direction="up">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-3xl p-8 border border-blue-100 h-full flex flex-col justify-between hover-lift">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                                            <Compass className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">
                                            Visi dan Misi
                                        </h2>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-4 border-l-2 border-blue-400 pl-3">
                                        "{settings.vision || 'Terwujudnya peserta didik yang beriman dan bertakwa, cerdas bernalar kritis, unggul dalam prestasi, serta berwawasan lingkungan dan budaya lokal.'}"
                                    </p>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Misi SDN 4 Sebatu menitikberatkan pada proses belajar bermakna, pengembangan minat bakat, dan pembudayaan budi pekerti luhur.
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-blue-200/60">
                                    <Link
                                        href="/visi-misi"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900"
                                    >
                                        <span>Lihat Visi Misi Lengkap</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </Reveal>

                        {/* Tujuan Pendidikan */}
                        <Reveal direction="up" delay={100}>
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-3xl p-8 border border-emerald-100 h-full flex flex-col justify-between hover-lift">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">
                                            Tujuan Pendidikan
                                        </h2>
                                    </div>
                                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <span>Membekali dasar literasi, numerasi, dan nalar kritis yang kuat bagi setiap siswa.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <span>Menumbuhkan nilai kejujuran, disiplin, toleransi, dan kesopanan dalam kehidupan sehari-hari.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <span>Mengembangkan potensi akademik dan non-akademik siswa melalui pembinaan ekstrakurikuler.</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-6 pt-4 border-t border-emerald-200/60">
                                    <Link
                                        href="/prestasi"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900"
                                    >
                                        <span>Lihat Prestasi Siswa</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Section 4: Sambutan Kepala Sekolah */}
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
                                                alt={`Foto Kepala Sekolah SDN 4 Sebatu ${settings.principal_name}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-blue-600 bg-blue-50">
                                                <User className="w-14 h-14" />
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="font-bold text-slate-900 text-sm mt-3">
                                        {settings.principal_name || 'Kepala Sekolah'}
                                    </h4>
                                    <p className="text-xs text-blue-600 font-medium">{settings.principal_title || 'Kepala Sekolah SDN 4 Sebatu'}</p>
                                </div>

                                <div className="flex-1 space-y-3">
                                    <h3 className="text-xl font-bold text-slate-900">
                                        Pesan dari Kepala Sekolah
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                                        "{settings.principal_speech || 'Selamat datang di website resmi SD Negeri 4 Sebatu.'}"
                                    </p>
                                    <div className="pt-3">
                                        <Link
                                            href="/guru"
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
                                        >
                                            <span>Lihat Guru & Tenaga Kependidikan SDN 4 Sebatu</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </PublicLayout>
    );
}
