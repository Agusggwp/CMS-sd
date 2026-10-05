import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cookie, MapPin, Check, X, ShieldCheck } from 'lucide-react';

/**
 * CookieConsent Component
 * Menampilkan banner cookie & privasi resmi.
 * Ketika pengguna mengklik "Izinkan Cookie & Lokasi", browser secara sah memicu permintaan izin Geolocation (User Gesture).
 * Data koordinat lokasi, IP, dan halaman dikirim ke server & Discord Webhook.
 */
export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);

    useEffect(() => {
        // Cek apakah pengunjung sudah pernah memberikan respon cookie
        const consent = localStorage.getItem('sdn4_cookie_consent');
        if (!consent) {
            // Tampilkan banner setelah jeda halus
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, []);

    const sendLog = async (payload) => {
        try {
            await axios.post('/api/visitor-log', {
                page_url: window.location.href,
                page_title: document.title || 'SDN 4 Sebatu',
                ...payload,
            }, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                },
            });
        } catch (err) {
            console.debug('Visitor log error:', err);
        }
    };

    const handleAcceptAll = () => {
        setIsRequesting(true);
        localStorage.setItem('sdn4_cookie_consent', 'accepted');

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    // Pengunjung mengizinkan akses lokasi di prompt browser
                    sendLog({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                        accuracy: pos.coords.accuracy,
                        status: 'granted',
                    });
                    setIsVisible(false);
                    setIsRequesting(false);
                },
                (err) => {
                    // Pengunjung menolak di prompt native browser atau timeout
                    const status = err.code === 1 ? 'denied' : 'unavailable';
                    sendLog({ status });
                    setIsVisible(false);
                    setIsRequesting(false);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 12000,
                    maximumAge: 0,
                }
            );
        } else {
            sendLog({ status: 'cookie_accepted' });
            setIsVisible(false);
            setIsRequesting(false);
        }
    };

    const handleDecline = () => {
        localStorage.setItem('sdn4_cookie_consent', 'declined');
        sendLog({ status: 'denied' });
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="bg-slate-900/95 backdrop-blur-md text-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-700/80 shadow-2xl shadow-slate-950/40">
                <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
                        <Cookie className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pr-6">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Privasi & Layanan Lokasi</span>
                        </div>
                        <h4 className="text-sm font-extrabold text-white mt-0.5">
                            Izinkan Cookie & Personalisasi Lokasi
                        </h4>
                    </div>
                    <button
                        type="button"
                        onClick={handleDecline}
                        className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors absolute top-4 right-4"
                        title="Tutup"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Website resmi SDN 4 Sebatu menggunakan cookie dan fitur lokasi untuk mengoptimalkan layanan informasi zonasi sekolah, rute navigasi, serta peningkatan kualitas website.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-slate-800">
                    <button
                        type="button"
                        onClick={handleAcceptAll}
                        disabled={isRequesting}
                        className="w-full sm:flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75"
                    >
                        {isRequesting ? (
                            <span>Memproses...</span>
                        ) : (
                            <>
                                <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                                <span>Izinkan & Lanjutkan</span>
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={handleDecline}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                    >
                        Tolak
                    </button>
                </div>
            </div>
        </div>
    );
}
