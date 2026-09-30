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
