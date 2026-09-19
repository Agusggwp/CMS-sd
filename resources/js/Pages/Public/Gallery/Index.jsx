import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/Public/PageHeader';
import GalleryCard from '@/Components/Public/GalleryCard';
import Pagination from '@/Components/UI/Pagination';

export default function Index({ galleries = { data: [] } }) {
    return (
        <PublicLayout
            title="Galeri Dokumentasi"
            description="Dokumentasi foto kegiatan belajar mengajar, lomba, dan pembiasaan karakter sekolah."
        >
            <PageHeader
                badge="Dokumentasi Visual"
                title="Galeri Kegiatan Siswa"
                description="Momen-momen berharga dan keceriaan siswa dalam berbagai aktivitas sekolah."
            />

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleries.data.map((item) => (
                            <GalleryCard key={item.id} gallery={item} />
                        ))}
                    </div>

                    {galleries.data.length === 0 && (
                        <div className="text-center py-16 text-slate-400 text-sm">
                            Belum ada album foto yang dipublikasikan.
                        </div>
                    )}

                    <Pagination links={galleries.links} className="mt-12" />
                </div>
            </section>
        </PublicLayout>
    );
}
