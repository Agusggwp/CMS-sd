import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Select from '@/Components/UI/Select';
import Button from '@/Components/UI/Button';
import { Save } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: 'Akademik',
        level: 'Tingkat Kota / Kabupaten',
        year: new Date().getFullYear().toString(),
        rank: 'Juara I',
        participant: '',
        description: '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/achievements');
    };

    return (
        <AdminLayout title="Tambah Prestasi Baru">
            <PageHeader
                title="Tambah Prestasi Baru"
                description="Catat kejuaraan atau penghargaan yang diraih siswa/sekolah."
                backHref="/admin/achievements"
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-4 max-w-2xl">
                <Input
                    label="Nama Lomba / Penghargaan"
                    name="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    error={errors.title}
                    required
                    placeholder="Contoh: Olimpiade Sains Nasional (OSN) IPA"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Peringkat / Capaian"
                        name="rank"
                        value={data.rank}
                        onChange={(e) => setData('rank', e.target.value)}
                        error={errors.rank}
                        placeholder="Juara I / Medali Emas"
                    />
                    <Input
                        label="Nama Siswa / Tim Pemenang"
                        name="participant"
                        value={data.participant}
                        onChange={(e) => setData('participant', e.target.value)}
                        error={errors.participant}
                        placeholder="Contoh: Rizky Pratama (Kelas 5B)"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Select
                        label="Kategori"
                        name="category"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        options={[
                            { value: 'Akademik', label: 'Akademik' },
                            { value: 'Olahraga', label: 'Olahraga' },
                            { value: 'Seni & Budaya', label: 'Seni & Budaya' },
                            { value: 'Keagamaan', label: 'Keagamaan' },
                            { value: 'Lingkungan Hidup', label: 'Lingkungan Hidup' },
                        ]}
                    />
                    <Input
                        label="Tingkat Wilayah"
                        name="level"
                        value={data.level}
                        onChange={(e) => setData('level', e.target.value)}
                        error={errors.level}
                        placeholder="Tingkat Provinsi / Nasional"
                        required
                    />
                    <Input
                        label="Tahun"
                        name="year"
                        value={data.year}
                        onChange={(e) => setData('year', e.target.value)}
                        error={errors.year}
                        required
                    />
                </div>

                <Textarea
                    label="Keterangan Tambahan (Opsional)"
                    name="description"
                    rows={3}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    error={errors.description}
                />

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Foto Penyerahan Piala / Piagam
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('image', e.target.files[0])}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button href="/admin/achievements" variant="outline">
                        Batal
                    </Button>
                    <Button type="submit" variant="primary" processing={processing}>
                        <Save className="w-4 h-4" />
                        <span>Simpan Prestasi</span>
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
