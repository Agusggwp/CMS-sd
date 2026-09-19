<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PPDBRegistration extends Model
{
    use HasFactory;

    protected $table = 'ppdb_registrations';

    protected $fillable = [
        'registration_number',
        'student_name',
        'nik',
        'gender',
        'birth_place',
        'birth_date',
        'religion',
        'previous_school',
        'address',
        'parent_name',
        'parent_phone',
        'parent_job',
        'registration_track',
        'notes',
        'status',
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];

    public static function generateRegistrationNumber(): string
    {
        $year = date('Y');
        $prefix = 'PPDB-' . $year . '-';
        $latest = static::where('registration_number', 'like', $prefix . '%')
            ->orderByDesc('id')
            ->first();

        if ($latest) {
            $lastNumber = (int) substr($latest->registration_number, strlen($prefix));
            $nextNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
        } else {
            $nextNumber = '0001';
        }

        return $prefix . $nextNumber;
    }
}
