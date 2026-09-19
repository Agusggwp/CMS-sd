import React from 'react';
import { Link } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

export default function Button({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    processing = false,
    disabled = false,
    href = null,
    onClick,
    ...props
}) {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-sm hover:shadow',
        secondary: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm',
        outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-blue-500 shadow-sm',
        danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-sm',
        destructive: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-sm',
        ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-400',
        amber: 'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-400 shadow-sm',
    };

    const sizes = {
        sm: 'text-xs px-3 py-1.5 gap-1.5',
        md: 'text-sm px-4 py-2 gap-2',
        lg: 'text-base px-5 py-2.5 gap-2.5',
        icon: 'p-2 w-9 h-9 flex items-center justify-center shrink-0',
    };

    const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClasses} {...props}>
                {processing && <Loader2 className="w-4 h-4 animate-spin" />}
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={combinedClasses}
            disabled={disabled || processing}
            onClick={onClick}
            {...props}
        >
            {processing && <Loader2 className="w-4 h-4 animate-spin" />}
            {children}
        </button>
    );
}
