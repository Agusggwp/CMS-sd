import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Menu, User, LogOut, ExternalLink, Globe, PanelLeft } from 'lucide-react';
import Dropdown from '@/Components/UI/Dropdown';

export default function Topbar({ onMenuClick, toggleSidebar, sidebarCollapsed }) {
    const { auth = {} } = usePage().props;
    const user = auth.user || { name: 'Administrator', email: 'admin@sekolah.sch.id', role: 'admin' };

    return (
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-2xs">
            {/* Left: Mobile Menu Button, Desktop Toggle & Breadcrumb */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
                    aria-label="Buka navigasi"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {toggleSidebar && (
                    <button
                        type="button"
                        onClick={toggleSidebar}
                        className="hidden lg:flex p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title={sidebarCollapsed ? "Perluas Sidebar" : "Ciutkan Sidebar"}
                        aria-label="Toggle sidebar"
                    >
                        <PanelLeft className="w-5 h-5" />
                    </button>
                )}
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span>Panel Kendali Semi-CMS</span>
                    <span className="hidden sm:inline text-slate-300">•</span>
                    <span className="hidden sm:inline text-slate-700 font-semibold">Tahun Pelajaran 2026/2027</span>
                </div>
            </div>

            {/* Right: Quick link & User profile */}
            <div className="flex items-center gap-3 sm:gap-4">
                <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                >
                    <Globe className="w-3.5 h-3.5 text-slate-500" />
                    <span>Lihat Web Publik</span>
                </a>

                {/* User Dropdown */}
                <Dropdown
                    trigger={
                        <button
                            type="button"
                            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-50 cursor-pointer"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    user.name.charAt(0).toUpperCase()
                                )}
                            </div>
                            <div className="hidden md:block text-left">
                                <span className="block text-xs font-semibold text-slate-900 leading-tight">
                                    {user.name}
                                </span>
                                <span className="block text-[10px] text-slate-500 capitalize">
                                    {user.role || 'Admin'}
                                </span>
                            </div>
                        </button>
                    }
                    width="w-52"
                >
                    <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                        <Link
                            href="/admin/settings"
                            className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                        >
                            Pengaturan Sekolah
                        </Link>
                        <Link
                            href="/admin/logout"
                            method="post"
                            as="button"
                            className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left font-medium"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Keluar Sistem</span>
                        </Link>
                    </div>
                </Dropdown>
            </div>
        </header>
    );
}
