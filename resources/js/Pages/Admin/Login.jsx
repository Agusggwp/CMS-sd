import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Input from '@/Components/UI/Input';
import Button from '@/Components/UI/Button';
import { GraduationCap, Lock, Mail, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: 'admin@sdpercontohan.sch.id',
        password: 'password123',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 font-sans text-slate-800">
            <Head title="Masuk Portal Admin - CMS Sekolah" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <Link href="/" className="inline-flex items-center justify-center gap-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                        <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                </Link>
                <h2 className="mt-4 text-2xl font-extrabold text-white tracking-tight">
                    Portal Operator & Admin
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-400">
                    Masuk untuk mengelola konten dan informasi sekolah
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow-2xl rounded-3xl sm:px-10 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Alamat Email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                            required
                            placeholder="admin@sdpercontohan.sch.id"
                            autoComplete="username"
                        />

                        <Input
                            label="Kata Sandi"
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                            required
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />

                        <div className="flex items-center justify-between text-xs pt-1">
                            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                                />
                                <span>Ingat saya di perangkat ini</span>
                            </label>
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                processing={processing}
                                className="w-full shadow-md hover:shadow-lg"
                            >
                                <Lock className="w-4 h-4" />
                                <span>Masuk ke Dashboard</span>
                            </Button>
                        </div>
                    </form>

                    {/* Demo credentials box */}
                    <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50 p-3.5 rounded-xl text-xs text-slate-600 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                            <ShieldCheck className="w-4 h-4 text-blue-600" />
                            <span>Akun Demo Administrator:</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                            Email: <strong className="text-slate-700">admin@sdpercontohan.sch.id</strong>
                        </p>
                        <p className="text-[11px] text-slate-500">
                            Kata Sandi: <strong className="text-slate-700">password123</strong>
                        </p>
                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Kembali ke Halaman Beranda</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
