<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\News;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Generate XML Sitemap for sdn4sebatu.sch.id
     */
    public function index(): Response
    {
        $baseUrl = 'https://sdn4sebatu.sch.id';

        // Static routes definitions with metadata
        $staticPages = [
            [
                'url' => '',
                'priority' => '1.0',
                'changefreq' => 'daily',
                'lastmod' => date('Y-m-d'),
            ],
            [
                'url' => '/berita',
                'priority' => '0.9',
                'changefreq' => 'daily',
                'lastmod' => date('Y-m-d'),
            ],
            [
                'url' => '/ppdb',
                'priority' => '0.9',
                'changefreq' => 'daily',
                'lastmod' => date('Y-m-d'),
            ],
            [
                'url' => '/tentang',
                'priority' => '0.8',
                'changefreq' => 'monthly',
                'lastmod' => date('Y-m-d'),
            ],
            [
                'url' => '/visi-misi',
                'priority' => '0.8',
                'changefreq' => 'monthly',
                'lastmod' => date('Y-m-d'),
            ],
            [
                'url' => '/guru',
                'priority' => '0.8',
                'changefreq' => 'weekly',
                'lastmod' => date('Y-m-d'),
            ],
            [
                'url' => '/pengumuman',
                'priority' => '0.8',
                'changefreq' => 'weekly',
                'lastmod' => date('Y-m-d'),
            ],
            [
                'url' => '/agenda',
                'priority' => '0.8',
                'changefreq' => 'weekly',
                'lastmod' => date('Y-m-d'),
            ],
            [
                'url' => '/prestasi',
                'priority' => '0.8',
                'changefreq' => 'weekly',
                'lastmod' => date('Y-m-d'),
            ],
            [
                'url' => '/fasilitas',
                'priority' => '0.7',
                'changefreq' => 'monthly',
                'lastmod' => date('Y-m-d'),
            ],
            [
                'url' => '/galeri',
                'priority' => '0.8',
                'changefreq' => 'weekly',
                'lastmod' => date('Y-m-d'),
            ],
            [
                'url' => '/dokumen',
                'priority' => '0.7',
                'changefreq' => 'weekly',
                'lastmod' => date('Y-m-d'),
            ],
            [
                'url' => '/kontak',
                'priority' => '0.8',
                'changefreq' => 'monthly',
                'lastmod' => date('Y-m-d'),
            ],
        ];

        // Fetch dynamic content
        $news = News::published()->latest('updated_at')->get();
        $galleries = Gallery::with('images')->latest('updated_at')->get();

        // Build XML
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' . "\n";

        // 1. Static Pages
        foreach ($staticPages as $page) {
            $xml .= "  <url>\n";
            $xml .= '    <loc>' . htmlspecialchars($baseUrl . $page['url'], ENT_XML1, 'UTF-8') . "</loc>\n";
            $xml .= '    <lastmod>' . $page['lastmod'] . "</lastmod>\n";
            $xml .= '    <changefreq>' . $page['changefreq'] . "</changefreq>\n";
            $xml .= '    <priority>' . $page['priority'] . "</priority>\n";
            $xml .= "  </url>\n";
        }

        // 2. Published News
        foreach ($news as $item) {
            $lastmod = ($item->updated_at ?? $item->published_at ?? now())->format('Y-m-d');
            $loc = $baseUrl . '/berita/' . $item->slug;

            $xml .= "  <url>\n";
            $xml .= '    <loc>' . htmlspecialchars($loc, ENT_XML1, 'UTF-8') . "</loc>\n";
            $xml .= '    <lastmod>' . $lastmod . "</lastmod>\n";
            $xml .= "    <changefreq>weekly</changefreq>\n";
            $xml .= "    <priority>0.8</priority>\n";

            if (!empty($item->image)) {
                $imgUrl = str_starts_with($item->image, 'http') ? $item->image : $baseUrl . $item->image;
                $xml .= "    <image:image>\n";
                $xml .= '      <image:loc>' . htmlspecialchars($imgUrl, ENT_XML1, 'UTF-8') . "</image:loc>\n";
                $xml .= '      <image:title>' . htmlspecialchars($item->title, ENT_XML1, 'UTF-8') . "</image:title>\n";
                if (!empty($item->excerpt)) {
                    $xml .= '      <image:caption>' . htmlspecialchars(strip_tags($item->excerpt), ENT_XML1, 'UTF-8') . "</image:caption>\n";
                }
                $xml .= "    </image:image>\n";
            }

            $xml .= "  </url>\n";
        }

        // 3. Galleries
        foreach ($galleries as $gal) {
            $lastmod = ($gal->updated_at ?? now())->format('Y-m-d');
            $loc = $baseUrl . '/galeri/' . $gal->slug;

            $xml .= "  <url>\n";
            $xml .= '    <loc>' . htmlspecialchars($loc, ENT_XML1, 'UTF-8') . "</loc>\n";
            $xml .= '    <lastmod>' . $lastmod . "</lastmod>\n";
            $xml .= "    <changefreq>monthly</changefreq>\n";
            $xml .= "    <priority>0.7</priority>\n";

            if (!empty($gal->cover_image)) {
                $coverUrl = str_starts_with($gal->cover_image, 'http') ? $gal->cover_image : $baseUrl . $gal->cover_image;
                $xml .= "    <image:image>\n";
                $xml .= '      <image:loc>' . htmlspecialchars($coverUrl, ENT_XML1, 'UTF-8') . "</image:loc>\n";
                $xml .= '      <image:title>' . htmlspecialchars($gal->title, ENT_XML1, 'UTF-8') . "</image:title>\n";
                if (!empty($gal->description)) {
                    $xml .= '      <image:caption>' . htmlspecialchars(strip_tags($gal->description), ENT_XML1, 'UTF-8') . "</image:caption>\n";
                }
                $xml .= "    </image:image>\n";
            }

            // Also include gallery images
            if ($gal->relationLoaded('images') && $gal->images) {
                foreach ($gal->images->take(5) as $img) {
                    if (!empty($img->image_path)) {
                        $imgPath = str_starts_with($img->image_path, 'http') ? $img->image_path : $baseUrl . $img->image_path;
                        $xml .= "    <image:image>\n";
                        $xml .= '      <image:loc>' . htmlspecialchars($imgPath, ENT_XML1, 'UTF-8') . "</image:loc>\n";
                        $xml .= '      <image:title>' . htmlspecialchars($img->caption ?? $gal->title, ENT_XML1, 'UTF-8') . "</image:title>\n";
                        $xml .= "    </image:image>\n";
                    }
                }
            }

            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
            'X-Robots-Tag' => 'noindex, follow',
        ]);
    }
}
