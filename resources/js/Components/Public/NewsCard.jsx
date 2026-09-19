import React from 'react';
import { Link } from '@inertiajs/react';
import { Calendar, Eye, ArrowRight } from 'lucide-react';

export default function NewsCard({ news, featured = false }) {
    if (!news) return null;

    const formattedDate = news.published_at
        ? new Date(news.published_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
          })
        : '';

    const fallbackImage = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80';

    return (
        <article className="group bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs hover-lift transition-all duration-300 flex flex-col h-full">
            {/* Image Box */}
            <div className="relative overflow-hidden aspect-16/10 bg-slate-100">
                <img
                    src={news.image || fallbackImage}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                {news.category && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-600/90 text-white shadow-xs backdrop-blur-xs">
                        {news.category.name}
                    </span>
                )}
            </div>

            {/* Content Box */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formattedDate}
                    </span>
                    {news.views !== undefined && (
                        <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {news.views} kali
                        </span>
                    )}
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                    <Link href={`/berita/${news.slug}`}>
                        {news.title}
                    </Link>
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                    {news.excerpt}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <Link
                        href={`/berita/${news.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:text-blue-700"
                    >
                        <span>Baca Selengkapnya</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
