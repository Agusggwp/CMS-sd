import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    GraduationCap,
    MapPin,
    Phone,
    Mail,
    Globe,
    ArrowUpRight,
    Heart,
} from 'lucide-react';

function FacebookIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );
}

function InstagramIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    );
}

function YoutubeIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    );
}

export default function Footer() {
    const { school_settings = {} } = usePage().props;

    const schoolName = school_settings.school_name || 'SD Negeri Percontohan';
    const address = school_settings.school_address || 'Jl. Pendidikan No. 45, Kebon Jeruk, Jakarta Barat';
    const phone = school_settings.school_phone || '(021) 567-8901';
    const email = school_settings.school_email || 'info@sdpercontohan.sch.id';
    const npsn = school_settings.school_npsn || '50102030';
    const accreditation = school_settings.school_accreditation || 'A (Unggul)';

    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-10 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
                    {/* Column 1: School Identity */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                                {school_settings.school_logo ? (
                                    <img
                                        src={school_settings.school_logo}
                                        alt={schoolName}
                                        className="w-9 h-9 object-contain"
                                    />
                                ) : (
                                    <GraduationCap className="w-6 h-6 text-white" />
                                )}
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-white leading-tight">
                                    {schoolName}
                                </h4>
                                <p className="text-xs text-slate-400">NPSN: {npsn}</p>
                            </div>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">
                            {school_settings.school_description ||
                                'Membimbing generasi penerus bangsa yang cerdas berfikir, luhur dalam pekerti, dan unggul dalam prestasi dengan lingkungan belajar ramah anak.'}
                        </p>

                        <div className="pt-2 flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                Akreditasi {accreditation}
                            </span>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Tautan Penting
                        </h4>
                        <ul className="space-y-2.5 text-xs">
                            <li>
                                <Link href="/tentang" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                                    Profil & Sejarah <ArrowUpRight className="w-3 h-3 text-slate-500" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/visi-misi" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                                    Visi, Misi & Tujuan <ArrowUpRight className="w-3 h-3 text-slate-500" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/guru" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                                    Tenaga Pendidik <ArrowUpRight className="w-3 h-3 text-slate-500" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/berita" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                                    Kabar & Berita Terbaru <ArrowUpRight className="w-3 h-3 text-slate-500" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/ppdb" className="hover:text-emerald-400 text-emerald-300 font-medium transition-colors flex items-center gap-1">
                                    Pendaftaran Siswa Baru (PPDB) <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/dokumen" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                                    Unduh Dokumen & Panduan <ArrowUpRight className="w-3 h-3 text-slate-500" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Kontak & Lokasi
                        </h4>
                        <ul className="space-y-3 text-xs text-slate-400">
                            <li className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                <span>{address}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>{phone}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                                <span>{email}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                                <span>Senin - Jumat: 07.00 - 15.00 WIB</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Social Media & Portal */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Media Sosial
                        </h4>
                        <p className="text-xs text-slate-400 mb-4">
                            Ikuti kanal komunikasi resmi kami untuk update kegiatan sekolah sehari-hari.
                        </p>
                        <div className="flex items-center space-x-3 mb-6">
                            {school_settings.social_facebook && (
                                <a
                                    href={school_settings.social_facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                                >
                                    <FacebookIcon className="w-4 h-4" />
                                </a>
                            )}
                            {school_settings.social_instagram && (
                                <a
                                    href={school_settings.social_instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                                >
                                    <InstagramIcon className="w-4 h-4" />
                                </a>
                            )}
                            {school_settings.social_youtube && (
                                <a
                                    href={school_settings.social_youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                                >
                                    <YoutubeIcon className="w-4 h-4" />
                                </a>
                            )}
                        </div>

                        <div className="pt-2">
                            <Link
                                href="/admin/login"
                                className="inline-flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            >
                                <span>Login Operator CMS</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
                    <p className="text-center md:text-left">
                        © {new Date().getFullYear()} {schoolName}. Hak Cipta Dilindungi Undang-Undang.
                    </p>

                    {/* Developer Credit */}
                    <div className="flex items-center gap-2 text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-700/60">
                        <span className="text-[11px]">Dikembangkan oleh</span>
                        <a
                            href="https://artdevata.net/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-bold text-slate-200 hover:text-emerald-400 transition-colors"
                        >
                            <img
                                src="/art.jpeg"
                                alt="artdevata logo"
                                className="w-4.5 h-4.5 rounded-full object-cover shadow-xs ring-1 ring-emerald-500/40"
                            />
                            <span className="tracking-wide">artdevata</span>
                        </a>
                    </div>

                    <p className="hidden lg:flex items-center gap-1 text-slate-500 text-[11px]">
                        Pendidikan Berkualitas untuk Indonesia Maju
                    </p>
                </div>
            </div>
        </footer>
    );
}
