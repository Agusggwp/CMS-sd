import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/UI/Input';
import Select from '@/Components/UI/Select';
import Button from '@/Components/UI/Button';
import { Save } from 'lucide-react';

export default function Edit({ userItem }) {
    const { data, setData, put, processing, errors } = useForm({
        name: userItem.name || '',
        email: userItem.email || '',
        role: userItem.role || 'operator',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/users/${userItem.id}`);
    };

    return (
        <AdminLayout title={`Edit Pengguna: ${userItem.name}`}>
            <PageHeader
                title="Edit Pengguna"
                description={`Ubah rincian akun pengguna "${userItem.name}".`}
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
                />

                <Input
                    label="Alamat Email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    required
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
                    label="Kata Sandi Baru (Kosongkan jika tidak ingin mengubah)"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    placeholder="••••••••"
                />

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button href="/admin/users" variant="outline">
                        Batal
                    </Button>
                    <Button type="submit" variant="primary" processing={processing}>
                        <Save className="w-4 h-4" />
                        <span>Simpan Perubahan</span>
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
