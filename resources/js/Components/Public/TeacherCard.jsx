import React from 'react';
import { User, Award, BookOpen } from 'lucide-react';

export default function TeacherCard({ teacher }) {
    if (!teacher) return null;

    const fallbackPhoto = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80';

    return (
        <div className="group bg-white rounded-xl border border-slate-200/80 p-5 text-center shadow-2xs hover-lift transition-all duration-300 flex flex-col items-center">
            {/* Photo Avatar */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-slate-100 border-2 border-slate-100 group-hover:border-blue-500 transition-colors mb-4">
                {teacher.photo ? (
                    <img
                        src={teacher.photo}
                        alt={teacher.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-600">
                        <User className="w-12 h-12 stroke-[1.5]" />
                    </div>
                )}
            </div>

            {/* Teacher Details */}
            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                {teacher.name}
            </h4>

            <p className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full mt-1.5 mb-1">
                {teacher.position}
            </p>

            {teacher.subject && (
                <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-slate-400" />
                    <span>{teacher.subject}</span>
                </p>
            )}

            {teacher.nip && (
                <p className="text-[11px] text-slate-400 tracking-wider">
                    NIP: {teacher.nip}
                </p>
            )}

            {teacher.bio && (
                <p className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {teacher.bio}
                </p>
            )}
        </div>
    );
}
