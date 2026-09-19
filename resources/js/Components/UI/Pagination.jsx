import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links = [], className = '' }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className={`flex flex-wrap items-center justify-center gap-1.5 py-4 ${className}`}>
            {links.map((link, key) => {
                // Decode HTML entities in labels like &laquo; and &raquo;
                const cleanLabel = link.label
                    .replace('&laquo; Previous', '‹ Sebelumnya')
                    .replace('Next &raquo;', 'Berikutnya ›')
                    .replace('&laquo;', '‹')
                    .replace('&raquo;', '›');

                if (link.url === null) {
                    return (
                        <span
                            key={key}
                            className="px-3 py-1.5 text-xs text-slate-400 bg-slate-50 rounded-md border border-slate-200 cursor-not-allowed select-none"
                            dangerouslySetInnerHTML={{ __html: cleanLabel }}
                        />
                    );
                }

                return (
                    <Link
                        key={key}
                        href={link.url}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                            link.active
                                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                        dangerouslySetInnerHTML={{ __html: cleanLabel }}
                    />
                );
            })}
        </div>
    );
}
