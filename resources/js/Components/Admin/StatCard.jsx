import React from 'react';

export default function StatCard({
    title,
    value,
    icon: Icon,
    color = 'blue',
    trend,
    className = '',
}) {
    const colorStyles = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        amber: 'bg-amber-50 text-amber-600 border-amber-100',
        purple: 'bg-purple-50 text-purple-600 border-purple-100',
        rose: 'bg-rose-50 text-rose-600 border-rose-100',
        teal: 'bg-teal-50 text-teal-600 border-teal-100',
    };

    return (
        <div
            className={`bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-xs transition-shadow ${className}`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
                        {title}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5 leading-none">
                        {value}
                    </h3>
                </div>
                {Icon && (
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                            colorStyles[color] || colorStyles.blue
                        }`}
                    >
                        <Icon className="w-6 h-6 stroke-[1.75]" />
                    </div>
                )}
            </div>
            {trend && (
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1">
                    {trend}
                </div>
            )}
        </div>
    );
}
