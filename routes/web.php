<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AchievementController;
use App\Http\Controllers\Admin\AchievementController as AdminAchievementController;
use App\Http\Controllers\Admin\AnnouncementController as AdminAnnouncementController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DocumentController as AdminDocumentController;
use App\Http\Controllers\Admin\EventController as AdminEventController;
use App\Http\Controllers\Admin\FacilityController as AdminFacilityController;
use App\Http\Controllers\Admin\GalleryController as AdminGalleryController;
use App\Http\Controllers\Admin\MediaController as AdminMediaController;
use App\Http\Controllers\Admin\MenuController as AdminMenuController;
use App\Http\Controllers\Admin\NewsController as AdminNewsController;
use App\Http\Controllers\Admin\PageController as AdminPageController;
use App\Http\Controllers\Admin\PPDBController as AdminPPDBController;
use App\Http\Controllers\Admin\PPDBRegistrationController as AdminPPDBRegistrationController;
use App\Http\Controllers\Admin\SchoolSettingController;
use App\Http\Controllers\Admin\TeacherController as AdminTeacherController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PPDBController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\VisionMissionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/tentang', [AboutController::class, 'index'])->name('about');
Route::get('/visi-misi', [VisionMissionController::class, 'index'])->name('vision-mission');
Route::get('/guru', [TeacherController::class, 'index'])->name('teachers.index');
Route::get('/berita', [NewsController::class, 'index'])->name('news.index');
Route::get('/berita/{slug}', [NewsController::class, 'show'])->name('news.show');
Route::get('/pengumuman', [AnnouncementController::class, 'index'])->name('announcements.index');
Route::get('/agenda', [EventController::class, 'index'])->name('events.index');
Route::get('/galeri', [GalleryController::class, 'index'])->name('gallery.index');
Route::get('/galeri/{slug}', [GalleryController::class, 'show'])->name('gallery.show');
Route::get('/prestasi', [AchievementController::class, 'index'])->name('achievements.index');
Route::get('/fasilitas', [FacilityController::class, 'index'])->name('facilities.index');
Route::get('/ppdb', [PPDBController::class, 'index'])->name('ppdb.index');
Route::post('/ppdb/daftar', [PPDBController::class, 'store'])->name('ppdb.store');
Route::get('/dokumen', [DocumentController::class, 'index'])->name('documents.index');
Route::get('/dokumen/{document}/download', [DocumentController::class, 'download'])->name('documents.download');
Route::get('/kontak', [ContactController::class, 'index'])->name('contact.index');
Route::post('/kontak', [ContactController::class, 'submit'])->name('contact.submit');
Route::get('/search', [SearchController::class, 'index'])->name('search');
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/
Route::get('/admin/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/admin/login', [AuthController::class, 'login'])->name('login.store');
Route::post('/admin/logout', [AuthController::class, 'logout'])->name('logout');

/*
|--------------------------------------------------------------------------
| Admin CMS Routes (Protected)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // School Settings
    Route::get('/settings', [SchoolSettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SchoolSettingController::class, 'update'])->name('settings.update');

    // News & Categories
    Route::resource('news', AdminNewsController::class);
    Route::resource('categories', AdminCategoryController::class)->except(['show']);

    // Announcements & Agenda
    Route::resource('announcements', AdminAnnouncementController::class)->except(['show']);
    Route::resource('events', AdminEventController::class)->except(['show']);

    // Teachers & Staff
    Route::resource('teachers', AdminTeacherController::class)->except(['show']);

    // Galleries & Images
    Route::resource('galleries', AdminGalleryController::class)->except(['show']);
    Route::delete('gallery-images/{image}', [AdminGalleryController::class, 'destroyImage'])->name('gallery-images.destroy');

    // Achievements & Facilities
    Route::resource('achievements', AdminAchievementController::class)->except(['show']);
    Route::resource('facilities', AdminFacilityController::class)->except(['show']);

    // PPDB & Registrations
    Route::get('ppdb', [AdminPPDBController::class, 'edit'])->name('ppdb.edit');
    Route::post('ppdb', [AdminPPDBController::class, 'update'])->name('ppdb.update');
    Route::get('ppdb/pendaftar', [AdminPPDBRegistrationController::class, 'index'])->name('ppdb.registrations.index');
    Route::patch('ppdb/pendaftar/{registration}/status', [AdminPPDBRegistrationController::class, 'updateStatus'])->name('ppdb.registrations.status');
    Route::delete('ppdb/pendaftar/{registration}', [AdminPPDBRegistrationController::class, 'destroy'])->name('ppdb.registrations.destroy');

    // Documents, Pages, Menus, Media, Users
    Route::resource('documents', AdminDocumentController::class)->except(['show']);
    Route::resource('pages', AdminPageController::class)->except(['show']);
    Route::resource('menus', AdminMenuController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('media', AdminMediaController::class)->only(['index', 'store', 'destroy']);
    Route::resource('users', AdminUserController::class)->except(['show']);
});
