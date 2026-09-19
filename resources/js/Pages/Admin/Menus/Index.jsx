import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Table from '@/Components/UI/Table';
import Modal from '@/Components/UI/Modal';
import Dialog from '@/Components/UI/Dialog';
import Input from '@/Components/UI/Input';
import Select from '@/Components/UI/Select';
import Button from '@/Components/UI/Button';
import Badge from '@/Components/UI/Badge';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function Index({ menus = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMenu, setEditingMenu] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [processingDelete, setProcessingDelete] = useState(false);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        label: '',
        url: '',
        order: 0,
        location: 'header',
        is_active: true,
    });

    const openCreateModal = () => {
        setEditingMenu(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (menu) => {
        setEditingMenu(menu);
        setData({
            label: menu.label,
            url: menu.url,
            order: menu.order,
            location: menu.location,
            is_active: Boolean(menu.is_active),
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingMenu) {
            put(`/admin/menus/${editingMenu.id}`, {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            post('/admin/menus', {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const confirmDelete = () => {
        if (!deleteId) return;
        setProcessingDelete(true);
        router.delete(`/admin/menus/${deleteId}`, {
            onFinish: () => {
                setProcessingDelete(false);
                setDeleteId(null);
            },
        });
    };

    const columns = [
        { header: 'Urutan', field: 'order', align: 'center', className: 'w-20 text-center font-bold' },
        { header: 'Label Menu', field: 'label', className: 'font-bold text-slate-900 text-sm' },
        { header: 'Tautan / URL', field: 'url', className: 'text-xs text-blue-600 font-mono' },
        {
            header: 'Posisi',
            render: (item) => (
                <span className="capitalize text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {item.location}
                </span>
            ),
            align: 'center',
            className: 'w-28',
        },
        {
            header: 'Status',
            render: (item) => (
                <Badge variant={item.is_active ? 'success' : 'slate'} size="sm">
                    {item.is_active ? 'Aktif' : 'Nonaktif'}
                </Badge>
            ),
            align: 'center',
            className: 'w-24',
        },
        {
            header: 'Aksi',
            render: (item) => (
                <div className="flex items-center justify-end gap-1.5">
                    <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit Menu"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setDeleteId(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Hapus Menu"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
            align: 'right',
            className: 'w-24 text-right',
        },
    ];

    return (
        <AdminLayout title="Kelola Menu Navigasi">
            <PageHeader
                title="Menu Navigasi Website"
                description="Atur susunan menu tautan di bar navigasi utama maupun footer."
                actionLabel="Tambah Menu"
                onAction={openCreateModal}
                actionIcon={Plus}
            />

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
                <Table columns={columns} data={menus} />
            </div>

            {/* Modal Create/Edit */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingMenu ? 'Edit Menu Navigasi' : 'Tambah Menu Baru'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Label Menu"
                        name="label"
                        value={data.label}
                        onChange={(e) => setData('label', e.target.value)}
                        error={errors.label}
                        required
                        placeholder="Contoh: Berita"
                    />

                    <Input
                        label="Tautan / URL"
                        name="url"
                        value={data.url}
                        onChange={(e) => setData('url', e.target.value)}
                        error={errors.url}
                        required
                        placeholder="Contoh: /berita atau https://..."
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Nomor Urutan"
                            name="order"
                            type="number"
                            value={data.order}
                            onChange={(e) => setData('order', e.target.value)}
                            error={errors.order}
                        />
                        <Select
                            label="Lokasi Tampil"
                            name="location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            options={[
                                { value: 'header', label: 'Header (Navigasi Atas)' },
                                { value: 'footer', label: 'Footer (Bawah)' },
                            ]}
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
                            <span>Tampilkan Menu (Aktif)</span>
                        </label>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                            Batal
                        </Button>
                        <Button type="submit" variant="primary" processing={processing}>
                            {editingMenu ? 'Simpan Perubahan' : 'Tambah Menu'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Dialog Delete */}
            <Dialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Hapus Menu"
                message="Apakah Anda yakin ingin menghapus item menu ini?"
                processing={processingDelete}
            />
        </AdminLayout>
    );
}
