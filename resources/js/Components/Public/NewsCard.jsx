import React from 'react';
import { Link } from '@inertiajs/react';
import { Calendar, Eye, ArrowRight, Sparkles } from 'lucide-react';

export default function NewsCard({ news, featured = false }) {
    if (!news) return null;

    const formattedDate = news.published_at
        ? new Date(news.published_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
          })
        : '';

    const fallbackImage = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80';

    return (
        <article className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-xl hover:border-blue-300/80 hover-lift transition-all duration-300 flex flex-col h-full">
            {/* Image Box */}
            <div className="relative overflow-hidden aspect-16/10 bg-slate-100">
                <img
                    src={news.image || fallbackImage}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                {news.category && (
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 text-xs font-semibold rounded-full bg-blue-600/90 text-white shadow-md shadow-blue-600/20 backdrop-blur-md border border-white/20">
                        {news.category.name}
                    </span>
                )}
            </div>

            {/* Content Box */}
            <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3.5 text-xs text-slate-400 mb-3 font-medium">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        {formattedDate}
                    </span>
                    {news.views !== undefined && (
                        <span className="flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                            {news.views} kali dilihat
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

                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <Link
                        href={`/berita/${news.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors"
                    >
                        <span>Baca Selengkapnya</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </article>
    );
}

