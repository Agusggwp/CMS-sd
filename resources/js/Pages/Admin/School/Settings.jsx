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
} from 'lucide-react';

export default function SchoolSettings({ settings = {} }) {
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

        // Contact
        school_address: settings.school_address || '',
        school_phone: settings.school_phone || '',
        school_email: settings.school_email || '',
        school_whatsapp: settings.school_whatsapp || '',
        school_maps: settings.school_maps || '',

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
                description="Kelola nama sekolah, sambutan kepala sekolah, visi misi, statistik, dan kontak resmi."
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
                            <Input
                                label="NPSN (Nomor Pokok Sekolah Nasional)"
                                name="school_npsn"
                                value={data.school_npsn}
                                onChange={(e) => setData('school_npsn', e.target.value)}
                                error={errors.school_npsn}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Peringkat Akreditasi"
                                name="school_accreditation"
                                value={data.school_accreditation}
                                onChange={(e) => setData('school_accreditation', e.target.value)}
                                error={errors.school_accreditation}
                                placeholder="A (Unggul)"
                            />
                            <Input
                                label="Slogan / Moto Sekolah"
                                name="school_slogan"
                                value={data.school_slogan}
                                onChange={(e) => setData('school_slogan', e.target.value)}
                                error={errors.school_slogan}
                            />
                        </div>

                        <Textarea
                            label="Deskripsi Profil Singkat"
                            name="school_description"
                            rows={3}
                            value={data.school_description}
                            onChange={(e) => setData('school_description', e.target.value)}
                            error={errors.school_description}
                        />

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Ganti Logo Sekolah
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('school_logo', e.target.files[0])}
                                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {settings.school_logo && (
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-xs text-slate-400">Logo Saat Ini:</span>
                                    <img src={settings.school_logo} alt="Logo" className="w-8 h-8 object-contain" />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* 2. KEPALA SEKOLAH */}
                {activeTab === 'principal' && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                            Profil & Sambutan Kepala Sekolah
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Nama Lengkap & Gelar"
                                name="principal_name"
                                value={data.principal_name}
                                onChange={(e) => setData('principal_name', e.target.value)}
                                error={errors.principal_name}
                            />
                            <Input
                                label="NIP Kepala Sekolah"
                                name="principal_nip"
                                value={data.principal_nip}
                                onChange={(e) => setData('principal_nip', e.target.value)}
                                error={errors.principal_nip}
                            />
                        </div>

                        <Input
                            label="Jabatan Formal"
                            name="principal_title"
                            value={data.principal_title}
                            onChange={(e) => setData('principal_title', e.target.value)}
                            error={errors.principal_title}
                        />

                        <Textarea
                            label="Teks Sambutan Kepala Sekolah"
                            name="principal_speech"
                            rows={6}
                            value={data.principal_speech}
                            onChange={(e) => setData('principal_speech', e.target.value)}
                            error={errors.principal_speech}
                        />

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Foto Kepala Sekolah
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('principal_photo', e.target.files[0])}
                                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {settings.principal_photo && (
                                <div className="mt-2 flex items-center gap-3">
                                    <span className="text-xs text-slate-400">Foto Saat Ini:</span>
                                    <img
                                        src={settings.principal_photo}
                                        alt="Foto Kepala Sekolah"
                                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* 3. KONTAK & LOKASI */}
                {activeTab === 'contact' && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                            Saluran Komunikasi Resmi
                        </h3>
                        <Textarea
                            label="Alamat Lengkap"
                            name="school_address"
                            rows={2}
                            value={data.school_address}
                            onChange={(e) => setData('school_address', e.target.value)}
                            error={errors.school_address}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Input
                                label="Nomor Telepon Kantor"
                                name="school_phone"
                                value={data.school_phone}
                                onChange={(e) => setData('school_phone', e.target.value)}
                                error={errors.school_phone}
                            />
                            <Input
                                label="Nomor WhatsApp Hotline"
                                name="school_whatsapp"
                                value={data.school_whatsapp}
                                onChange={(e) => setData('school_whatsapp', e.target.value)}
                                error={errors.school_whatsapp}
                            />
                            <Input
                                label="Email Sekolah"
                                name="school_email"
                                type="email"
                                value={data.school_email}
                                onChange={(e) => setData('school_email', e.target.value)}
                                error={errors.school_email}
                            />
                        </div>

                        <Textarea
                            label="Embed URL Google Maps (iframe src)"
                            name="school_maps"
                            rows={3}
                            value={data.school_maps}
                            onChange={(e) => setData('school_maps', e.target.value)}
                            error={errors.school_maps}
                            helperText="Salin tautan 'src' dari fitur Embed Map di Google Maps."
                        />
                    </div>
                )}

                {/* 4. MEDIA SOSIAL */}
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

                {/* 5. VISI & MISI */}
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

                {/* 6. STATISTIK */}
                {activeTab === 'stats' && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                            Data Angka Statistik Beranda
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <Input
                                label="Jumlah Siswa"
                                name="stat_students"
                                value={data.stat_students}
                                onChange={(e) => setData('stat_students', e.target.value)}
                                placeholder="500+"
                            />
                            <Input
                                label="Jumlah Guru"
                                name="stat_teachers"
                                value={data.stat_teachers}
                                onChange={(e) => setData('stat_teachers', e.target.value)}
                                placeholder="35"
                            />
                            <Input
                                label="Tahun Berdiri"
                                name="stat_years"
                                value={data.stat_years}
                                onChange={(e) => setData('stat_years', e.target.value)}
                                placeholder="20+"
                            />
                            <Input
                                label="Jumlah Prestasi"
                                name="stat_achievements"
                                value={data.stat_achievements}
                                onChange={(e) => setData('stat_achievements', e.target.value)}
                                placeholder="48"
                            />
                        </div>
                    </div>
                )}

                {/* 7. SEO & METADATA */}
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
                        <span className="text-xs font-semibold text-emerald-600">
                            Pengaturan berhasil disimpan!
                        </span>
                    )}
                </div>
            </form>
        </AdminLayout>
    );
}
