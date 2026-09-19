import React from 'react';
import { FolderOpen } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
    icon: Icon = FolderOpen,
    title = 'Belum Ada Data',
    description = 'Tidak ada item yang ditemukan saat ini.',
    actionLabel,
    onAction,
    actionHref,
    className = '',
}) {
    return (
        <div className={`text-center py-12 px-4 rounded-xl border-2 border-dashed border-slate-200 bg-white ${className}`}>
            <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3.5">
                <Icon className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h4 className="text-base font-semibold text-slate-800 mb-1">{title}</h4>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-5">{description}</p>
            {(actionLabel && (onAction || actionHref)) && (
                <Button
                    size="sm"
                    onClick={onAction}
                    href={actionHref}
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
