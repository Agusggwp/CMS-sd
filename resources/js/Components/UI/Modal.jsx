import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = 'max-w-lg',
}) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 text-center flex items-center justify-center">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
                    onClick={onClose}
                />

                {/* Modal box */}
                <div
                    className={`relative bg-white rounded-2xl p-6 text-left shadow-2xl transform transition-all w-full ${maxWidth} my-8 z-10 border border-slate-100`}
                >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
}
