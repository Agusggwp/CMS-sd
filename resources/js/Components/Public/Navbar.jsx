import React, { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Menu as MenuIcon,
    X,
    Phone,
    Mail,
    Search,
    ChevronDown,
} from 'lucide-react';

/* --- Accurate Social Media Icons with Brand Colors --- */
function WhatsAppIcon({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="#25D366">
            <path d="M12.031 0C5.396 0 0 5.395 0 12.031c0 2.115.552 4.183 1.602 6.004L.069 24l6.148-1.503a11.968 11.968 0 0 0 5.814 1.503h.005c6.634 0 12.03-5.395 12.03-12.032C24.066 5.395 18.67 0 12.031 0zm-.005 22.012h-.004a9.97 9.97 0 0 1-5.088-1.39l-.365-.217-3.78.926.94-3.684-.238-.378a9.98 9.98 0 0 1-1.53-5.238c0-5.513 4.484-9.998 10.002-9.998 5.514 0 9.997 4.485 9.997 9.998 0 5.514-4.483 10.012-9.997 10.012zm5.474-7.483c-.3-.15-1.776-.876-2.05-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.49-.893-.797-1.496-1.78-1.671-2.08-.175-.3-.019-.462.131-.612.136-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.243-.584-.49-.505-.675-.515l-.575-.01c-.2 0-.525.075-.8.375s-1.05 1.026-1.05 2.501c0 1.476 1.075 2.902 1.225 3.102.15.2 2.115 3.23 5.124 4.53 3.01 1.3 3.01.867 3.56.812.55-.055 1.775-.726 2.025-1.427.25-.7.25-1.3.175-1.426-.075-.125-.275-.2-.575-.35z" />
        </svg>
    );
}

function FacebookIcon({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );
}

function TwitterIcon({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="#1DA1F2">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
        </svg>
    );
}

function InstagramIcon({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24">
            <defs>
                <radialGradient id="ig-grad" r="150%" cx="30%" cy="107%">
                    <stop stopColor="#fdf497" offset="0%" />
                    <stop stopColor="#fdf497" offset="5%" />
                    <stop stopColor="#fd5949" offset="45%" />
                    <stop stopColor="#d6249f" offset="60%" />
                    <stop stopColor="#285AEB" offset="90%" />
                </radialGradient>
            </defs>
            <rect x="2" y="2" width="20" height="20" rx="6" ry="6" fill="url(#ig-grad)" />
            <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4z" fill="#ffffff" />
            <circle cx="17.2" cy="6.8" r="1.2" fill="#ffffff" />
        </svg>
    );
}

function YoutubeIcon({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="#FF0000">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    );
}

function TikTokIcon({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="#000000">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.9-4.48V8.82a8.28 8.28 0 0 0 4.87 1.58V6.95a4.85 4.85 0 0 1-1-.26z" />
        </svg>
    );
}

