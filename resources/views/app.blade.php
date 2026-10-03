<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full bg-slate-50 scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
        <!-- Primary Meta Tags -->
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
        <meta name="language" content="id">
        <meta name="geo.region" content="ID-BA">
        <meta name="geo.placename" content="Sebatu, Tegallalang, Gianyar, Bali">
        <meta name="author" content="SD Negeri 4 Sebatu">
        <meta name="theme-color" content="#2563eb">
        <meta name="msapplication-TileColor" content="#2563eb">

        <!-- Favicon / Brand Icons -->
        @php
            $favicon = \App\Models\SchoolSetting::get('favicon', '/favicon.ico');
        @endphp
        <link rel="icon" type="image/x-icon" href="{{ $favicon }}">
        <link rel="apple-touch-icon" href="{{ $favicon }}">

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
