<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full bg-slate-50 scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
        @php
            $pageProps = $page['props'] ?? [];
            $schoolSettings = $pageProps['school_settings'] ?? [];
            
            $schoolName = $schoolSettings['school_name'] ?? 'SD Negeri 4 Sebatu';
            $metaTitle = $schoolSettings['meta_title'] ?? ($schoolName . ' - Portal Resmi Sekolah Dasar');
            $metaDesc = $schoolSettings['meta_description'] ?? 'Website Resmi SD Negeri 4 Sebatu, Kecamatan Tegallalang, Kabupaten Gianyar, Bali. Informasi Penerimaan Peserta Didik Baru (PPDB Online), Berita Sekolah, Guru & Staf, Prestasi Siswa, dan Agenda Kegiatan.';
            $metaKeywords = $schoolSettings['meta_keywords'] ?? 'SDN 4 Sebatu, SD Negeri 4 Sebatu, Sekolah Dasar Negeri 4 Sebatu, SD Sebatu Tegallalang Gianyar Bali, PPDB SDN 4 Sebatu, Website Resmi SDN 4 Sebatu';

            // Canonical & Absolute URL
            $currentPath = request()->path();
            $canonicalUrl = $currentPath === '/' ? 'https://sdn4sebatu.sch.id' : 'https://sdn4sebatu.sch.id/' . ltrim($currentPath, '/');
            
            // Image resolution for WhatsApp / Facebook / Telegram crawlers
            $ogImage = 'https://sdn4sebatu.sch.id/logo.png';
            if (!empty($schoolSettings['school_logo'])) {
                $ogImage = str_starts_with($schoolSettings['school_logo'], 'http')
                    ? $schoolSettings['school_logo']
                    : 'https://sdn4sebatu.sch.id/' . ltrim($schoolSettings['school_logo'], '/');
            }

            $ogType = 'website';

            // Article override if on news detail page
            if (!empty($pageProps['article'])) {
                $art = $pageProps['article'];
                $ogType = 'article';
                $metaTitle = ($art['title'] ?? 'Berita') . ' | ' . $schoolName;
                if (!empty($art['excerpt'])) {
                    $metaDesc = strip_tags($art['excerpt']);
                }
                if (!empty($art['image'])) {
                    $ogImage = str_starts_with($art['image'], 'http')
                        ? $art['image']
                        : 'https://sdn4sebatu.sch.id/' . ltrim($art['image'], '/');
                }
            } elseif (!empty($pageProps['gallery'])) {
                $gal = $pageProps['gallery'];
                $metaTitle = ($gal['title'] ?? 'Galeri') . ' | ' . $schoolName;
                if (!empty($gal['description'])) {
                    $metaDesc = strip_tags($gal['description']);
                }
                if (!empty($gal['cover_image'])) {
                    $ogImage = str_starts_with($gal['cover_image'], 'http')
                        ? $gal['cover_image']
                        : 'https://sdn4sebatu.sch.id/' . ltrim($gal['cover_image'], '/');
                }
            }
        @endphp

        <!-- Standard SEO Meta Tags -->
        <title>{{ $metaTitle }}</title>
        <meta name="title" content="{{ $metaTitle }}">
        <meta name="description" content="{{ $metaDesc }}">
        <meta name="keywords" content="{{ $metaKeywords }}">
        <meta name="author" content="{{ $schoolName }}">
        <link rel="canonical" href="{{ $canonicalUrl }}">

        <!-- Robots / Search Engine Directives -->
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
        
        <!-- Regional & Geographic Directives -->
        <meta name="language" content="id">
        <meta name="geo.region" content="ID-BA">
        <meta name="geo.placename" content="Sebatu, Tegallalang, Gianyar, Bali">
        <meta name="theme-color" content="#2563eb">
        <meta name="msapplication-TileColor" content="#2563eb">

        <!-- Open Graph / WhatsApp / Facebook / Telegram -->
        <meta property="og:site_name" content="{{ $schoolName }}">
        <meta property="og:title" content="{{ $metaTitle }}">
        <meta property="og:description" content="{{ $metaDesc }}">
        <meta property="og:url" content="{{ $canonicalUrl }}">
        <meta property="og:type" content="{{ $ogType }}">
        <meta property="og:locale" content="id_ID">
        <meta property="og:image" content="{{ $ogImage }}">
        <meta property="og:image:secure_url" content="{{ $ogImage }}">
        <meta property="og:image:type" content="image/png">
        <meta property="og:image:width" content="600">
        <meta property="og:image:height" content="600">
        <meta property="og:image:alt" content="Logo {{ $schoolName }}">

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:url" content="{{ $canonicalUrl }}">
        <meta name="twitter:title" content="{{ $metaTitle }}">
        <meta name="twitter:description" content="{{ $metaDesc }}">
        <meta name="twitter:image" content="{{ $ogImage }}">
        <meta name="twitter:image:alt" content="Logo {{ $schoolName }}">

        <!-- Favicon / Brand Icons -->
        <link rel="icon" type="image/png" href="{{ $ogImage }}">
        <link rel="apple-touch-icon" href="{{ $ogImage }}">

        <!-- Fonts & Performance Preconnect -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased text-slate-800 h-full selection:bg-blue-600 selection:text-white">
        @inertia
    </body>
</html>