/* --- Authentic Circular School Emblem SVG --- */
function SchoolEmblem({ className = "w-14 h-14" }) {
    return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer Blue Circle */}
            <circle cx="50" cy="50" r="48" fill="#0C4A86" stroke="#062E56" strokeWidth="2.5" />
            {/* Inner Gold Border */}
            <circle cx="50" cy="50" r="43" fill="#0B3E70" stroke="#FFC72C" strokeWidth="1.5" />
            {/* Inner Green Field */}
            <circle cx="50" cy="50" r="36" fill="#1B6A38" stroke="#FFC72C" strokeWidth="1" />
            
            {/* Circular Text Path */}
            <path id="circleTextPathTop" d="M 18,50 A 32,32 0 1,1 82,50" fill="none" />
            <text fill="#FFFFFF" fontSize="6.2" fontWeight="bold" letterSpacing="1.2">
                <textPath href="#circleTextPathTop" startOffset="50%" textAnchor="middle">
                    SEKOLAH DASAR NEGERI
                </textPath>
            </text>
            
            <path id="circleTextPathBottom" d="M 82,50 A 32,32 0 0,1 18,50" fill="none" />
            <text fill="#FFC72C" fontSize="6" fontWeight="bold" letterSpacing="1">
                <textPath href="#circleTextPathBottom" startOffset="50%" textAnchor="middle">
                    LEBAK BULUS 07
                </textPath>
            </text>

            {/* Inner Decorative Shield / Elements */}
            {/* Open Book */}
            <path d="M35 62 C40 60, 47 61, 50 63 C53 61, 60 60, 65 62 L64 54 C59 52, 53 53, 50 55 C47 53, 41 52, 36 54 Z" fill="#FFFFFF" stroke="#0B3E70" strokeWidth="0.8" />
            {/* Torch Body */}
            <polygon points="48.5,62 51.5,62 50.8,50 49.2,50" fill="#E5E7EB" stroke="#4B5563" strokeWidth="0.5" />
            {/* Torch Base */}
            <rect x="47" y="62" width="6" height="2" rx="0.5" fill="#D97706" />
            {/* Flame / Api Obor */}
            <path d="M50 36 C52 41, 55 43, 54 48 C53 51, 47 51, 46 48 C45 44, 48 42, 50 36 Z" fill="#EF4444" />
            <path d="M50 40 C51 43, 53 44, 52 47 C51 49, 49 49, 48 47 C48 44, 49 43, 50 40 Z" fill="#FBBF24" />
            
            {/* Little Stars / Wings */}
            <circle cx="50" cy="27" r="1.5" fill="#FDE047" />
        </svg>
    );
}

