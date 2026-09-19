import React from 'react';
import { Link } from '@inertiajs/react';
import { Image as ImageIcon, ArrowRight, Eye } from 'lucide-react';

export default function GalleryCard({ gallery }) {
    if (!gallery) return null;

    const fallbackImage = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80';

    return (
        <div className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-xl hover:border-blue-300/80 hover-lift transition-all duration-300 flex flex-col h-full">
            {/* Image Box */}
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                    src={gallery.cover_image || fallbackImage}
                    alt={gallery.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-bold inline-flex items-center gap-1.5 bg-blue-600/90 px-3 py-1.5 rounded-xl shadow-md shadow-blue-600/30 backdrop-blur-xs">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Buka Album</span>
                    </span>
                </div>
                
                {/* Photo count pill */}
                <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-md shadow-xs border border-white/20">
                    <ImageIcon className="w-3 h-3 text-amber-400" />
                    <span>{gallery.images_count || 0} Foto</span>
                </span>
            </div>

            {/* Content Box */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        <Link href={`/galeri/${gallery.slug}`}>{gallery.title}</Link>
                    </h4>
                    {gallery.description && (
                        <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {gallery.description}
                        </p>
                    )}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                        href={`/galeri/${gallery.slug}`}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                    >
                        <span>Lihat Semua Foto</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

