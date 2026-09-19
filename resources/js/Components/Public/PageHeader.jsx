import React from 'react';

export default function PageHeader({
    badge,
    title,
    description,
    children,
    className = '',
}) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            <div className={`bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl text-white py-12 sm:py-14 px-4 sm:px-6 lg:px-8 text-center shadow-lg relative overflow-hidden ${className}`}>
                {/* Decorative background glows */}
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-500/15 blur-3xl pointer-events-none animate-float" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-amber-500/15 blur-3xl pointer-events-none animate-float-reverse" />

                <div className="relative z-10 max-w-3xl mx-auto">
                    {badge && (
                        <div className="mb-3 animate-fade-in-down">
                            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-slate-800 border border-slate-700 px-3.5 py-1 rounded-full text-amber-400 shadow-2xs">
                                {badge}
                            </span>
                        </div>
                    )}
                    {title && (
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white animate-fade-in-up">
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto animate-fade-in-up delay-100">
                            {description}
                        </p>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
}