export default function Navbar() {
    const { url } = usePage();
    const { school_settings = {} } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);

    // School Settings with defaults matching the reference image
    const rawSchoolName = school_settings.school_name || 'SD Negeri Lebak Bulus 07 Pagi';
    const phone = school_settings.school_phone || '021-7693104';
    const email = school_settings.school_email || 'sdn.lebakbulus.07.pg@gmail.com';
    const logoUrl = school_settings.school_logo || null;

    // Social Links
    const waUrl = school_settings.school_whatsapp ? `https://wa.me/${school_settings.school_whatsapp.replace(/[^0-9]/g, '')}` : 'https://wa.me/6281234567890';
    const fbUrl = school_settings.social_facebook || 'https://facebook.com';
    const twitterUrl = school_settings.social_twitter || 'https://twitter.com';
    const igUrl = school_settings.social_instagram || 'https://instagram.com';
    const youtubeUrl = school_settings.social_youtube || 'https://youtube.com';
    const tiktokUrl = school_settings.social_tiktok || 'https://tiktok.com';

    // Parse brand name into Line 1 (blue) and Line 2 (orange)
    let brandTop = 'SEKOLAH DASAR NEGERI';
    let brandBottom = 'LEBAK BULUS 07 PAGI';

    if (rawSchoolName) {
        const upper = rawSchoolName.toUpperCase();
        if (upper.includes('LEBAK BULUS')) {
            brandTop = 'SEKOLAH DASAR NEGERI';
            brandBottom = 'LEBAK BULUS 07 PAGI';
        } else if (upper.startsWith('SD NEGERI ') || upper.startsWith('SEKOLAH DASAR NEGERI ')) {
            brandTop = 'SEKOLAH DASAR NEGERI';
            brandBottom = upper.replace(/^(SD NEGERI |SEKOLAH DASAR NEGERI )/, '');
        } else if (upper.startsWith('SDN ')) {
            brandTop = 'SEKOLAH DASAR NEGERI';
            brandBottom = upper.replace(/^SDN /, '');
        } else {
            brandTop = 'SEKOLAH DASAR';
            brandBottom = upper;
        }
    }

    // Navigation Structure
    const navItems = [
        { label: 'Beranda', href: '/' },
        {
            label: 'Profil Kami',
            children: [
                { label: 'Tentang Sekolah', href: '/tentang' },
                { label: 'Visi & Misi', href: '/visi-misi' },
                { label: 'Guru & Tenaga Pendidik', href: '/guru' },
                { label: 'Sarana & Prasarana', href: '/fasilitas' },
                { label: 'Prestasi Siswa', href: '/prestasi' },
            ],
        },
        {
            label: 'Unit Kerja',
            children: [
                { label: 'Kurikulum & Pembelajaran', href: '/tentang#kurikulum' },
                { label: 'Kesiswaan & Pembiasaan', href: '/tentang#kesiswaan' },
                { label: 'Tata Usaha & Administrasi', href: '/tentang#tu' },
                { label: 'Sarana & Prasarana', href: '/fasilitas' },
            ],
        },
        { label: 'Agenda', href: '/agenda' },
        { label: 'Ekstrakurikuler', href: '/tentang#ekskul' },
        { label: 'Berita & Info', href: '/berita' },
        { label: 'Perpustakaan Digital', href: '/dokumen' },
        { label: 'Galeri', href: '/galeri' },
        {
            label: 'Lainnya',
            children: [
                { label: 'Pengumuman Resmi', href: '/pengumuman' },
                { label: 'Unduh Dokumen & Brosur', href: '/dokumen' },
                { label: 'Kontak & Lokasi', href: '/kontak' },
                { label: 'Portal Operator / Admin', href: '/admin/login' },
            ],
        },
    ];

    const isActive = (href) => {
        if (!href) return false;
        if (href === '/') return url === '/';
        return url.startsWith(href) && href !== '/';
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
        }
    };

    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-xs transition-all">
            {/* ========================================================= */}
            {/* TIER 1: BRAND + CONTACT & SOCIAL ICONS BAR                */}
            {/* ========================================================= */}
            <div className="bg-white border-b border-slate-100 py-3 sm:py-3.5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    {/* Brand Left (Logo + Vertical line + Dual color Typography) */}
                    <Link href="/" className="flex items-center gap-3.5 group cursor-pointer">
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt={rawSchoolName}
                                className="w-13 h-13 sm:w-15 sm:h-15 object-contain transition-transform group-hover:scale-105"
                            />
                        ) : (
                            <div className="transition-transform group-hover:scale-105 shrink-0">
                                <SchoolEmblem className="w-13 h-13 sm:w-15 sm:h-15 drop-shadow-xs" />
                            </div>
                        )}

                        {/* Thin vertical separator line */}
                        <div className="h-10 sm:h-12 w-[1.5px] bg-slate-300"></div>

                        {/* Dual-color school typography */}
                        <div className="flex flex-col justify-center select-none">
                            <span className="text-[13px] sm:text-[15px] font-bold text-[#02569B] tracking-tight leading-tight uppercase">
                                {brandTop}
                            </span>
                            <span className="text-[19px] sm:text-[23px] md:text-[25px] font-black text-[#ED7324] tracking-tight leading-none uppercase">
                                {brandBottom}
                            </span>
                        </div>
                    </Link>

                    {/* Right Side Info & Socials (Desktop / Tablet) */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8">
                        {/* Phone Item */}
                        <a
                            href={`tel:${phone}`}
                            className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
                        >
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f6c344] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                                <Phone className="w-4 h-4 fill-white text-white" />
                            </div>
                            <div className="text-left">
                                <span className="block text-[11px] text-slate-400 font-medium leading-tight">
                                    Telepon
                                </span>
                                <span className="block text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                                    {phone}
                                </span>
                            </div>
                        </a>

                        {/* Email Item */}
                        <a
                            href={`mailto:${email}`}
                            className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
                        >
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f6c344] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                                <Mail className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-left">
                                <span className="block text-[11px] text-slate-400 font-medium leading-tight">
                                    Alamat Email
                                </span>
                                <span className="block text-xs sm:text-sm font-semibold text-slate-800 leading-tight">
                                    {email}
                                </span>
                            </div>
                        </a>

                        {/* Thin vertical separator */}
                        <div className="h-7 w-[1px] bg-slate-200 hidden lg:block"></div>

                        {/* Full-color Social Media Icons */}
                        <div className="hidden lg:flex items-center gap-2.5">
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noreferrer"
                                title="WhatsApp"
                                className="p-1.5 rounded-full hover:bg-slate-100 hover:scale-115 transition-all"
                            >
                                <WhatsAppIcon className="w-4.5 h-4.5" />
                            </a>
                            <a
                                href={fbUrl}
                                target="_blank"
                                rel="noreferrer"
                                title="Facebook"
                                className="p-1.5 rounded-full hover:bg-slate-100 hover:scale-115 transition-all"
                            >
                                <FacebookIcon className="w-4.5 h-4.5" />
                            </a>
                            <a
                                href={twitterUrl}
                                target="_blank"
                                rel="noreferrer"
                                title="Twitter"
                                className="p-1.5 rounded-full hover:bg-slate-100 hover:scale-115 transition-all"
                            >
                                <TwitterIcon className="w-4.5 h-4.5" />
                            </a>
                            <a
                                href={igUrl}
                                target="_blank"
                                rel="noreferrer"
                                title="Instagram"
                                className="p-1.5 rounded-full hover:bg-slate-100 hover:scale-115 transition-all"
                            >
                                <InstagramIcon className="w-4.5 h-4.5" />
                            </a>
                            <a
                                href={youtubeUrl}
                                target="_blank"
                                rel="noreferrer"
                                title="YouTube"
                                className="p-1.5 rounded-full hover:bg-slate-100 hover:scale-115 transition-all"
                            >
                                <YoutubeIcon className="w-4.5 h-4.5" />
                            </a>
                            <a
                                href={tiktokUrl}
                                target="_blank"
                                rel="noreferrer"
                                title="TikTok"
                                className="p-1.5 rounded-full hover:bg-slate-100 hover:scale-115 transition-all"
                            >
                                <TikTokIcon className="w-4.5 h-4.5" />
                            </a>
                        </div>
                    </div>

                    {/* Mobile Hamburger & Search Toggle */}
                    <div className="flex md:hidden items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg"
                            aria-label="Pencarian"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none"
                            aria-label="Menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* TIER 2: HORIZONTAL NAVIGATION BAR + SEARCH + PPDB PILL    */}
            {/* ========================================================= */}
            <div className="bg-white border-b border-slate-200/90 shadow-2xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="hidden lg:flex items-center justify-between h-13">
                        {/* Navigation Links */}
                        <nav className="flex items-center space-x-1 xl:space-x-2">
                            {navItems.map((item, idx) => {
                                if (item.children) {
                                    return (
                                        <div key={idx} className="relative group py-2">
                                            <button
                                                type="button"
                                                className="px-2.5 py-1.5 rounded-md text-[13.5px] font-medium text-slate-700 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
                                            >
                                                <span>{item.label}</span>
                                                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 group-hover:text-blue-700 transition-transform duration-200" />
                                            </button>
                                            <div className="absolute left-0 mt-0.5 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                                                {item.children.map((sub, sIdx) => (
                                                    <Link
                                                        key={sIdx}
                                                        href={sub.href}
                                                        className={`block px-4 py-2 text-xs font-medium transition-colors ${
                                                            isActive(sub.href)
                                                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                                                : 'text-slate-700 hover:bg-slate-50 hover:text-blue-700'
                                                        }`}
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }

                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={idx}
                                        href={item.href}
                                        className={`px-2.5 py-1.5 rounded-md text-[13.5px] font-medium transition-colors ${
                                            active
                                                ? 'text-blue-700 font-semibold'
                                                : 'text-slate-700 hover:text-blue-700'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right: Search Icon + Navy Blue PPDB Pill Button */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="p-2 text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
                                title="Cari Informasi"
                            >
                                <Search className="w-4.5 h-4.5" />
                            </button>

                            <Link
                                href="/ppdb"
                                className="bg-[#0B1E63] hover:bg-[#071545] text-white text-xs font-extrabold px-6 py-2 rounded-full shadow-sm hover:shadow-md transition-all tracking-wider inline-flex items-center justify-center cursor-pointer"
                            >
                                PPDB
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar Input Dropdown (When triggered by Search button) */}
            {searchOpen && (
                <div className="bg-slate-50/95 border-b border-slate-200 py-3 animate-fadeIn">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Ketik kata kunci: berita, prestasi, guru, dokumen, PPDB..."
                                className="w-full pl-10 pr-24 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-xs"
                            />
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
                            <div className="absolute right-1.5 flex items-center gap-1">
                                <button
                                    type="submit"
                                    className="px-3.5 py-1.5 text-xs font-bold bg-[#0B1E63] text-white rounded-lg hover:bg-blue-900 transition-colors"
                                >
                                    Cari
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSearchOpen(false)}
                                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Mobile Drawer Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-b border-slate-200 max-h-[85vh] overflow-y-auto px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-lg">
                    {/* Contact & Socials inside Mobile Drawer */}
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between text-xs">
                        <div className="flex flex-col gap-1 text-slate-600">
                            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-amber-500" /> {phone}
                            </span>
                            <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-amber-500" /> {email}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <a href={waUrl} target="_blank" rel="noreferrer" className="p-1">
                                <WhatsAppIcon className="w-4 h-4" />
                            </a>
                            <a href={fbUrl} target="_blank" rel="noreferrer" className="p-1">
                                <FacebookIcon className="w-4 h-4" />
                            </a>
                            <a href={igUrl} target="_blank" rel="noreferrer" className="p-1">
                                <InstagramIcon className="w-4 h-4" />
                            </a>
                            <a href={youtubeUrl} target="_blank" rel="noreferrer" className="p-1">
                                <YoutubeIcon className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation list */}
                    <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
                    >
                        Beranda
                    </Link>

                    {/* Profil Kami Group */}
                    <div className="py-1">
                        <span className="px-3 text-xs font-bold text-[#02569B] uppercase tracking-wider">
                            Profil Kami
                        </span>
                        <div className="pl-3 mt-1 space-y-1">
                            <Link
                                href="/tentang"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50"
                            >
                                Tentang Sekolah
                            </Link>
                            <Link
                                href="/visi-misi"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50"
                            >
                                Visi & Misi
                            </Link>
                            <Link
                                href="/guru"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50"
                            >
                                Guru & Tenaga Pendidik
                            </Link>
                            <Link
                                href="/fasilitas"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50"
                            >
                                Sarana & Prasarana
                            </Link>
                            <Link
                                href="/prestasi"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50"
                            >
                                Prestasi Siswa
                            </Link>
                        </div>
                    </div>

                    {/* Unit Kerja Group */}
                    <div className="py-1">
                        <span className="px-3 text-xs font-bold text-[#02569B] uppercase tracking-wider">
                            Unit Kerja
                        </span>
                        <div className="pl-3 mt-1 space-y-1">
                            <Link
                                href="/tentang#kurikulum"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50"
                            >
                                Kurikulum & Pembelajaran
                            </Link>
                            <Link
                                href="/tentang#kesiswaan"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50"
                            >
                                Kesiswaan & Pembiasaan
                            </Link>
                            <Link
                                href="/tentang#tu"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50"
                            >
                                Tata Usaha & Administrasi
                            </Link>
                        </div>
                    </div>

                    <Link
                        href="/agenda"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Agenda
                    </Link>
                    <Link
                        href="/tentang#ekskul"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Ekstrakurikuler
                    </Link>
                    <Link
                        href="/berita"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Berita & Info
                    </Link>
                    <Link
                        href="/dokumen"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Perpustakaan Digital
                    </Link>
                    <Link
                        href="/galeri"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Galeri
                    </Link>
                    <Link
                        href="/pengumuman"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Pengumuman
                    </Link>
                    <Link
                        href="/kontak"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Kontak Kami
                    </Link>

                    {/* PPDB Button Pill */}
                    <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                        <Link
                            href="/ppdb"
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full flex items-center justify-center bg-[#0B1E63] text-white text-sm font-bold py-2.5 rounded-full shadow-md hover:bg-blue-900 transition-colors tracking-wider uppercase"
                        >
                            PPDB Online
                        </Link>
                        <Link
                            href="/admin/login"
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full text-center text-xs text-slate-500 py-1.5"
                        >
                            Masuk Portal Admin
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
