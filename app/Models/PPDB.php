<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PPDB extends Model
{
    use HasFactory;

    protected $table = 'ppdb';

    protected $fillable = [
        'title',
        'academic_year',
        'description',
        'requirements',
        'schedule',
        'contact_info',
        'brochure_file',
        'registration_link',
        'is_registration_open',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_registration_open' => 'boolean',
    ];
}
