import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import Button from '@/Components/UI/Button';

export default function PageHeader({
    title,
    description,
    actionLabel,
    actionHref,
    actionIcon: ActionIcon,
    onAction,
    backHref,
    children,
}) {
    return (
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-200/80">
            <div>
                {backHref && (
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 mb-2 transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Kembali</span>
                    </Link>
                )}
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {title}
                </h1>
                {description && (
                    <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-3xl">
                        {description}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
                {children}
                {(actionLabel && (actionHref || onAction)) && (
                    <Button
                        href={actionHref}
                        onClick={onAction}
                        variant="primary"
                        size="md"
                    >
                        {ActionIcon && <ActionIcon className="w-4 h-4" />}
                        <span>{actionLabel}</span>
                    </Button>
                )}
            </div>
        </div>
    );
}
