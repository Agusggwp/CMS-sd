import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Dialog from '@/Components/UI/Dialog';
import Button from '@/Components/UI/Button';
import Pagination from '@/Components/UI/Pagination';
import { Upload, Copy, Check, Trash2, File, Image as ImageIcon } from 'lucide-react';

export default function Index({ media = { data: [] }, filters = {} }) {
    const [copiedPath, setCopiedPath] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [processingDelete, setProcessingDelete] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        files: [],
    });

    const handleUpload = (e) => {
        e.preventDefault();
        if (data.files.length === 0) return;
        post('/admin/media', {
            onSuccess: () => reset(),
        });
    };

    const confirmDelete = () => {
        if (!deleteId) return;
        setProcessingDelete(true);
        router.delete(`/admin/media/${deleteId}`, {
            onFinish: () => {
                setProcessingDelete(false);
                setDeleteId(null);
            },
        });
    };

    const copyToClipboard = (path) => {
        navigator.clipboard.writeText(path);
        setCopiedPath(path);
        setTimeout(() => setCopiedPath(null), 2500);
    };

    const formatBytes = (bytes) => {
        if (!bytes) return '0 B';
        if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + ' MB';
        return (bytes / 1024).toFixed(0) + ' KB';
    };

    return (
        <AdminLayout title="Pustaka Media">
            <PageHeader
                title="Pustaka Media & Berkas"
                description="Pusat penyimpanan gambar, dokumen, dan aset visual website."
            />

            {/* Upload Zone */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 mb-8 shadow-2xs">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <span>Unggah Berkas Media Baru</span>
                </h3>
                <form onSubmit={handleUpload} className="flex flex-col sm:flex-row items-center gap-4">
                    <input
                        type="file"
                        multiple
                        accept="image/*,.pdf"
                        onChange={(e) => setData('files', Array.from(e.target.files))}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-slate-200 rounded-xl p-1"
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        processing={processing}
                        disabled={data.files.length === 0}
                        className="shrink-0 w-full sm:w-auto"
                    >
                        <span>Mulai Unggah</span>
                    </Button>
                </form>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {media.data.map((item) => {
                    const isImage = item.type?.startsWith('image/');

                    return (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs group flex flex-col justify-between"
                        >
                            <div className="relative aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
                                {isImage ? (
                                    <img src={item.path} alt={item.alt || item.filename} className="w-full h-full object-cover" />
                                ) : (
                                    <File className="w-10 h-10 text-slate-400" />
                                )}
                                <button
                                    type="button"
                                    onClick={() => setDeleteId(item.id)}
                                    className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-700 shadow-sm cursor-pointer"
                                    title="Hapus berkas"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <div className="p-3 bg-white">
                                <p className="text-xs font-semibold text-slate-800 truncate" title={item.filename}>
                                    {item.filename}
                                </p>
                                <span className="text-[10px] text-slate-400 block mt-0.5">
                                    {formatBytes(item.size)}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => copyToClipboard(item.path)}
                                    className="mt-2.5 w-full py-1 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-600 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                                >
                                    {copiedPath === item.path ? (
                                        <>
                                            <Check className="w-3 h-3 text-emerald-600" />
                                            <span className="text-emerald-600 font-bold">Disalin!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3 h-3 text-slate-400" />
                                            <span>Salin URL</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {media.data.length === 0 && (
                <div className="text-center py-16 text-slate-400 text-sm bg-white rounded-2xl border border-slate-200">
                    Belum ada berkas di pustaka media.
                </div>
            )}

            <Pagination links={media.links} className="mt-8" />

            <Dialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Hapus Berkas Media"
                message="Apakah Anda yakin ingin menghapus berkas media ini?"
                processing={processingDelete}
            />
        </AdminLayout>
    );
}
