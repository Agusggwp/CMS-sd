import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Public/Navbar';
import Footer from '@/Components/Public/Footer';
import Toast from '@/Components/UI/Toast';

export default function PublicLayout({
    children,
    title,
    description,
    image,
}) {
    const { school_settings = {} } = usePage().props;

    const defaultTitle = school_settings.school_name || 'SD Negeri Percontohan';
    const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
    const metaDescription = description || school_settings.meta_description || 'Website resmi Sekolah Dasar Negeri Percontohan. Informasi akademik, PPDB, prestasi, guru, dan fasilitas sekolah.';

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:type" content="website" />
                {image && <meta property="og:image" content={image} />}
            </Head>

            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <Footer />

            <Toast />
        </div>
    );
}
