import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export default function Dialog({
    isOpen,
    onClose,
    onConfirm,
    title = 'Konfirmasi',
    message = 'Apakah Anda yakin ingin melanjutkan tindakan ini?',
    confirmText = 'Ya, Lanjutkan',
    cancelText = 'Batal',
    type = 'danger',
    processing = false,
}) {
    const iconMap = {
        danger: <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3"><AlertTriangle className="w-6 h-6" /></div>,
        warning: <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3"><AlertTriangle className="w-6 h-6" /></div>,
        info: <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3"><Info className="w-6 h-6" /></div>,
        success: <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3"><CheckCircle2 className="w-6 h-6" /></div>,
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
            <div className="text-center py-2">
                {iconMap[type]}
                <p className="text-sm text-slate-600 mb-6">{message}</p>
                <div className="flex items-center justify-center gap-3">
                    <Button variant="outline" onClick={onClose} disabled={processing}>
                        {cancelText}
                    </Button>
                    <Button
                        variant={type === 'danger' ? 'danger' : 'primary'}
                        onClick={onConfirm}
                        processing={processing}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
