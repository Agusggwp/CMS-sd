<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\News;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\File;
use XMLWriter;

class SitemapController extends Controller
{
    /**
     * Generate XML Sitemap for sdn4sebatu.sch.id
     */
    public function index(): Response
    {
        $xml = $this->buildSitemapXml();

        // Also save to public/sitemap.xml as a static fallback
        try {
            File::put(public_path('sitemap.xml'), $xml);
        } catch (\Throwable $e) {
            // Silently ignore write permissions in certain environments
        }

        return response($xml, 200, [
            'Content-Type' => 'text/xml; charset=UTF-8',
            'Cache-Control' => 'public, max-age=3600',
        ]);
    }

    /**
     * Build valid Sitemaps 0.9 XML string
     */
    public function buildSitemapXml(): string
    {
        $baseUrl = 'https://sdn4sebatu.sch.id';

        // Static routes
        $staticPages = [
            ['url' => '', 'priority' => '1.0', 'changefreq' => 'daily'],
            ['url' => '/profil', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => '/visi-misi', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/guru', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['url' => '/berita', 'priority' => '0.9', 'changefreq' => 'daily'],
            ['url' => '/prestasi', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['url' => '/galeri', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['url' => '/fasilitas', 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => '/ppdb', 'priority' => '0.9', 'changefreq' => 'daily'],
            ['url' => '/pengumuman', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['url' => '/agenda', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['url' => '/dokumen', 'priority' => '0.7', 'changefreq' => 'weekly'],
            ['url' => '/kontak', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ];

        // Dynamic content
        $news = News::published()->latest('updated_at')->get();
        $galleries = Gallery::with('images')->latest('updated_at')->get();

        $today = date('Y-m-d');

        $writer = new XMLWriter();
        $writer->openMemory();
        $writer->setIndent(true);
        $writer->setIndentString('  ');

        $writer->startDocument('1.0', 'UTF-8');
        $writer->startElement('urlset');
        $writer->writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        $writer->writeAttribute('xmlns:image', 'http://www.google.com/schemas/sitemap-image/1.1');

        // 1. Static Pages
        foreach ($staticPages as $page) {
            $writer->startElement('url');
            $writer->writeElement('loc', $baseUrl . $page['url']);
            $writer->writeElement('lastmod', $today);
            $writer->writeElement('changefreq', $page['changefreq']);
            $writer->writeElement('priority', $page['priority']);
            $writer->endElement();
        }

        // 2. Published News
        foreach ($news as $item) {
            $lastmod = ($item->updated_at ?? $item->published_at ?? now())->format('Y-m-d');

            $writer->startElement('url');
            $writer->writeElement('loc', $baseUrl . '/berita/' . $item->slug);
            $writer->writeElement('lastmod', $lastmod);
            $writer->writeElement('changefreq', 'weekly');
            $writer->writeElement('priority', '0.8');

            if (!empty($item->image)) {
                $imgUrl = str_starts_with($item->image, 'http') ? $item->image : $baseUrl . $item->image;
                $writer->startElement('image:image');
                $writer->writeElement('image:loc', $imgUrl);
                $writer->writeElement('image:title', $item->title);
                if (!empty($item->excerpt)) {
                    $writer->writeElement('image:caption', strip_tags($item->excerpt));
                }
                $writer->endElement(); // image:image
            }

            $writer->endElement(); // url
        }

        // 3. Galleries
        foreach ($galleries as $gal) {
            $lastmod = ($gal->updated_at ?? now())->format('Y-m-d');

            $writer->startElement('url');
            $writer->writeElement('loc', $baseUrl . '/galeri/' . $gal->slug);
            $writer->writeElement('lastmod', $lastmod);
            $writer->writeElement('changefreq', 'monthly');
            $writer->writeElement('priority', '0.7');

            if (!empty($gal->cover_image)) {
                $coverUrl = str_starts_with($gal->cover_image, 'http') ? $gal->cover_image : $baseUrl . $gal->cover_image;
                $writer->startElement('image:image');
                $writer->writeElement('image:loc', $coverUrl);
                $writer->writeElement('image:title', $gal->title);
                if (!empty($gal->description)) {
                    $writer->writeElement('image:caption', strip_tags($gal->description));
                }
                $writer->endElement(); // image:image
            }

            if ($gal->relationLoaded('images') && $gal->images) {
                foreach ($gal->images->take(5) as $img) {
                    if (!empty($img->image_path)) {
                        $imgPath = str_starts_with($img->image_path, 'http') ? $img->image_path : $baseUrl . $img->image_path;
                        $writer->startElement('image:image');
                        $writer->writeElement('image:loc', $imgPath);
                        $writer->writeElement('image:title', $img->caption ?? $gal->title);
                        $writer->endElement(); // image:image
                    }
                }
            }

            $writer->endElement(); // url
        }

        $writer->endElement(); // urlset
        $writer->endDocument();

        return $writer->outputMemory();
    }
}
