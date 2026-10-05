import React from 'react';
import Navbar from '@/Components/Public/Navbar';
import Footer from '@/Components/Public/Footer';
import Toast from '@/Components/UI/Toast';
import SEO from '@/Components/Public/SEO';
import LocationTracker from '@/Components/Public/LocationTracker';

export default function PublicLayout({
    children,
    title,
    description,
    keywords,
    image,
    type = 'website',
    canonical,
    article = null,
    breadcrumbs = null,
    noindex = false,
}) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
            <SEO
                title={title}
                description={description}
                keywords={keywords}
                image={image}
                type={type}
                canonical={canonical}
                article={article}
                breadcrumbs={breadcrumbs}
                noindex={noindex}
            />

            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <Footer />

            <Toast />
            <LocationTracker />
        </div>
    );
}
