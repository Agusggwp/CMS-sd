import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 4000);
            return () => clearTimeout(timer);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!visible || !message) return null;

    return (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-bounce-in">
            <div
                className={`p-4 rounded-xl shadow-xl flex items-start gap-3 border ${
                    type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
            >
                {type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 text-sm font-medium">{message}</div>
                <button
                    type="button"
                    onClick={() => setVisible(false)}
                    className="text-slate-400 hover:text-slate-600 p-0.5 rounded-md hover:bg-black/5"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
