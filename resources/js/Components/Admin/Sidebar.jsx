import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import {
    LayoutDashboard,
    Newspaper,
    Tag,
    Bell,
    Calendar,
    Users,
    Image,
    Trophy,
    Building2,
    GraduationCap,
    FileText,
    Files,
    Menu as MenuIcon,
    FolderKanban,
    UserCheck,
    Settings,
    LogOut,
    ChevronRight,
    Loader2,
    ExternalLink,
} from 'lucide-react';
import { ConfirmDialog } from '@/Components/UI/ConfirmDialog';
import Button from '@/Components/UI/Button';
import { Avatar, AvatarImage, AvatarFallback } from '@/Components/UI/Avatar';

export default function Sidebar({
    sidebarOpen: propSidebarOpen,
    setSidebarOpen: propSetSidebarOpen,
    sidebarCollapsed = false,
    toggleSidebar,
    user: propUser,
    isOpen,
    onClose,
}) {
    const { url } = usePage();
    const { auth = {}, school_settings = {} } = usePage().props;

    const sidebarOpen = propSidebarOpen !== undefined ? propSidebarOpen : !!isOpen;
    const setSidebarOpen = propSetSidebarOpen || (onClose ? (val) => { if (!val) onClose(); } : () => {});
    const user = propUser || auth.user || { name: 'Admin CMS', email: 'admin@sekolah.sch.id', role: 'admin' };
    const schoolName = school_settings.school_name || 'SD ARTDEVATA';
    const logoUrl = school_settings.school_logo || null;

    const [logoutOpen, setLogoutOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const isActive = (path) => {
        if (path === '/admin') return url === '/admin' || url === '/admin/';
        if (path === '/') return false;
        return url.startsWith(path);
    };

    const navigation = [
        {
            group: 'UTAMA',
            items: [
                { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
            ],
        },
        {
            group: 'KONTEN & PUBLIKASI',
            items: [
                { name: 'Berita Sekolah', href: '/admin/news', icon: Newspaper },
                { name: 'Kategori Berita', href: '/admin/categories', icon: Tag },
                { name: 'Pengumuman', href: '/admin/announcements', icon: Bell },
                { name: 'Agenda & Acara', href: '/admin/events', icon: Calendar },
            ],
        },
        {
            group: 'PROFIL & AKADEMIK',
            items: [
                { name: 'Guru & Staf', href: '/admin/teachers', icon: Users },
                { name: 'Galeri Foto', href: '/admin/galleries', icon: Image },
                { name: 'Prestasi Siswa', href: '/admin/achievements', icon: Trophy },
                { name: 'Fasilitas Belajar', href: '/admin/facilities', icon: Building2 },
                { name: 'Informasi PPDB', href: '/admin/ppdb', icon: GraduationCap },
                { name: 'Pendaftar PPDB', href: '/admin/ppdb/pendaftar', icon: UserCheck },
                { name: 'Dokumen & Berkas', href: '/admin/documents', icon: FileText },
            ],
        },
        {
            group: 'WEBSITE & SISTEM',
            items: [
                { name: 'Halaman Statis', href: '/admin/pages', icon: Files },
                { name: 'Menu Navigasi', href: '/admin/menus', icon: MenuIcon },
                { name: 'Pustaka Media', href: '/admin/media', icon: FolderKanban },
                { name: 'Pengguna Admin', href: '/admin/users', icon: UserCheck },
                { name: 'Identitas Sekolah', href: '/admin/settings', icon: Settings },
                { name: 'Lihat Web Publik', href: '/', icon: ExternalLink, external: true },
            ],
        },
    ];

    const portalSubtitle = 'Portal CMS Sekolah';

    return (
        <>
            {/* Mobile Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Desktop & Mobile */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 ease-in-out lg:z-30 shrink-0 ${
                    sidebarOpen
                        ? 'translate-x-0 w-64 shadow-2xl lg:shadow-none'
                        : '-translate-x-full lg:translate-x-0'
                } ${sidebarCollapsed ? 'lg:w-[72px]' : 'lg:w-64'}`}
            >
                <div className="flex flex-col h-full overflow-hidden">
                    {/* Logo Brand */}
                    <div
                        className={`h-16 border-b border-slate-200 dark:border-slate-800 flex items-center shrink-0 ${
                            sidebarCollapsed ? 'lg:justify-center lg:px-2 px-4' : 'px-4'
                        }`}
                    >
                        <div className="flex items-center space-x-3 overflow-hidden">
                            {/* Logo Mark (Always visible) */}
                            {logoUrl ? (
                                <img
                                    src={logoUrl}
                                    alt="Logo"
                                    className={`h-9 w-9 object-contain shrink-0 cursor-pointer transition-transform hover:scale-105 ${
                                        sidebarCollapsed ? 'mx-auto' : ''
                                    }`}
                                    onClick={sidebarCollapsed ? toggleSidebar : undefined}
                                    title={sidebarCollapsed ? 'Buka / Perluas Sidebar' : schoolName}
                                />
                            ) : (
                                <div
                                    className={`h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0 cursor-pointer transition-transform hover:scale-105 ${
                                        sidebarCollapsed ? 'mx-auto' : ''
                                    }`}
                                    onClick={sidebarCollapsed ? toggleSidebar : undefined}
                                    title={sidebarCollapsed ? 'Buka / Perluas Sidebar' : schoolName}
                                >
                                    SD
                                </div>
                            )}

                            {/* Brand Text (hidden when collapsed on desktop) */}
                            <div className={`truncate ${sidebarCollapsed ? 'lg:hidden block' : 'block'}`}>
                                <h1 className="font-bold text-slate-900 dark:text-white tracking-tight text-base leading-tight truncate">
                                    {schoolName}
                                </h1>
                                <p className="text-[11px] text-slate-400 dark:text-slate-400 font-medium tracking-wide uppercase truncate">
                                    {portalSubtitle}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav
                        className={`flex-1 overflow-y-auto overflow-x-hidden no-scrollbar ${
                            sidebarCollapsed ? 'p-2 lg:px-2 lg:py-3 space-y-4' : 'p-4 space-y-6'
                        }`}
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {navigation.map((group, idx) => (
                            <div key={idx}>
                                {/* Group Title or subtle separator when collapsed on desktop */}
                                {sidebarCollapsed ? (
                                    <div className="hidden lg:block">
                                        {idx > 0 && <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-1" />}
                                    </div>
                                ) : (
                                    <p className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-2 px-2">
                                        {group.group}
                                    </p>
                                )}

                                {/* Always show group title on mobile drawer */}
                                {sidebarCollapsed && (
                                    <p className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-2 px-2 lg:hidden">
                                        {group.group}
                                    </p>
                                )}

                                <div className="space-y-1">
                                    {group.items.map((item) => {
                                        const Icon = item.icon;
                                        const active = isActive(item.href);
                                        const Component = item.external ? 'a' : Link;
                                        const linkProps = item.external
                                            ? { href: item.href, target: '_blank', rel: 'noreferrer' }
                                            : { href: item.href };

                                        return (
                                            <Component
                                                key={item.name}
                                                {...linkProps}
                                                onClick={() => setSidebarOpen(false)}
                                                title={sidebarCollapsed ? item.name : undefined}
                                                className={`flex items-center rounded-lg transition-colors group relative cursor-pointer ${
                                                    sidebarCollapsed
                                                        ? 'lg:justify-center lg:p-2.5 lg:h-10 lg:w-10 lg:mx-auto px-3 py-2 justify-between'
                                                        : 'px-3 py-2 justify-between'
                                                } ${
                                                    active
                                                        ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xs'
                                                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                                                }`}
                                            >
                                                <div
                                                    className={`flex items-center ${
                                                        sidebarCollapsed ? 'lg:space-x-0 space-x-3' : 'space-x-3'
                                                    }`}
                                                >
                                                    <Icon
                                                        className={`h-4 w-4 shrink-0 ${
                                                            active
                                                                ? 'text-white'
                                                                : 'text-slate-400 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                                                        }`}
                                                    />
                                                    <span
                                                        className={`text-sm font-medium whitespace-nowrap ${
                                                            sidebarCollapsed ? 'lg:hidden block' : 'block'
                                                        }`}
                                                    >
                                                        {item.name}
                                                    </span>
                                                </div>

                                                {active && !sidebarCollapsed && (
                                                    <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                                                )}
                                                {active && sidebarCollapsed && (
                                                    <ChevronRight className="h-3.5 w-3.5 opacity-70 lg:hidden" />
                                                )}
                                            </Component>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* User Profile & Logout in Sidebar Footer */}
                    <div
                        className={`border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 shrink-0 ${
                            sidebarCollapsed ? 'p-2 lg:py-3 lg:px-1' : 'p-3'
                        }`}
                    >
                        {/* Compact Profile for Desktop Collapsed State */}
                        {sidebarCollapsed && (
                            <div className="hidden lg:flex flex-col items-center space-y-2.5">
                                <Avatar
                                    className="h-9 w-9 ring-2 ring-white dark:ring-slate-800 shadow-2xs cursor-pointer"
                                    title={`${user?.name} (${user?.email})`}
                                >
                                    <AvatarImage src={user?.avatar_url || user?.avatar} alt={user?.name || 'User'} />
                                    <AvatarFallback className="bg-slate-900 text-white text-xs font-bold">
                                        {getInitials(user?.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => setLogoutOpen(true)}
                                    title="Logout"
                                    disabled={isLoggingOut}
                                >
                                    {isLoggingOut ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <LogOut className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        )}

                        {/* Full Profile on Mobile or Expanded Desktop */}
                        <div
                            className={`flex flex-col gap-2 ${
                                sidebarCollapsed ? 'lg:hidden flex' : 'flex'
                            }`}
                        >
                            <div className="flex items-center space-x-3 overflow-hidden min-w-0">
                                <Avatar className="h-9 w-9 shrink-0 ring-2 ring-white dark:ring-slate-800 shadow-2xs">
                                    <AvatarImage src={user?.avatar_url || user?.avatar} alt={user?.name || 'User'} />
                                    <AvatarFallback className="bg-slate-900 text-white text-xs font-bold">
                                        {getInitials(user?.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="truncate min-w-0">
                                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                                        {user?.name || 'Administrator'}
                                    </p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                        {user?.email || 'admin@sekolah.sch.id'}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="destructive"
                                onClick={() => setLogoutOpen(true)}
                                title="Logout"
                                className="w-full flex items-center justify-center gap-2 cursor-pointer"
                                disabled={isLoggingOut}
                            >
                                {isLoggingOut ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                                        <span>Mengeluarkan...</span>
                                    </>
                                ) : (
                                    <>
                                        <LogOut className="h-4 w-4 shrink-0" />
                                        <span>Keluar</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </aside>

            <ConfirmDialog
                open={logoutOpen}
                onOpenChange={setLogoutOpen}
                title="Konfirmasi Logout"
                description={`Apakah Anda yakin ingin keluar dari sistem administrasi ${schoolName}?`}
                confirmText="Keluar"
                cancelText="Batal"
                loadingText="Mengeluarkan..."
                loading={isLoggingOut}
                variant="destructive"
                icon={LogOut}
                onConfirm={() => {
                    setIsLoggingOut(true);
                    router.post('/admin/logout', {}, {
                        onFinish: () => {
                            setIsLoggingOut(false);
                            setLogoutOpen(false);
                        },
                    });
                }}
            />
        </>
    );
}
