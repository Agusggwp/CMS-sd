import React from 'react';
import { User, Award, BookOpen, GraduationCap } from 'lucide-react';

export default function TeacherCard({ teacher }) {
    if (!teacher) return null;

    const fallbackPhoto = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80';

    return (
        <div className="group relative bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-xl hover:border-blue-300/80 hover-lift transition-all duration-300 flex flex-col items-center text-center">
            {/* Top decorative gradient banner */}
            <div className="w-full h-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 relative opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-white/10" />
            </div>

            {/* Photo Avatar overlapping the banner */}
            <div className="relative -mt-10 mb-3">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white p-1 shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform duration-300 ring-2 ring-white">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                        {teacher.photo ? (
                            <img
                                src={teacher.photo}
                                alt={teacher.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-600">
                                <User className="w-10 h-10 stroke-[1.5]" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Teacher Details */}
            <div className="p-5 pt-0 flex flex-col flex-1 items-center w-full">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-1.5">
                    {teacher.name}
                </h4>

                <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50/90 border border-blue-200/70 px-3 py-0.5 rounded-full mb-2">
                    {teacher.position}
                </span>

                {teacher.subject && (
                    <p className="text-xs text-slate-600 mb-2 flex items-center justify-center gap-1.5 font-medium">
                        <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                        <span>{teacher.subject}</span>
                    </p>
                )}

                {teacher.nip && (
                    <p className="text-[11px] text-slate-400 font-mono tracking-wider mb-2">
                        NIP. {teacher.nip}
                    </p>
                )}

                {teacher.bio && (
                    <p className="mt-2 pt-3 border-t border-slate-100 text-xs text-slate-500 line-clamp-2 leading-relaxed w-full">
                        {teacher.bio}
                    </p>
                )}
            </div>
        </div>
    );
}

