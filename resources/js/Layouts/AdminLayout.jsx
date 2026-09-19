import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Topbar from '@/Components/Admin/Topbar';
import Toast from '@/Components/UI/Toast';

export default function AdminLayout({ children, title = 'Panel Kendali Admin' }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('admin_sidebar_collapsed') === 'true';
        }
        return false;
    });

    const toggleSidebar = () => {
        setSidebarCollapsed((prev) => {
            const next = !prev;
            if (typeof window !== 'undefined') {
                localStorage.setItem('admin_sidebar_collapsed', String(next));
            }
            return next;
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
            <Head title={`${title} - Admin CMS Sekolah`} />

            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                sidebarCollapsed={sidebarCollapsed}
                toggleSidebar={toggleSidebar}
            />

            {/* Main content wrapper */}
            <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-64'}`}>
                {/* Topbar */}
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    toggleSidebar={toggleSidebar}
                    sidebarCollapsed={sidebarCollapsed}
                />

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

                {/* Admin Footer */}
                <footer className="py-4 px-6 border-t border-slate-200 bg-white text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <span>Panel Kendali Semi-CMS Sekolah Dasar</span>
                    <div className="flex items-center gap-1.5 text-slate-500">
                        <span>Dikembangkan oleh</span>
                        <a
                            href="https://artdevata.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
                        >
                            <img
                                src="/art.jpeg"
                                alt="artdevata"
                                className="w-4 h-4 rounded-full object-cover"
                            />
                            <span>artdevata</span>
                        </a>
                    </div>
                </footer>
            </div>

            {/* Global Flash Toast */}
            <Toast />
        </div>
    );
}
