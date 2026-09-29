<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'nip',
        'position',
        'subject',
        'bio',
        'email',
        'phone',
        'photo',
        'order',
        'is_active',
        'submission_status',
        'rejection_reason',
        'is_self_submitted',
    ];

    protected $casts = [
        'is_active'        => 'boolean',
        'is_self_submitted' => 'boolean',
        'order'            => 'integer',
    ];
}
