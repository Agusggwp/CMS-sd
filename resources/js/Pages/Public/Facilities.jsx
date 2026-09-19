import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/Public/PageHeader';
import FacilityCard from '@/Components/Public/FacilityCard';
import Reveal from '@/Components/UI/Reveal';

export default function Facilities({ facilities = [] }) {
    return (
        <PublicLayout
            title="Fasilitas Sekolah"
            description="Sarana dan prasarana penunjang kegiatan belajar mengajar yang lengkap dan modern."
        >
            <PageHeader
                badge="Sarana & Prasarana"
                title="Fasilitas Penunjang Belajar"
                description="Lingkungan belajar representatif untuk menunjang aktivitas kognitif, fisik, dan pembentukan karakter anak."
            />

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facilities.map((item, idx) => (
                            <Reveal key={item.id} direction="up" delay={idx * 80}>
                                <FacilityCard facility={item} />
                            </Reveal>
                        ))}
                    </div>

                    {facilities.length === 0 && (
                        <div className="text-center py-16 text-slate-400 text-sm animate-fade-in">
                            Belum ada data fasilitas yang ditambahkan.
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
