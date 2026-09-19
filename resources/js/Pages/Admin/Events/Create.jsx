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
        title: '',
        description: '',
        location: '',
        start_date: '',
        end_date: '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/events');
    };

    return (
        <AdminLayout title="Tambah Agenda Kegiatan">
            <PageHeader
                title="Tambah Agenda Baru"
                description="Jadwalkan kegiatan akademik atau non-akademik sekolah."
                backHref="/admin/events"
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-4 max-w-2xl">
                <Input
                    label="Judul Agenda / Kegiatan"
                    name="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    error={errors.title}
                    required
                    placeholder="Contoh: Pentas Seni & Kreativitas Siswa"
                />

                <Input
                    label="Lokasi / Tempat Pelaksanaan"
                    name="location"
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                    error={errors.location}
                    placeholder="Contoh: Lapangan Utama / Aula Serbaguna"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Waktu Mulai"
                        name="start_date"
                        type="datetime-local"
                        value={data.start_date}
                        onChange={(e) => setData('start_date', e.target.value)}
                        error={errors.start_date}
                        required
                    />
                    <Input
                        label="Waktu Selesai (Opsional)"
                        name="end_date"
                        type="datetime-local"
                        value={data.end_date}
                        onChange={(e) => setData('end_date', e.target.value)}
                        error={errors.end_date}
                    />
                </div>

                <Textarea
                    label="Deskripsi Lengkap Kegiatan"
                    name="description"
                    rows={5}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    error={errors.description}
                    required
                    placeholder="Rincian susunan acara, peserta yang wajib hadir, dan perlengkapan..."
                />

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Poster / Gambar Agenda (Opsional)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('image', e.target.files[0])}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button href="/admin/events" variant="outline">
                        Batal
                    </Button>
                    <Button type="submit" variant="primary" processing={processing}>
                        <Save className="w-4 h-4" />
                        <span>Simpan Agenda</span>
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
