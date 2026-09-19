<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'file',
        'type',
        'size',
        'download_count',
        'description',
    ];

    protected $casts = [
        'download_count' => 'integer',
    ];
}
