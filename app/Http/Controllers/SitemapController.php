<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\News;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $baseUrl = url('/');

        $staticPages = [
            '',
            '/tentang',
            '/visi-misi',
            '/guru',
            '/berita',
            '/pengumuman',
            '/agenda',
            '/galeri',
            '/prestasi',
            '/fasilitas',
            '/ppdb',
            '/dokumen',
            '/kontak',
        ];

        $news = News::published()->latest('updated_at')->get();
        $galleries = Gallery::latest('updated_at')->get();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        foreach ($staticPages as $page) {
            $xml .= '<url>';
            $xml .= '<loc>' . $baseUrl . $page . '</loc>';
            $xml .= '<lastmod>' . date('Y-m-d') . '</lastmod>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>' . ($page === '' ? '1.0' : '0.8') . '</priority>';
            $xml .= '</url>';
        }

        foreach ($news as $item) {
            $xml .= '<url>';
            $xml .= '<loc>' . $baseUrl . '/berita/' . $item->slug . '</loc>';
            $xml .= '<lastmod>' . $item->updated_at->format('Y-m-d') . '</lastmod>';
            $xml .= '<changefreq>monthly</changefreq>';
            $xml .= '<priority>0.7</priority>';
            $xml .= '</url>';
        }

        foreach ($galleries as $gal) {
            $xml .= '<url>';
            $xml .= '<loc>' . $baseUrl . '/galeri/' . $gal->slug . '</loc>';
            $xml .= '<lastmod>' . $gal->updated_at->format('Y-m-d') . '</lastmod>';
            $xml .= '<changefreq>monthly</changefreq>';
            $xml .= '<priority>0.6</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
