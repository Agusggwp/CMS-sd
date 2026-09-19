import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Select from '@/Components/UI/Select';
import Button from '@/Components/UI/Button';
import { Save } from 'lucide-react';

export default function Edit({ facility }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: facility.name || '',
        description: facility.description || '',
        icon: facility.icon || 'BookOpen',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/facilities/${facility.id}`);
    };

    return (
        <AdminLayout title={`Edit: ${facility.name}`}>
            <PageHeader
                title="Edit Fasilitas"
                description={`Ubah informasi fasilitas "${facility.name}".`}
                backHref="/admin/facilities"
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-4 max-w-2xl">
                <Input
                    label="Nama Fasilitas"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                    required
                />

                <Select
                    label="Ikon Fasilitas"
                    name="icon"
                    value={data.icon}
                    onChange={(e) => setData('icon', e.target.value)}
                    options={[
                        { value: 'BookOpen', label: 'Buku / Perpustakaan' },
                        { value: 'Monitor', label: 'Komputer / Lab TIK' },
                        { value: 'Trophy', label: 'Olahraga / Lapangan' },
                        { value: 'HeartPulse', label: 'Kesehatan / UKS' },
                        { value: 'Compass', label: 'Ibadah / Musholla' },
                        { value: 'Trees', label: 'Taman / Outdoor' },
                    ]}
                />

                <Textarea
                    label="Deskripsi Fasilitas"
                    name="description"
                    rows={4}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    error={errors.description}
                />

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Ubah Foto Fasilitas
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('image', e.target.files[0])}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {facility.image && (
                        <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs text-slate-400">Foto saat ini:</span>
                            <img src={facility.image} alt={facility.name} className="w-16 h-12 object-cover rounded-lg" />
                        </div>
                    )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button href="/admin/facilities" variant="outline">
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
