import React from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Button from '@/Components/UI/Button';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <PublicLayout title="Halaman Tidak Ditemukan (404)">
            <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
                <div className="max-w-md w-full text-center space-y-5 animate-fade-in-up">
                    <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-xs animate-pulse-glow">
                        <AlertCircle className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                        <span className="text-4xl sm:text-5xl font-extrabold text-blue-600 tracking-tight">
                            404
                        </span>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                            Halaman Tidak Ditemukan
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                            Mohon maaf, halaman yang Anda tuju tidak ditemukan atau telah dipindahkan ke tautan lain.
                        </p>
                    </div>
                    <div className="pt-2">
                        <Button href="/" variant="primary" size="md" className="hover-lift shadow-md hover:shadow-lg">
                            <Home className="w-4 h-4" />
                            <span>Kembali ke Beranda</span>
                        </Button>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
