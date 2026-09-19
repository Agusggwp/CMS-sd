import React from 'react';
import {
    BookOpen,
    Monitor,
    Trophy,
    HeartPulse,
    Compass,
    Trees,
    Building2,
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
        <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs hover-lift transition-all duration-300 flex flex-col h-full group">
            <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                    src={facility.image || fallbackImage}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-xs text-blue-600 flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" />
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {facility.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {facility.description}
                </p>
            </div>
        </div>
    );
}
