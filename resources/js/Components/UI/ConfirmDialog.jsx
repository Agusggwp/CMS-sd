import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle, LogOut, Loader2 } from 'lucide-react';

export function ConfirmDialog({
    open,
    onOpenChange,
    title = 'Konfirmasi',
    description = 'Apakah Anda yakin ingin melanjutkan tindakan ini?',
    confirmText = 'Konfirmasi',
    cancelText = 'Batal',
    loading = false,
    loadingText = 'Memproses...',
    variant = 'destructive',
    icon: Icon = AlertTriangle,
    onConfirm,
}) {
    return (
        <Modal
            isOpen={open}
            onClose={() => !loading && onOpenChange && onOpenChange(false)}
            title={title}
            maxWidth="max-w-md"
        >
            <div className="text-center py-2">
                <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                    {description}
                </p>
                <div className="flex items-center justify-center gap-3">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange && onOpenChange(false)}
                        disabled={loading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant === 'destructive' ? 'danger' : 'primary'}
                        onClick={onConfirm}
                        disabled={loading}
                        processing={loading}
                    >
                        {loading ? loadingText : confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmDialog;
