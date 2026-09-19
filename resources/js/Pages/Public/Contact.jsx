import React from 'react';
import { useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/Public/PageHeader';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Button from '@/Components/UI/Button';
import Reveal from '@/Components/UI/Reveal';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';

export default function Contact({ settings = {} }) {
    const schoolName = settings.school_name || 'SD Negeri Percontohan';

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/kontak', {
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout
            title="Hubungi Kami"
            description={`Kontak resmi, alamat lokasi, dan layanan informasi publik ${schoolName}.`}
        >
            <PageHeader
                badge="Layanan Informasi"
                title="Hubungi Kami"
                description="Kami selalu terbuka untuk berdialog dengan orang tua murid, masyarakat, dan mitra pendidikan."
            />

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Information Left Column (5 cols) */}
                        <div className="lg:col-span-5 space-y-6">
                            <Reveal direction="up">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                        Informasi Kontak
                                    </span>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                                        Mari Terhubung dengan Sekolah
                                    </h2>
                                    <p className="mt-2 text-xs sm:text-sm text-slate-600">
                                        Silakan hubungi kami melalui saluran berikut atau isi formulir pesan di samping.
                                    </p>
                                </div>
                            </Reveal>

                            <div className="space-y-4">
                                <Reveal direction="up" delay={50}>
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3.5 hover-lift">
                                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                                                Alamat Sekolah
                                            </h4>
                                            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                                                {settings.school_address || 'Jl. Pendidikan No. 45, Kebon Jeruk, Jakarta Barat, DKI Jakarta 11530'}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>

                                <Reveal direction="up" delay={100}>
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3.5 hover-lift">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                                                Telepon & WhatsApp
                                            </h4>
                                            <p className="mt-1 text-xs text-slate-600">
                                                Telp: {settings.school_phone || '(021) 567-8901'}
                                            </p>
                                            {settings.school_whatsapp && (
                                                <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                                                    WhatsApp: {settings.school_whatsapp}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Reveal>

                                <Reveal direction="up" delay={150}>
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3.5 hover-lift">
                                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                                                Email Resmi
                                            </h4>
                                            <p className="mt-1 text-xs text-slate-600">
                                                {settings.school_email || 'info@sdpercontohan.sch.id'}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>

                                <Reveal direction="up" delay={200}>
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3.5 hover-lift">
                                        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                                                Jam Layanan Kantor
                                            </h4>
                                            <p className="mt-1 text-xs text-slate-600">
                                                Senin - Jumat: 07.30 - 15.00 WIB
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Sabtu, Minggu & Hari Libur Nasional: Tutup
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        </div>

                        {/* Form Right Column (7 cols) */}
                        <div className="lg:col-span-7">
                            <Reveal direction="left" delay={150}>
                                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover-lift">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                                        Kirim Pesan atau Pertanyaan
                                    </h3>
                                    <p className="text-xs text-slate-500 mb-6">
                                        Mohon lengkapi formulir di bawah ini dengan jelas. Tim kami akan merespons secepatnya.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Input
                                                label="Nama Lengkap"
                                                name="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                error={errors.name}
                                                required
                                                placeholder="Nama Anda"
                                            />
                                            <Input
                                                label="Alamat Email"
                                                name="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                error={errors.email}
                                                required
                                                placeholder="nama@email.com"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Input
                                                label="Nomor Telepon / WA"
                                                name="phone"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                error={errors.phone}
                                                placeholder="08123456789"
                                            />
                                            <Input
                                                label="Subjek Pesan"
                                                name="subject"
                                                value={data.subject}
                                                onChange={(e) => setData('subject', e.target.value)}
                                                error={errors.subject}
                                                required
                                                placeholder="Contoh: Info Pendaftaran PPDB"
                                            />
                                        </div>

                                        <Textarea
                                            label="Isi Pesan"
                                            name="message"
                                            rows={5}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            error={errors.message}
                                            required
                                            placeholder="Tuliskan pertanyaan atau pesan Anda secara detail..."
                                        />

                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            processing={processing}
                                            className="w-full sm:w-auto"
                                        >
                                            <Send className="w-4 h-4" />
                                            <span>Kirim Pesan Sekarang</span>
                                        </Button>

                                        {recentlySuccessful && (
                                            <p className="text-xs text-emerald-600 font-semibold mt-2 animate-fade-in">
                                                Pesan berhasil terkirim!
                                            </p>
                                        )}
                                    </form>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* Google Maps embed */}
                    {settings.school_maps && (
                        <Reveal direction="up" delay={200}>
                            <div className="mt-16 rounded-3xl overflow-hidden border border-slate-200 shadow-xs h-96 bg-slate-100 hover-lift">
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
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
