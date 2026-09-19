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

    protected static function booted()
    {
        static::saved(fn () => Cache::forget('school_settings_all'));
        static::deleted(fn () => Cache::forget('school_settings_all'));
    }
}
