import React from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Calendar, User, Eye, ArrowLeft, Share2, Tag } from 'lucide-react';

export default function Show({ article, relatedNews = [], categories = [] }) {
    if (!article) return null;

    const formattedDate = article.published_at
        ? new Date(article.published_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
          })
        : '';

    return (
        <PublicLayout
            title={article.title}
            description={article.excerpt}
            image={article.image}
        >
            {/* Breadcrumb Bar */}
            <div className="bg-slate-100/70 border-b border-slate-200/60 py-3.5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-slate-500">
                        <Link href="/" className="hover:text-blue-600">Beranda</Link>
                        <span>/</span>
                        <Link href="/berita" className="hover:text-blue-600">Berita</Link>
                        <span>/</span>
                        <span className="text-slate-800 font-medium truncate max-w-sm">{article.title}</span>
                    </nav>
                </div>
            </div>

            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Article (8 columns) */}
                        <article className="lg:col-span-8 space-y-6">
                            {/* Category & Date */}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                {article.category && (
                                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                                        {article.category.name}
                                    </span>
                                )}
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {formattedDate}
                                </span>
                                {article.author && (
                                    <span className="flex items-center gap-1">
                                        <User className="w-3.5 h-3.5" />
                                        Oleh: {article.author.name}
                                    </span>
                                )}
                                <span className="flex items-center gap-1">
                                    <Eye className="w-3.5 h-3.5" />
                                    {article.views} kali dilihat
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                {article.title}
                            </h1>

                            {/* Featured Image */}
                            {article.image && (
                                <div className="rounded-2xl overflow-hidden bg-slate-100 shadow-md">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full max-h-[480px] object-cover"
                                    />
                                </div>
                            )}

                            {/* Body Content */}
                            <div
                                className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 pt-4 border-t border-slate-100"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />

                            {/* Back Button */}
                            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                                <Link
                                    href="/berita"
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Kembali ke Daftar Berita</span>
                                </Link>
                            </div>
                        </article>

                        {/* Sidebar (4 columns) */}
                        <aside className="lg:col-span-4 space-y-8">
                            {/* Categories Card */}
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                                <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-blue-600" />
                                    <span>Kategori Berita</span>
                                </h3>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={`/berita?category=${cat.slug}`}
                                            className="flex items-center justify-between p-2.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-white hover:text-blue-600 transition-colors"
                                        >
                                            <span>{cat.name}</span>
                                            <span className="bg-slate-200/70 text-slate-600 px-2 py-0.5 rounded-full text-[10px]">
                                                {cat.news_count ?? 0}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Related News Card */}
                            {relatedNews.length > 0 && (
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                                    <h3 className="font-bold text-slate-900 text-sm mb-4">
                                        Berita Terkait
                                    </h3>
                                    <div className="space-y-4">
                                        {relatedNews.map((item) => (
                                            <div key={item.id} className="group">
                                                <span className="text-[11px] text-slate-400">
                                                    {item.published_at
                                                        ? new Date(item.published_at).toLocaleDateString('id-ID', {
                                                              day: 'numeric',
                                                              month: 'short',
                                                          })
                                                        : ''}
                                                </span>
                                                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 leading-snug line-clamp-2 mt-0.5">
                                                    <Link href={`/berita/${item.slug}`}>{item.title}</Link>
                                                </h4>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
