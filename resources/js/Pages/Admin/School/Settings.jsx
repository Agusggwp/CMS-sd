import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Button from '@/Components/UI/Button';
import Tabs from '@/Components/UI/Tabs';
import {
    Settings,
    School,
    User,
    Phone,
    Share2,
    Compass,
    BarChart3,
    Search,
    Save,
    Clock,
    BookOpen,
    Image as ImageIcon,
} from 'lucide-react';

export default function SchoolSettings({ settings = {}, realStats = {} }) {
    const [activeTab, setActiveTab] = useState('identity');

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        school_name: settings.school_name || '',
        school_npsn: settings.school_npsn || '',
        school_accreditation: settings.school_accreditation || '',
        school_slogan: settings.school_slogan || '',
        school_description: settings.school_description || '',
        school_logo: null,
        
        // Principal
        principal_name: settings.principal_name || '',
        principal_nip: settings.principal_nip || '',
        principal_title: settings.principal_title || '',
        principal_speech: settings.principal_speech || '',
        principal_photo: null,

        // Sejarah & Profil Sekolah (Tentang Kami)
        history_badge: settings.history_badge || '',
        history_title: settings.history_title || '',
        history_paragraph_1: settings.history_paragraph_1 || '',
        history_paragraph_2: settings.history_paragraph_2 || '',
        history_photo: null,

        // Contact
        school_address: settings.school_address || '',
        school_phone: settings.school_phone || '',
        school_email: settings.school_email || '',
        school_whatsapp: settings.school_whatsapp || '',
        school_maps: settings.school_maps || '',

        // Operational Hours
        school_hours_weekday: settings.school_hours_weekday ?? '07.00 - 15.00 WIB',
        school_hours_saturday: settings.school_hours_saturday ?? '07.00 - 12.00 WIB',
        school_hours_sunday: settings.school_hours_sunday ?? 'Tutup',

        // Social
        social_facebook: settings.social_facebook || '',
        social_instagram: settings.social_instagram || '',
        social_youtube: settings.social_youtube || '',

        // Visi & Misi
        vision: settings.vision || '',
        mission: settings.mission || '',

        // Stats
        stat_students: settings.stat_students || '',
        stat_teachers: settings.stat_teachers || '',
        stat_years: settings.stat_years || '',
        stat_achievements: settings.stat_achievements || '',

        // SEO
        meta_title: settings.meta_title || '',
        meta_description: settings.meta_description || '',
        meta_keywords: settings.meta_keywords || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/settings');
    };

    const tabs = [
        { id: 'identity', label: 'Identitas Sekolah', icon: School },
        { id: 'history', label: 'Sejarah & Narasi', icon: BookOpen },
        { id: 'principal', label: 'Kepala Sekolah', icon: User },
        { id: 'contact', label: 'Kontak & Lokasi', icon: Phone },
        { id: 'social', label: 'Media Sosial', icon: Share2 },
        { id: 'vision', label: 'Visi & Misi', icon: Compass },
        { id: 'stats', label: 'Statistik Sekolah', icon: BarChart3 },
        { id: 'seo', label: 'SEO & Metadata', icon: Search },
    ];

    return (
        <AdminLayout title="Identitas & Pengaturan Sekolah">
            <PageHeader
                title="Identitas & Pengaturan Sekolah"
                description="Kelola nama sekolah, sejarah & narasi, sambutan kepala sekolah, visi misi, statistik, dan kontak resmi."
            />

            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-6">
                {/* 1. IDENTITAS SEKOLAH */}
                {activeTab === 'identity' && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                            Informasi Satuan Pendidikan
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-2">
                                <Input
                                    label="Nama Sekolah"
                                    name="school_name"
                                    value={data.school_name}
                                    onChange={(e) => setData('school_name', e.target.value)}
                                    error={errors.school_name}
                                    required
                                />
                            </div>
                            <div>
                                <Input
                                    label="NPSN (Nomor Pokok Sekolah)"
                                    name="school_npsn"
                                    value={data.school_npsn}
                                    onChange={(e) => setData('school_npsn', e.target.value)}
                                    error={errors.school_npsn}
                                    placeholder="50101995"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Input
                                    label="Akreditasi Sekolah"
                                    name="school_accreditation"
                                    value={data.school_accreditation}
                                    onChange={(e) => setData('school_accreditation', e.target.value)}
                                    error={errors.school_accreditation}
                                    placeholder="A (Unggul) / B oleh BAN-SM"
                                />
                            </div>
                            <div>
                                <Input
                                    label="Slogan / Motto Sekolah"
                                    name="school_slogan"
                                    value={data.school_slogan}
                                    onChange={(e) => setData('school_slogan', e.target.value)}
                                    error={errors.school_slogan}
                                    placeholder="Cerdas, Berkarakter, Berakhlak Mulia"
                                />
                            </div>
                        </div>

                        <Textarea
                            label="Deskripsi Singkat Satuan Pendidikan"
                            name="school_description"
                            rows={3}
                            value={data.school_description}
                            onChange={(e) => setData('school_description', e.target.value)}
                            error={errors.school_description}
                            placeholder="Deskripsi singkat mengenai profil sekolah yang akan ditampilkan di footer dan ringkasan..."
                        />

                        {/* File Uploads (Logo & Favicon) */}
                        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-2">
                                    Logo Sekolah
                                </label>
                                {settings.school_logo && (
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="w-16 h-16 rounded-xl border border-slate-200 p-1 bg-slate-50 flex items-center justify-center">
                                            <img
                                                src={settings.school_logo}
                                                alt="Logo Sekolah"
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        </div>
                                        <span className="text-xs text-slate-500">Logo saat ini terpasang</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('school_logo', e.target.files[0])}
                                    className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                <span className="text-[11px] text-slate-400 mt-1 block">Format: PNG, JPG, WebP, SVG (Maks. 2MB)</span>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-2">
                                    Favicon Browser
                                </label>
                                {settings.favicon && (
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg border border-slate-200 p-1 bg-slate-50 flex items-center justify-center">
                                            <img
                                                src={settings.favicon}
                                                alt="Favicon"
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        </div>
                                        <span className="text-xs text-slate-500">Favicon saat ini</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('favicon', e.target.files[0])}
                                    className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                <span className="text-[11px] text-slate-400 mt-1 block">Format: ICO, PNG, SVG (Maks. 1MB)</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. SEJARAH & NARASI PROFIL */}
                {activeTab === 'history' && (
                    <div className="space-y-5">
                        <div className="border-b border-slate-100 pb-3">
                            <h3 className="text-sm font-bold text-slate-900">
                                Pengaturan Sejarah & Narasi (Halaman Tentang Kami)
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Atur judul, narasi sejarah perkembangan, dan foto kegiatan pembelajaran sekolah.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <Input
                                    label="Badge / Sub-Judul"
                                    name="history_badge"
                                    value={data.history_badge}
                                    onChange={(e) => setData('history_badge', e.target.value)}
                                    placeholder="Sejarah & Perkembangan"
                                    helperText="Label kecil di atas judul utama"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <Input
                                    label="Judul Utama Narasi"
                                    name="history_title"
                                    value={data.history_title}
                                    onChange={(e) => setData('history_title', e.target.value)}
                                    placeholder="Lebih dari Dua Dekade Mengabdi untuk Masa Depan Pendidikan Indonesia"
                                />
                            </div>
                        </div>

                        <Textarea
                            label="Narasi Paragraf 1 (Sejarah & Latar Belakang)"
                            name="history_paragraph_1"
                            rows={4}
                            value={data.history_paragraph_1}
                            onChange={(e) => setData('history_paragraph_1', e.target.value)}
                            placeholder="Didirikan sejak tahun 2001, SD NEGERI 4 SEBATU lahir dari tekad kuat untuk menyediakan wadah pembelajaran sekolah dasar negeri yang inklusif, berkualitas tinggi, serta mampu memadukan kecerdasan intelektual, emosional, dan spiritual anak."
                            helperText="Paragraf pertama menceritakan sejarah pendirian & komitmen sekolah"
                        />

                        <Textarea
                            label="Narasi Paragraf 2 (Kurikulum & Pembelajaran)"
                            name="history_paragraph_2"
                            rows={4}
                            value={data.history_paragraph_2}
                            onChange={(e) => setData('history_paragraph_2', e.target.value)}
                            placeholder="Melalui implementasi Kurikulum Merdeka dan Program Sekolah Penggerak, kami menciptakan ekosistem belajar yang menyenangkan, menstimulasi nalar kritis, dan menjunjung tinggi nilai-nilai Profil Pelajar Pancasila."
                            helperText="Paragraf kedua menceritakan kurikulum, program penggerak, & ekosistem belajar"
                        />

                        <div className="pt-4 border-t border-slate-100">
                            <label className="block text-xs font-semibold text-slate-700 mb-2">
                                Foto Kegiatan / Sejarah Sekolah
                            </label>
                            {settings.history_photo && (
                                <div className="mb-3 flex items-center gap-4">
                                    <div className="w-32 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs">
                                        <img
                                            src={settings.history_photo}
                                            alt="Foto Sejarah / Kegiatan Sekolah"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-xs text-slate-500 space-y-0.5">
                                        <span className="font-semibold text-slate-700 block">Foto Saat Ini Terpasang</span>
                                        <span className="text-[11px] text-slate-400">Pilih file baru di bawah jika ingin mengganti foto.</span>
                                    </div>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('history_photo', e.target.files[0])}
                                className="block w-full text-xs text-slate-500 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                            />
                            <span className="text-[11px] text-slate-400 mt-1 block">Format: JPG, PNG, WebP (Rekomendasi rasio 16:9 atau 4:3, Maks. 4MB)</span>
                        </div>
                    </div>
                )}

                {/* 3. KEPALA SEKOLAH */}
                {activeTab === 'principal' && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                            Profil & Sambutan Kepala Sekolah
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Input
                                    label="Nama Lengkap & Gelar"
                                    name="principal_name"
                                    value={data.principal_name}
                                    onChange={(e) => setData('principal_name', e.target.value)}
                                    error={errors.principal_name}
                                    placeholder="Dra. Hj. Sri Wahyuni, M.Pd."
                                />
                            </div>
                            <div>
                                <Input
                                    label="NIP Kepala Sekolah"
                                    name="principal_nip"
                                    value={data.principal_nip}
                                    onChange={(e) => setData('principal_nip', e.target.value)}
                                    error={errors.principal_nip}
                                    placeholder="19750812 200003 2 001"
                                />
                            </div>
                        </div>

                        <div>
                            <Input
                                label="Jabatan Resmi"
                                name="principal_title"
                                value={data.principal_title}
                                onChange={(e) => setData('principal_title', e.target.value)}
                                error={errors.principal_title}
                                placeholder="Kepala Sekolah SD Negeri 4 Sebatu"
                            />
                        </div>

                        <Textarea
                            label="Teks Sambutan Kepala Sekolah (Muncul di Beranda)"
                            name="principal_speech"
                            rows={5}
                            value={data.principal_speech}
                            onChange={(e) => setData('principal_speech', e.target.value)}
                            error={errors.principal_speech}
                            placeholder="Tuliskan kata sambutan hangat kepala sekolah kepada wali murid dan masyarakat..."
                        />

                        {/* Foto Kepala Sekolah */}
                        <div className="pt-2">
                            <label className="block text-xs font-semibold text-slate-700 mb-2">
                                Foto Resmi Kepala Sekolah
                            </label>
                            {settings.principal_photo && (
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                                        <img
                                            src={settings.principal_photo}
                                            alt={settings.principal_name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-xs text-slate-500">Foto profil terpasang</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('principal_photo', e.target.files[0])}
                                className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <span className="text-[11px] text-slate-400 mt-1 block">Format: JPG, PNG, WebP (Rasio 1:1 persegi direkomendasikan, Maks. 2MB)</span>
                        </div>
                    </div>
                )}

                {/* 4. KONTAK & LOKASI */}
                {activeTab === 'contact' && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                            Informasi Kontak & Alamat Sekolah
                        </h3>
                        <Textarea
                            label="Alamat Lengkap Sekolah"
                            name="school_address"
                            rows={2}
                            value={data.school_address}
                            onChange={(e) => setData('school_address', e.target.value)}
                            error={errors.school_address}
                            placeholder="Banjar Sebatu, Desa Sebatu, Kec. Tegallalang, Kab. Gianyar, Bali"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <Input
                                    label="Nomor Telepon Kantor"
                                    name="school_phone"
                                    value={data.school_phone}
                                    onChange={(e) => setData('school_phone', e.target.value)}
                                    error={errors.school_phone}
                                    placeholder="(0361) 123456"
                                />
                            </div>
                            <div>
                                <Input
                                    label="Email Resmi Sekolah"
                                    name="school_email"
                                    type="email"
                                    value={data.school_email}
                                    onChange={(e) => setData('school_email', e.target.value)}
                                    error={errors.school_email}
                                    placeholder="info@sdn4sebatu.sch.id"
                                />
                            </div>
                            <div>
                                <Input
                                    label="Nomor WhatsApp Admin / Humas"
                                    name="school_whatsapp"
                                    value={data.school_whatsapp}
                                    onChange={(e) => setData('school_whatsapp', e.target.value)}
                                    error={errors.school_whatsapp}
                                    placeholder="081234567890"
                                />
                            </div>
                        </div>

                        <div>
                            <Input
                                label="Link Google Maps / Titik Lokasi"
                                name="school_maps"
                                value={data.school_maps}
                                onChange={(e) => setData('school_maps', e.target.value)}
                                error={errors.school_maps}
                                placeholder="https://maps.google.com/..."
                            />
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span>Jam Layanan / Operasional Sekolah</span>
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <Input
                                    label="Senin - Jumat"
                                    name="school_hours_weekday"
                                    value={data.school_hours_weekday}
                                    onChange={(e) => setData('school_hours_weekday', e.target.value)}
                                    placeholder="07.00 - 15.00 WITA"
                                />
                                <Input
                                    label="Sabtu"
                                    name="school_hours_saturday"
                                    value={data.school_hours_saturday}
                                    onChange={(e) => setData('school_hours_saturday', e.target.value)}
                                    placeholder="07.00 - 12.00 WITA"
                                />
                                <Input
                                    label="Minggu & Hari Libur"
                                    name="school_hours_sunday"
                                    value={data.school_hours_sunday}
                                    onChange={(e) => setData('school_hours_sunday', e.target.value)}
                                    placeholder="Tutup / Libur"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* 5. MEDIA SOSIAL */}
                {activeTab === 'social' && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                            Tautan Jejaring Sosial
                        </h3>
                        <Input
                            label="URL Facebook"
                            name="social_facebook"
                            value={data.social_facebook}
                            onChange={(e) => setData('social_facebook', e.target.value)}
                            error={errors.social_facebook}
                            placeholder="https://facebook.com/..."
                        />
                        <Input
                            label="URL Instagram"
                            name="social_instagram"
                            value={data.social_instagram}
                            onChange={(e) => setData('social_instagram', e.target.value)}
                            error={errors.social_instagram}
                            placeholder="https://instagram.com/..."
                        />
                        <Input
                            label="URL YouTube"
                            name="social_youtube"
                            value={data.social_youtube}
                            onChange={(e) => setData('social_youtube', e.target.value)}
                            error={errors.social_youtube}
                            placeholder="https://youtube.com/@..."
                        />
                    </div>
                )}

                {/* 6. VISI & MISI */}
                {activeTab === 'vision' && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                            Visi & Misi Lembaga
                        </h3>
                        <Textarea
                            label="Visi Sekolah"
                            name="vision"
                            rows={3}
                            value={data.vision}
                            onChange={(e) => setData('vision', e.target.value)}
                            error={errors.vision}
                        />
                        <Textarea
                            label="Misi Sekolah (Pisahkan per baris)"
                            name="mission"
                            rows={6}
                            value={data.mission}
                            onChange={(e) => setData('mission', e.target.value)}
                            error={errors.mission}
                        />
                    </div>
                )}

                {/* 7. STATISTIK */}
                {activeTab === 'stats' && (
                    <div className="space-y-4">
                        <div className="border-b border-slate-100 pb-3">
                            <h3 className="text-sm font-bold text-slate-900">
                                Data Angka Statistik Beranda
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">
                                Jika field dikosongkan, sistem secara otomatis akan mengambil jumlah data riil dari database (seperti jumlah guru aktif, jumlah prestasi, dan pendaftar PPDB).
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <Input
                                    label="Jumlah Siswa"
                                    name="stat_students"
                                    value={data.stat_students}
                                    onChange={(e) => setData('stat_students', e.target.value)}
                                    placeholder={realStats?.students_count ? `${realStats.students_count}+` : "500+"}
                                />
                                <span className="text-[11px] text-slate-500 mt-1 block">
                                    Riil sistem: <strong>{realStats?.students_count || 0} Siswa diterima</strong>
                                </span>
                            </div>
                            <div>
                                <Input
                                    label="Jumlah Guru"
                                    name="stat_teachers"
                                    value={data.stat_teachers}
                                    onChange={(e) => setData('stat_teachers', e.target.value)}
                                    placeholder={realStats?.teachers_count ? `${realStats.teachers_count}` : "35"}
                                />
                                <span className="text-[11px] text-slate-500 mt-1 block">
                                    Riil sistem: <strong>{realStats?.teachers_count || 0} Guru aktif</strong>
                                </span>
                            </div>
                            <div>
                                <Input
                                    label="Tahun Berdiri / Dedikasi"
                                    name="stat_years"
                                    value={data.stat_years}
                                    onChange={(e) => setData('stat_years', e.target.value)}
                                    placeholder="20+"
                                />
                                <span className="text-[11px] text-slate-500 mt-1 block">
                                    Dedikasi sekolah (misal: 20+ atau 25 Tahun)
                                </span>
                            </div>
                            <div>
                                <Input
                                    label="Jumlah Prestasi"
                                    name="stat_achievements"
                                    value={data.stat_achievements}
                                    onChange={(e) => setData('stat_achievements', e.target.value)}
                                    placeholder={realStats?.achievements_count ? `${realStats.achievements_count}` : "48"}
                                />
                                <span className="text-[11px] text-slate-500 mt-1 block">
                                    Riil sistem: <strong>{realStats?.achievements_count || 0} Prestasi tercatat</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* 8. SEO & METADATA */}
                {activeTab === 'seo' && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                            Optimasi Mesin Pencari (SEO)
                        </h3>
                        <Input
                            label="Default Meta Title"
                            name="meta_title"
                            value={data.meta_title}
                            onChange={(e) => setData('meta_title', e.target.value)}
                        />
                        <Textarea
                            label="Default Meta Description"
                            name="meta_description"
                            rows={3}
                            value={data.meta_description}
                            onChange={(e) => setData('meta_description', e.target.value)}
                        />
                        <Input
                            label="Keywords (Kata Kunci)"
                            name="meta_keywords"
                            value={data.meta_keywords}
                            onChange={(e) => setData('meta_keywords', e.target.value)}
                            placeholder="Sekolah Dasar, SD Negeri, PPDB..."
                        />
                    </div>
                )}

                {/* Submit button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        processing={processing}
                    >
                        <Save className="w-4 h-4" />
                        <span>Simpan Perubahan Pengaturan</span>
                    </Button>

                    {recentlySuccessful && (
                        <span className="text-xs font-semibold text-emerald-600 animate-in fade-in">
                            ✓ Pengaturan berhasil disimpan!
                        </span>
                    )}
                </div>
            </form>
        </AdminLayout>
    );
}
