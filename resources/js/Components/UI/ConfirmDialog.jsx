import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle, LogOut, Loader2, ShieldAlert } from 'lucide-react';

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
    const isLogout = variant === 'destructive' && Icon === LogOut;

    return (
        <Modal
            isOpen={open}
            onClose={() => !loading && onOpenChange && onOpenChange(false)}
            title=""
            maxWidth="max-w-sm"
            hideHeader
        >
            <div className="p-2">
                {/* ── Icon area ── */}
                <div className="flex flex-col items-center pt-4 pb-5">
                    <div className={`relative mb-4`}>
                        {/* Outer glow ring */}
                        <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center">
                                <Icon className="w-7 h-7 text-rose-500" />
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2 text-center">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 text-center leading-relaxed max-w-xs">
                        {description}
                    </p>

                    {/* Info box khusus logout */}
                    {isLogout && (
                        <div className="mt-4 w-full bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2.5">
                            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-700 leading-relaxed">
                                Sesi Anda akan berakhir dan Anda perlu login kembali untuk mengakses panel admin.
                            </p>
                        </div>
                    )}
                </div>

                {/* ── Divider ── */}
                <div className="border-t border-slate-100 -mx-2" />

                {/* ── Actions ── */}
                <div className="flex gap-3 pt-4 px-1 pb-1">
                    <button
                        type="button"
                        onClick={() => onOpenChange && onOpenChange(false)}
                        disabled={loading}
                        className="flex-1 py-2.5 px-4 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className={`flex-1 py-2.5 px-4 text-sm font-bold text-white rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60 ${
                            variant === 'destructive'
                                ? 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800'
                                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                        }`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                {loadingText}
                            </>
                        ) : (
                            <>
                                <Icon className="w-4 h-4" />
                                {confirmText}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmDialog;
