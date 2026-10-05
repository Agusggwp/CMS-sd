<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisitorLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip_address',
        'user_agent',
        'device',
        'browser',
        'os',
        'page_url',
        'page_title',
        'latitude',
        'longitude',
        'accuracy',
        'status',
        'city',
        'region',
        'country',
        'discord_notified',
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'accuracy' => 'float',
        'discord_notified' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
