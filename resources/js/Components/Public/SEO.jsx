import React from 'react';
import { Head, usePage } from '@inertiajs/react';

const DOMAIN = 'https://sdn4sebatu.sch.id';

export default function SEO({
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
    const { url, props } = usePage();
    const settings = props.school_settings || {};

    const schoolName = settings.school_name || 'SD Negeri 4 Sebatu';
    const defaultDescription = settings.meta_description || 
        'Website Resmi SD Negeri 4 Sebatu, Kecamatan Tegallalang, Kabupaten Gianyar, Bali. Menyajikan informasi profil sekolah, PPDB online, prestasi siswa, guru, agenda, dan berita terkini.';
    
    const defaultKeywords = settings.meta_keywords || 
        'SDN 4 Sebatu, SD Negeri 4 Sebatu, Sekolah Dasar Negeri 4 Sebatu, SD Sebatu Gianyar Bali, PPDB SDN 4 Sebatu, Website Resmi SDN 4 Sebatu, Sekolah Dasar Tegallalang Bali';

    // Page title logic
    const siteTitle = settings.meta_title || schoolName;
    const fullTitle = title 
        ? (title.toLowerCase() === 'beranda' || title === schoolName ? `${schoolName} - Unggul & Berkarakter` : `${title} | ${schoolName}`)
        : `${schoolName} - Website Resmi Sekolah`;

    const metaDescription = description || defaultDescription;
    const metaKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

    // Full URL & Image helper
    const currentUrl = canonical || (url ? `${DOMAIN}${url.split('?')[0]}` : DOMAIN);
    
    const resolveImageUrl = (img) => {
        if (!img) {
            return settings.school_logo ? (settings.school_logo.startsWith('http') ? settings.school_logo : `${DOMAIN}${settings.school_logo}`) : `${DOMAIN}/art.jpeg`;
        }
        if (img.startsWith('http')) return img;
        return `${DOMAIN}${img.startsWith('/') ? '' : '/'}${img}`;
    };

    const ogImage = resolveImageUrl(image || settings.school_logo);
    const logoUrl = resolveImageUrl(settings.school_logo);

    // 1. ElementarySchool / EducationalOrganization Schema
    const schoolSchema = {
        '@context': 'https://schema.org',
        '@type': 'ElementarySchool',
        '@id': `${DOMAIN}/#school`,
        name: schoolName,
        alternateName: 'SDN 4 Sebatu',
        url: DOMAIN,
        logo: logoUrl,
        image: ogImage,
        description: defaultDescription,
        telephone: settings.school_phone || '+62-812-3456-7890',
        email: settings.school_email || 'info@sdn4sebatu.sch.id',
        address: {
            '@type': 'PostalAddress',
            streetAddress: settings.school_address || 'Banjar Sebatu, Desa Sebatu',
            addressLocality: 'Kecamatan Tegallalang',
            addressRegion: 'Kabupaten Gianyar, Bali',
            postalCode: '80561',
            addressCountry: 'ID',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '-8.4124',
            longitude: '115.2891',
        },
        sameAs: [
            settings.social_facebook,
            settings.social_instagram,
            settings.social_youtube,
        ].filter(Boolean),
    };

    // 2. WebSite Schema with SearchAction
    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${DOMAIN}/#website`,
        url: DOMAIN,
        name: schoolName,
        publisher: {
            '@id': `${DOMAIN}/#school`,
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: `${DOMAIN}/berita?search={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };

    // 3. Breadcrumbs Schema
    let breadcrumbSchema = null;
    if (breadcrumbs && breadcrumbs.length > 0) {
        breadcrumbSchema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Beranda',
                    item: DOMAIN,
                },
                ...breadcrumbs.map((b, idx) => ({
                    '@type': 'ListItem',
                    position: idx + 2,
                    name: b.name,
                    item: b.url.startsWith('http') ? b.url : `${DOMAIN}${b.url}`,
                })),
            ],
        };
    }

    // 4. NewsArticle Schema
    let articleSchema = null;
    if (type === 'article' && article) {
        articleSchema = {
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': currentUrl,
            },
            headline: article.title,
            description: article.excerpt || metaDescription,
            image: [ogImage],
            datePublished: article.published_at || article.created_at,
            dateModified: article.updated_at || article.published_at || article.created_at,
            author: {
                '@type': 'Person',
                name: article.author?.name || schoolName,
            },
            publisher: {
                '@type': 'Organization',
                name: schoolName,
                logo: {
                    '@type': 'ImageObject',
                    url: logoUrl,
                },
            },
            articleSection: article.category?.name || 'Berita Sekolah',
        };
    }

    return (
        <Head>
            {/* Primary Page Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={currentUrl} />

            {/* Robots Directives */}
            {noindex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            )}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content={schoolName} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:alt" content={fullTitle} />
            <meta property="og:locale" content="id_ID" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:image:alt" content={fullTitle} />

            {/* Article Specific Open Graph */}
            {type === 'article' && article && (
                <>
                    {article.published_at && (
                        <meta property="article:published_time" content={new Date(article.published_at).toISOString()} />
                    )}
                    {article.updated_at && (
                        <meta property="article:modified_time" content={new Date(article.updated_at).toISOString()} />
                    )}
                    {article.author?.name && (
                        <meta property="article:author" content={article.author.name} />
                    )}
                    {article.category?.name && (
                        <meta property="article:section" content={article.category.name} />
                    )}
                </>
            )}

            {/* Structured Data: JSON-LD Schemas */}
            <script type="application/ld+json">
                {JSON.stringify(schoolSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(websiteSchema)}
            </script>
            {breadcrumbSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}
            {articleSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
                </script>
            )}
        </Head>
    );
}
