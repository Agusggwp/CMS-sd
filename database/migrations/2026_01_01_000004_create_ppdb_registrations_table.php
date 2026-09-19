<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ppdb', function (Blueprint $table) {
            $table->boolean('is_registration_open')->default(true)->after('registration_link');
        });

        Schema::create('ppdb_registrations', function (Blueprint $table) {
            $table->id();
            $table->string('registration_number')->unique();
            $table->string('student_name');
            $table->string('nik', 20)->nullable();
            $table->enum('gender', ['L', 'P'])->default('L');
            $table->string('birth_place');
            $table->date('birth_date');
            $table->string('religion')->default('Islam');
            $table->string('previous_school')->nullable();
            $table->text('address');
            $table->string('parent_name');
            $table->string('parent_phone', 30);
            $table->string('parent_job')->nullable();
            $table->string('registration_track')->default('Zonasi');
            $table->text('notes')->nullable();
            $table->enum('status', ['pending', 'verified', 'accepted', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ppdb_registrations');
        Schema::table('ppdb', function (Blueprint $table) {
            $table->dropColumn('is_registration_open');
        });
    }
};
