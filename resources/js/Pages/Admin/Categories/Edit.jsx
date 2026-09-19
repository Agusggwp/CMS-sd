import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Button from '@/Components/UI/Button';
import { Save } from 'lucide-react';

export default function Edit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        description: category.description || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/categories/${category.id}`);
    };

    return (
        <AdminLayout title={`Edit Kategori: ${category.name}`}>
            <PageHeader
                title="Edit Kategori Berita"
                description={`Ubah rincian kategori "${category.name}".`}
                backHref="/admin/categories"
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-4 max-w-xl">
                <Input
                    label="Nama Kategori"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                    required
                />

                <Textarea
                    label="Deskripsi Kategori"
                    name="description"
                    rows={3}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    error={errors.description}
                />

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button href="/admin/categories" variant="outline">
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
