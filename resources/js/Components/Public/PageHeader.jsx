import React from 'react';
import { Sparkles } from 'lucide-react';

export default function PageHeader({
    badge,
    title,
    description,
    children,
    className = '',
}) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            <div className={`bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center shadow-xl relative overflow-hidden ${className}`}>
                {/* Decorative background glows */}
                <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none animate-float" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none animate-float-reverse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 bg-blue-600/10 blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto">
                    {badge && (
                        <div className="mb-3.5 animate-fade-in-down">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-slate-800/90 border border-slate-700/80 px-4 py-1.5 rounded-full text-amber-300 shadow-md backdrop-blur-md">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                <span>{badge}</span>
                            </span>
                        </div>
                    )}
                    {title && (
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white animate-fade-in-up leading-tight">
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p className="mt-3 text-sm sm:text-base text-slate-300/90 max-w-2xl mx-auto animate-fade-in-up delay-100 leading-relaxed font-normal">
                            {description}
                        </p>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
}

