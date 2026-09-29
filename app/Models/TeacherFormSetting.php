<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherFormSetting extends Model
{
    use HasFactory;

    protected $table = 'teacher_form_settings';

    protected $fillable = [
        'is_open',
        'title',
        'description',
        'closed_message',
    ];

    protected $casts = [
        'is_open' => 'boolean',
    ];

    /**
     * Get the current form setting (singleton pattern).
     */
    public static function current(): self
    {
        $setting = self::first();

        if (!$setting) {
            $setting = self::create([
                'is_open'        => true,
                'title'          => 'Form Pengisian Data Guru',
                'description'    => 'Silakan isi data Anda dengan lengkap dan benar. Data Anda akan ditampilkan setelah disetujui oleh admin.',
                'closed_message' => 'Mohon maaf, form pengisian data guru saat ini sedang ditutup. Silakan hubungi admin untuk informasi lebih lanjut.',
            ]);
        }

        return $setting;
    }
}
