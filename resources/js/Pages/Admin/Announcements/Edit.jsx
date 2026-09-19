import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Button from '@/Components/UI/Button';
import { Save } from 'lucide-react';

export default function Edit({ announcement }) {
    const { data, setData, put, processing, errors } = useForm({
        title: announcement.title || '',
        content: announcement.content || '',
        is_active: Boolean(announcement.is_active),
        start_date: announcement.start_date || '',
        end_date: announcement.end_date || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/announcements/${announcement.id}`);
    };

    return (
        <AdminLayout title={`Edit: ${announcement.title}`}>
            <PageHeader
                title="Edit Pengumuman"
                description={`Ubah informasi pengumuman "${announcement.title}".`}
                backHref="/admin/announcements"
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-4 max-w-2xl">
                <Input
                    label="Judul Pengumuman"
                    name="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    error={errors.title}
                    required
                />

                <Textarea
                    label="Isi Pengumuman"
                    name="content"
                    rows={6}
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    error={errors.content}
                    required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Tanggal Mulai Berlaku"
                        name="start_date"
                        type="date"
                        value={data.start_date}
                        onChange={(e) => setData('start_date', e.target.value)}
                        error={errors.start_date}
                    />
                    <Input
                        label="Tanggal Berakhir"
                        name="end_date"
                        type="date"
                        value={data.end_date}
                        onChange={(e) => setData('end_date', e.target.value)}
                        error={errors.end_date}
                    />
                </div>

                <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                            className="rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                        />
                        <span>Tampilkan di Halaman Beranda & Publik (Aktif)</span>
                    </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button href="/admin/announcements" variant="outline">
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
