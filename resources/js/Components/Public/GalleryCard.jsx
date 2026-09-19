import React from 'react';
import { Link } from '@inertiajs/react';
import { Image as ImageIcon, ArrowRight } from 'lucide-react';

export default function GalleryCard({ gallery }) {
    if (!gallery) return null;

    const fallbackImage = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80';

    return (
        <div className="group bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs hover-lift transition-all duration-300 flex flex-col h-full">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                    src={gallery.cover_image || fallbackImage}
                    alt={gallery.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-semibold inline-flex items-center gap-1.5">
                        Lihat Album <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                </div>
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/75 text-white backdrop-blur-xs">
                    <ImageIcon className="w-3.5 h-3.5" />
                    {gallery.images_count || 0} Foto
                </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        <Link href={`/galeri/${gallery.slug}`}>{gallery.title}</Link>
                    </h4>
                    {gallery.description && (
                        <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                            {gallery.description}
                        </p>
                    )}
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100">
                    <Link
                        href={`/galeri/${gallery.slug}`}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                        Buka Album
                    </Link>
                </div>
            </div>
        </div>
    );
}
