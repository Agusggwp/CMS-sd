import React from 'react';
import {
    BookOpen,
    Monitor,
    Trophy,
    HeartPulse,
    Compass,
    Trees,
    Building2,
    Sparkles,
} from 'lucide-react';

export default function FacilityCard({ facility }) {
    if (!facility) return null;

    const iconMap = {
        BookOpen: BookOpen,
        Monitor: Monitor,
        Trophy: Trophy,
        HeartPulse: HeartPulse,
        Compass: Compass,
        Trees: Trees,
    };

    const Icon = iconMap[facility.icon] || Building2;
    const fallbackImage = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80';

    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-xl hover:border-blue-300/80 hover-lift transition-all duration-300 flex flex-col h-full group">
            {/* Image Box */}
            <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                    src={facility.image || fallbackImage}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                {/* Floating Icon with Gradient & Glow */}
                <div className="absolute top-3.5 left-3.5 w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                </div>

                {/* Floating Pill Tag */}
                <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-slate-700 shadow-xs border border-white/60">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Fasilitas</span>
                </span>
            </div>

            {/* Content Box */}
            <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {facility.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 flex-1">
                    {facility.description}
                </p>

                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-medium text-[11px] text-blue-600/90 group-hover:text-blue-600 flex items-center gap-1 transition-colors">
                        Tersedia untuk Siswa
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
                </div>
            </div>
        </div>
    );
}

