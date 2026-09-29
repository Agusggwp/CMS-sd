<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add submission status to teachers table
        Schema::table('teachers', function (Blueprint $table) {
            $table->enum('submission_status', ['pending', 'approved', 'rejected'])
                  ->default('approved')
                  ->after('is_active');
            $table->text('rejection_reason')->nullable()->after('submission_status');
            $table->string('email')->nullable()->after('bio');
            $table->string('phone')->nullable()->after('email');
            $table->boolean('is_self_submitted')->default(false)->after('rejection_reason');
        });

        // Create teacher form settings table
        Schema::create('teacher_form_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_open')->default(true);
            $table->string('title')->default('Form Pengisian Data Guru');
            $table->text('description')->nullable();
            $table->text('closed_message')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::table('teachers', function (Blueprint $table) {
            $table->dropColumn(['submission_status', 'rejection_reason', 'email', 'phone', 'is_self_submitted']);
        });

        Schema::dropIfExists('teacher_form_settings');
    }
};
