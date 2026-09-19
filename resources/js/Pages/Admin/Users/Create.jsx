import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/UI/Input';
import Select from '@/Components/UI/Select';
import Button from '@/Components/UI/Button';
import { Save } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        role: 'operator',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/users');
    };

    return (
        <AdminLayout title="Tambah Pengguna Baru">
            <PageHeader
                title="Tambah Pengguna Baru"
                description="Buat akun pengelola sistem baru."
                backHref="/admin/users"
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-4 max-w-xl">
                <Input
                    label="Nama Lengkap"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                    required
                    placeholder="Nama Operator"
                />

                <Input
                    label="Alamat Email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    required
                    placeholder="operator@sdpercontohan.sch.id"
                />

                <Select
                    label="Peran / Hak Akses"
                    name="role"
                    value={data.role}
                    onChange={(e) => setData('role', e.target.value)}
                    options={[
                        { value: 'admin', label: 'Administrator Penuh' },
                        { value: 'operator', label: 'Operator Konten' },
                    ]}
                    error={errors.role}
                    required
                />

                <Input
                    label="Kata Sandi (Minimal 8 Karakter)"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    required
                    placeholder="••••••••"
                />

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button href="/admin/users" variant="outline">
                        Batal
                    </Button>
                    <Button type="submit" variant="primary" processing={processing}>
                        <Save className="w-4 h-4" />
                        <span>Simpan Pengguna</span>
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
