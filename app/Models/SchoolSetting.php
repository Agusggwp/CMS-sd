<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class SchoolSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'group',
    ];

    /**
     * Get setting value by key with optional fallback.
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        $settings = Cache::rememberForever('school_settings_all', function () {
            return self::pluck('value', 'key')->toArray();
        });

        return $settings[$key] ?? $default;
    }

    /**
     * Set a setting value by key and clear cache.
     */
    public static function set(string $key, mixed $value, string $group = 'general'): self
    {
        $setting = self::updateOrCreate(
            ['key' => $key],
            ['value' => $value, 'group' => $group]
        );

        Cache::forget('school_settings_all');

        return $setting;
    }

    /**
     * Get all settings as key-value array.
     */
    public static function getAll(): array
    {
        return Cache::rememberForever('school_settings_all', function () {
            return self::pluck('value', 'key')->toArray();
        });
    }

    /**
     * Get all settings merged with real fallback data from the database.
     */
    public static function getMergedWithRealData(): array
    {
        $settings = self::getAll();

        // Default School Settings for SDN 4 Sebatu
        $defaults = [
            'school_name' => 'SD Negeri 4 Sebatu',
            'school_npsn' => '50101995',
            'school_accreditation' => 'B (BAN-SM)',
            'school_slogan' => 'Membentuk Generasi Cerdas, Berkarakter, Berbudaya, dan Berakhlak Mulia',
            'school_description' => 'SDN 4 Sebatu merupakan salah satu sekolah dasar negeri yang berada di wilayah Sebatu, Kecamatan Tegallalang, Kabupaten Gianyar, Bali. Menyediakan lingkungan belajar ramah anak, berakar pada kearifan lokal Bali, dan berorientasi pada Profil Pelajar Pancasila.',
            'school_address' => 'Banjar Sebatu, Desa Sebatu, Kecamatan Tegallalang, Kabupaten Gianyar, Bali 80561',
            'school_phone' => '(0361) 908-1234',
            'school_whatsapp' => '0812-3456-7890',
            'school_email' => 'info@sdn4sebatu.sch.id',
            'meta_title' => 'SDN 4 Sebatu | SD Negeri di Sebatu, Tegallalang, Gianyar',
            'meta_description' => 'SDN 4 Sebatu merupakan sekolah dasar negeri di Sebatu, Tegallalang, Gianyar, Bali yang menyajikan profil sekolah, kegiatan, berita, prestasi, guru, dan informasi pendidikan.',
            'meta_keywords' => 'SDN 4 Sebatu, SD 4 Sebatu, SD Sebatu, SD Tegallalang, SD Negeri 4 Sebatu, sekolah dasar Sebatu, sekolah di Sebatu, SD negeri di Sebatu, SD di Tegallalang, sekolah dasar Tegallalang, sekolah negeri Tegallalang, SDN Sebatu, SD Sebatu Tegallalang, pendidikan Sebatu, sekolah dasar Gianyar, SD negeri Gianyar, sekolah dasar di Gianyar Bali, SD Negeri 4 Sebatu Tegallalang, SDN 4 Sebatu Tegallalang Gianyar, alamat SDN 4 Sebatu, profil SDN 4 Sebatu, informasi SDN 4 Sebatu, SD 4 Sebatu Gianyar, SD Sebatu Gianyar Bali, sekolah dasar dekat Tegallalang',
            'school_hours_weekday' => '07.00 - 14.00 WITA',
            'school_hours_saturday' => '07.00 - 12.30 WITA',
            'school_hours_sunday' => 'Tutup',
            'principal_name' => 'I Wayan Sudiarta, S.Pd., M.Pd.',
            'principal_title' => 'Kepala Sekolah SDN 4 Sebatu',
            'principal_nip' => '19750815 200501 1 008',
            'principal_speech' => 'Om Swastyastu. Selamat datang di portal resmi SDN 4 Sebatu. Kami berkomitmen menyelenggarakan pendidikan dasar yang ramah anak, menumbuhkembangkan budi pekerti luhur, mengasah daya nalar kritis, serta melestarikan seni budaya dan kearifan lokal Bali.',
            'history_badge' => 'Sejarah & Dedikasi Sekolah',
            'history_title' => 'Mengabdi untuk Pendidikan Berkualitas di Desa Sebatu, Tegallalang',
            'history_paragraph_1' => "SDN 4 Sebatu berlokasi di Banjar Sebatu, Desa Sebatu, Kecamatan Tegallalang, Kabupaten Gianyar, Bali. Berdiri di tengah masyarakat yang menjunjung tinggi adat, budaya, dan nilai gotong royong, sekolah ini hadir sebagai pusat pembinaan generasi muda yang unggul secara akademik dan berkarakter mulia.",
            'history_paragraph_2' => "Dengan penerapan Kurikulum Merdeka dan penguatan Profil Pelajar Pancasila, SDN 4 Sebatu terus berinovasi dalam metode pembelajaran aktif, literasi, numerasi, serta pelestarian seni budaya Bali demi menyiapkan peserta didik menghadapi masa depan.",
        ];

        foreach ($defaults as $k => $v) {
            if (!isset($settings[$k]) || trim((string)$settings[$k]) === '') {
                $settings[$k] = $v;
            }
        }

        // 1. Data Riil Guru: Jika stat_teachers kosong, gunakan jumlah guru aktif di database
        try {
            $val = $settings['stat_teachers'] ?? null;
            if ($val === null || $val === '') {
                $count = Teacher::where('is_active', true)->count();
                if ($count > 0) {
                    $settings['stat_teachers'] = (string) $count;
                }
            }
        } catch (\Throwable $e) {
            // Silently continue
        }

        // 2. Data Riil Prestasi: Jika stat_achievements kosong, gunakan jumlah prestasi di database
        try {
            $val = $settings['stat_achievements'] ?? null;
            if ($val === null || $val === '') {
                $count = Achievement::count();
                if ($count > 0) {
                    $settings['stat_achievements'] = (string) $count;
                }
            }
        } catch (\Throwable $e) {
            // Silently continue
        }

        // 3. Data Riil Siswa: Jika stat_students kosong, cek jika ada data PPDB
        try {
            $val = $settings['stat_students'] ?? null;
            if ($val === null || $val === '') {
                $count = PPDBRegistration::whereIn('status', ['accepted', 'approved'])->count();
                if ($count === 0) {
                    $count = PPDBRegistration::count();
                }
                if ($count > 0) {
                    $settings['stat_students'] = $count . '+';
                }
            }
        } catch (\Throwable $e) {
            // Silently continue
        }

        // 4. Data Riil Kepala Sekolah: Jika profil kepala sekolah kosong, ambil dari data guru
        try {
            $principal = Teacher::where('is_active', true)
                ->where(function ($q) {
                    $q->where('position', 'like', '%Kepala Sekolah%')
                      ->orWhere('position', 'like', '%Kepala Satuan%');
                })
                ->first();

            if ($principal) {
                if (empty($settings['principal_name'])) {
                    $settings['principal_name'] = $principal->name;
                }
                if (empty($settings['principal_nip']) && $principal->nip) {
                    $settings['principal_nip'] = $principal->nip;
                }
                if (empty($settings['principal_photo']) && $principal->photo) {
                    $settings['principal_photo'] = $principal->photo;
                }
                if (empty($settings['principal_title'])) {
                    $settings['principal_title'] = $principal->position;
                }
            }
        } catch (\Throwable $e) {
            // Silently continue
        }

        return $settings;
    }

    protected static function booted()
    {
        static::saved(fn () => Cache::forget('school_settings_all'));
        static::deleted(fn () => Cache::forget('school_settings_all'));
    }
}
