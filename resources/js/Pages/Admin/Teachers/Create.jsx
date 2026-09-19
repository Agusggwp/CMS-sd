import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Button from '@/Components/UI/Button';
import { Save } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        nip: '',
        position: '',
        subject: '',
        bio: '',
        photo: null,
        order: 0,
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/teachers');
    };

    return (
        <AdminLayout title="Tambah Guru Baru">
            <PageHeader
                title="Tambah Guru Baru"
                description="Tambahkan data guru atau tenaga pendidik sekolah baru."
                backHref="/admin/teachers"
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-4 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Nama Lengkap & Gelar"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                        required
                        placeholder="Contoh: Siti Nurhaliza, S.Pd."
                    />
                    <Input
                        label="NIP (Nomor Induk Pegawai)"
                        name="nip"
                        value={data.nip}
                        onChange={(e) => setData('nip', e.target.value)}
                        error={errors.nip}
                        placeholder="19830921..."
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Jabatan / Tugas Tambahan"
                        name="position"
                        value={data.position}
                        onChange={(e) => setData('position', e.target.value)}
                        error={errors.position}
                        required
                        placeholder="Contoh: Wali Kelas 1A / Guru PJOK"
                    />
                    <Input
                        label="Mata Pelajaran yang Diampu"
                        name="subject"
                        value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)}
                        error={errors.subject}
                        placeholder="Contoh: Tematik / Matematika"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Nomor Urut Tampil"
                        name="order"
                        type="number"
                        value={data.order}
                        onChange={(e) => setData('order', e.target.value)}
                        error={errors.order}
                        helperText="Angka lebih kecil tampil lebih dulu (misal 1 untuk Kepala Sekolah)."
                    />
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Foto Formal Guru
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('photo', e.target.files[0])}
                            className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                </div>

                <Textarea
                    label="Profil Singkat / Bio (Opsional)"
                    name="bio"
                    rows={3}
                    value={data.bio}
                    onChange={(e) => setData('bio', e.target.value)}
                    error={errors.bio}
                    placeholder="Latar belakang pendidikan atau spesialisasi mengajar..."
                />

                <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                            className="rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                        />
                        <span>Aktif dan Tampilkan di Web Sekolah</span>
                    </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button href="/admin/teachers" variant="outline">
                        Batal
                    </Button>
                    <Button type="submit" variant="primary" processing={processing}>
                        <Save className="w-4 h-4" />
                        <span>Simpan Data Guru</span>
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
