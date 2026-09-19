import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Modal from '@/Components/UI/Modal';
import GalleryCard from '@/Components/Public/GalleryCard';
import { ArrowLeft, Image as ImageIcon, ZoomIn } from 'lucide-react';

export default function Show({ gallery, otherGalleries = [] }) {
    if (!gallery) return null;

    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <PublicLayout
            title={gallery.title}
            description={gallery.description}
            image={gallery.cover_image}
        >
            {/* Breadcrumb Bar */}
            <div className="bg-slate-100/70 border-b border-slate-200/60 py-3.5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-slate-500">
                        <Link href="/" className="hover:text-blue-600">Beranda</Link>
                        <span>/</span>
                        <Link href="/galeri" className="hover:text-blue-600">Galeri</Link>
                        <span>/</span>
                        <span className="text-slate-800 font-medium truncate max-w-sm">{gallery.title}</span>
                    </nav>
                </div>
            </div>

            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Album Info */}
                    <div className="mb-10 max-w-3xl">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            {gallery.title}
                        </h1>
                        {gallery.description && (
                            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                {gallery.description}
                            </p>
                        )}
                        <span className="inline-flex items-center gap-1 mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            <ImageIcon className="w-3.5 h-3.5" />
                            {gallery.images?.length || 0} Dokumentasi Foto
                        </span>
                    </div>

                    {/* Photos Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {gallery.images?.map((img) => (
                            <div
                                key={img.id}
                                onClick={() => setSelectedPhoto(img)}
                                className="group relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 cursor-pointer border border-slate-200 shadow-2xs hover:shadow-md transition-all"
                            >
                                <img
                                    src={img.image}
                                    alt={img.caption || gallery.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                    <ZoomIn className="w-6 h-6" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {(!gallery.images || gallery.images.length === 0) && (
                        <div className="text-center py-16 text-slate-400 text-sm">
                            Belum ada foto dalam album ini.
                        </div>
                    )}

                    {/* Back link */}
                    <div className="mt-12 pt-6 border-t border-slate-100">
                        <Link
                            href="/galeri"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Kembali ke Semua Album</span>
                        </Link>
                    </div>

                    {/* Other Galleries */}
                    {otherGalleries.length > 0 && (
                        <div className="mt-16 pt-10 border-t border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-6">
                                Album Galeri Lainnya
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {otherGalleries.map((og) => (
                                    <GalleryCard key={og.id} gallery={og} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Photo Lightbox Modal */}
            <Modal
                isOpen={!!selectedPhoto}
                onClose={() => setSelectedPhoto(null)}
                title={selectedPhoto?.caption || gallery.title}
                maxWidth="max-w-4xl"
            >
                {selectedPhoto && (
                    <div className="space-y-3">
                        <div className="rounded-xl overflow-hidden bg-black flex items-center justify-center">
                            <img
                                src={selectedPhoto.image}
                                alt={selectedPhoto.caption || gallery.title}
                                className="max-h-[70vh] w-auto object-contain mx-auto"
                            />
                        </div>
                        {selectedPhoto.caption && (
                            <p className="text-xs text-slate-600 text-center italic">
                                {selectedPhoto.caption}
                            </p>
                        )}
                    </div>
                )}
            </Modal>
        </PublicLayout>
    );
}
