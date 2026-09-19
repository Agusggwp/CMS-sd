import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Button from '@/Components/UI/Button';
import { Save } from 'lucide-react';

export default function Edit({ teacher }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: teacher.name || '',
        nip: teacher.nip || '',
        position: teacher.position || '',
        subject: teacher.subject || '',
        bio: teacher.bio || '',
        photo: null,
        order: teacher.order || 0,
        is_active: Boolean(teacher.is_active),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/teachers/${teacher.id}`);
    };

    return (
        <AdminLayout title={`Edit Guru: ${teacher.name}`}>
            <PageHeader
                title="Edit Data Guru"
                description={`Ubah profil tenaga pendidik "${teacher.name}".`}
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
                    />
                    <Input
                        label="NIP (Nomor Induk Pegawai)"
                        name="nip"
                        value={data.nip}
                        onChange={(e) => setData('nip', e.target.value)}
                        error={errors.nip}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Jabatan / Tugas"
                        name="position"
                        value={data.position}
                        onChange={(e) => setData('position', e.target.value)}
                        error={errors.position}
                        required
                    />
                    <Input
                        label="Mata Pelajaran"
                        name="subject"
                        value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)}
                        error={errors.subject}
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
                    />
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Ubah Foto
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('photo', e.target.files[0])}
                            className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {teacher.photo && (
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-xs text-slate-400">Foto saat ini:</span>
                                <img src={teacher.photo} alt={teacher.name} className="w-10 h-10 object-cover rounded-full" />
                            </div>
                        )}
                    </div>
                </div>

                <Textarea
                    label="Profil Singkat / Bio"
                    name="bio"
                    rows={3}
                    value={data.bio}
                    onChange={(e) => setData('bio', e.target.value)}
                    error={errors.bio}
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
                        <span>Simpan Perubahan</span>
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
