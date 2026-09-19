<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. School Settings
        Schema::create('school_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->longText('value')->nullable();
            $table->string('group')->default('general');
            $table->timestamps();
        });

        // 2. News Categories
        Schema::create('news_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // 3. News
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('news_categories')->nullOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable();
            $table->longText('content');
            $table->string('image')->nullable();
            $table->enum('status', ['draft', 'published'])->default('published');
            $table->unsignedBigInteger('views')->default(0);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        // 4. Announcements
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content');
            $table->string('file')->nullable();
            $table->boolean('is_active')->default(true);
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->timestamps();
        });

        // 5. Events / Agenda
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('description');
            $table->string('location')->nullable();
            $table->dateTime('start_date');
            $table->dateTime('end_date')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // 6. Teachers & Staff
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nip')->nullable();
            $table->string('position');
            $table->string('subject')->nullable();
            $table->text('bio')->nullable();
            $table->string('photo')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 7. Galleries
        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('cover_image')->nullable();
            $table->timestamps();
        });

        // 8. Gallery Images
        Schema::create('gallery_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gallery_id')->constrained('galleries')->cascadeOnDelete();
            $table->string('image');
            $table->string('caption')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // 9. Achievements
        Schema::create('achievements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category')->nullable();
            $table->string('level'); // Kecamatan, Kabupaten, Provinsi, Nasional, Internasional
            $table->string('year', 10);
            $table->string('rank')->nullable(); // Juara 1, dll
            $table->string('participant')->nullable(); // Nama murid/tim
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // 10. Facilities
        Schema::create('facilities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('icon')->nullable();
            $table->timestamps();
        });

        // 11. PPDB (Penerimaan Peserta Didik Baru)
        Schema::create('ppdb', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('academic_year');
            $table->longText('description')->nullable();
            $table->longText('requirements')->nullable();
            $table->longText('schedule')->nullable();
            $table->text('contact_info')->nullable();
            $table->string('brochure_file')->nullable();
            $table->string('registration_link')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 12. Documents
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('file');
            $table->string('type', 20)->nullable();
            $table->string('size', 50)->nullable();
            $table->unsignedBigInteger('download_count')->default(0);
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // 13. Pages (Static/Custom CMS Pages)
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content');
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        // 14. Menus
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('menus')->nullOnDelete();
            $table->string('label');
            $table->string('url');
            $table->integer('order')->default(0);
            $table->string('location')->default('header'); // header, footer
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 15. Media
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('filename');
            $table->string('path');
            $table->string('type', 50)->nullable();
            $table->unsignedBigInteger('size')->default(0);
            $table->string('alt')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
        Schema::dropIfExists('menus');
        Schema::dropIfExists('pages');
        Schema::dropIfExists('documents');
        Schema::dropIfExists('ppdb');
        Schema::dropIfExists('facilities');
        Schema::dropIfExists('achievements');
        Schema::dropIfExists('gallery_images');
        Schema::dropIfExists('galleries');
        Schema::dropIfExists('teachers');
        Schema::dropIfExists('events');
        Schema::dropIfExists('announcements');
        Schema::dropIfExists('news');
        Schema::dropIfExists('news_categories');
        Schema::dropIfExists('school_settings');
    }
};
