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
            $routeTitles = [
                'profil' => 'Profil SDN 4 Sebatu | Sekolah Dasar Sebatu Tegallalang',
                'visi-misi' => 'Visi & Misi SDN 4 Sebatu | Tujuan Pendidikan SD Sebatu',
                'guru' => 'Guru & Tenaga Kependidikan | SDN 4 Sebatu',
                'berita' => 'Berita & Kegiatan | SDN 4 Sebatu',
                'prestasi' => 'Prestasi Siswa & Sekolah | SDN 4 Sebatu',
                'galeri' => 'Galeri Kegiatan | SDN 4 Sebatu',
                'fasilitas' => 'Fasilitas & Sarana Prasarana | SDN 4 Sebatu',
                'kontak' => 'Kontak & Lokasi | SDN 4 Sebatu',
                'ppdb' => 'PPDB SDN 4 Sebatu | Pendaftaran Siswa Baru SD Sebatu',
                'pengumuman' => 'Pengumuman Resmi | SDN 4 Sebatu',
                'agenda' => 'Agenda & Kegiatan Sekolah | SDN 4 Sebatu',
                'dokumen' => 'Dokumen & Informasi Publik | SDN 4 Sebatu',
            ];

            $currentPath = request()->path();
            $metaTitle = $routeTitles[$currentPath] ?? ($schoolSettings['meta_title'] ?? 'SDN 4 Sebatu | SD Negeri di Sebatu, Tegallalang, Gianyar');
            $metaDesc = $schoolSettings['meta_description'] ?? 'SDN 4 Sebatu merupakan sekolah dasar negeri di Sebatu, Tegallalang, Gianyar, Bali yang menyediakan informasi profil sekolah, kegiatan, berita, prestasi, guru, dan informasi pendidikan.';
            $metaKeywords = $schoolSettings['meta_keywords'] ?? 'SDN 4 Sebatu, SD 4 Sebatu, SD Sebatu, SD Tegallalang, SD Negeri 4 Sebatu, sekolah dasar Sebatu, sekolah di Sebatu, SD negeri di Sebatu, SD di Tegallalang, sekolah dasar Tegallalang, sekolah negeri Tegallalang, SDN Sebatu, SD Sebatu Tegallalang, pendidikan Sebatu, sekolah dasar Gianyar, SD negeri Gianyar, sekolah dasar di Gianyar Bali, SD Negeri 4 Sebatu Tegallalang, SDN 4 Sebatu Tegallalang Gianyar, alamat SDN 4 Sebatu, profil SDN 4 Sebatu, informasi SDN 4 Sebatu, SD 4 Sebatu Gianyar, SD Sebatu Gianyar Bali';

            // Canonical & Absolute URL
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
        
        <!-- Regional & Geographic Directives (Local SEO Bali) -->
        <meta name="language" content="id">
        <meta name="geo.region" content="ID-BA">
        <meta name="geo.placename" content="Sebatu, Tegallalang, Gianyar, Bali">
        <meta name="geo.position" content="-8.4239;115.2816">
        <meta name="ICBM" content="-8.4239, 115.2816">
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

        <!-- Resource Hints: DNS Prefetch & Preconnect for Fast Connection -->
        <link rel="dns-prefetch" href="https://fonts.googleapis.com">
        <link rel="dns-prefetch" href="https://fonts.gstatic.com">
        <link rel="dns-prefetch" href="https://images.unsplash.com">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

        <!-- Optimized Non-Blocking Google Fonts (FCP & Speed Index Boost) -->
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" media="print" onload="this.media='all'">
        <noscript>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
        </noscript>

        <!-- Preload LCP Image on Homepage -->
        @if(request()->is('/') || request()->path() === '/')
            <link rel="preload" as="image" href="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80" fetchpriority="high">
        @endif

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased text-slate-800 h-full selection:bg-blue-600 selection:text-white">
        @inertia
    </body>
</html>
