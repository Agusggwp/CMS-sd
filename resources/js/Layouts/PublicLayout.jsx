import React from 'react';
import Navbar from '@/Components/Public/Navbar';
import Footer from '@/Components/Public/Footer';
import Toast from '@/Components/UI/Toast';
import SEO from '@/Components/Public/SEO';
import CookieConsent from '@/Components/Public/CookieConsent';

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
    faq = null,
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
                faq={faq}
                noindex={noindex}
            />

            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <Footer />

            <Toast />
            <CookieConsent />
        </div>
    );
}
