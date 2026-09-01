<?php

use App\Http\Controllers\CertificateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventBrowseController;
use App\Http\Controllers\EventPublicController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PublicGalleryController;
use App\Http\Controllers\ReportController;
use App\Models\Department;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\Feedback;
use App\Models\Gallery;
use App\Models\Registration;
use App\Models\Club;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $events = Event::query()
        ->with(['category', 'venue', 'department'])
        ->where('status', 'published')
        ->orderBy('start_at')
        ->take(6)
        ->get();

    $stats = [
        'events' => Event::where('status', 'published')->count(),
        'clubs' => Club::count(),
        'students' => User::whereHas('roles', fn ($q) => $q->where('name', 'Student'))->count(),
        'registrations' => Registration::where('status', '!=', 'cancelled')->count(),
        'attendance' => Registration::where('status', '!=', 'cancelled')->count()
            ? round((Registration::where('status', 'attended')->count() / Registration::where('status', '!=', 'cancelled')->count()) * 100)
            : 0,
        'satisfaction' => round(Feedback::avg('rating_overall') * 20),
        'feedback' => Feedback::count(),
    ];

    $categories = EventCategory::orderBy('name')->get(['id', 'name', 'slug']);
    $gallery = Gallery::query()->latest()->take(6)->get()
        ->map(fn (Gallery $g) => [...$g->toArray(), 'url' => asset('storage/'.$g->file_path)]);
    $feedback = Feedback::query()->with('student')->latest()->take(3)->get();

    return inertia('welcome', [
        'events' => $events,
        'stats' => $stats,
        'categories' => $categories,
        'gallery' => $gallery,
        'feedback' => $feedback,
    ]);
})->name('home');

Route::get('/events', [EventBrowseController::class, 'index'])->name('events.index');
Route::get('/events/{slug}', [EventPublicController::class, 'show'])->name('events.show');
Route::get('/gallery', [PublicGalleryController::class, 'index'])->name('gallery.index');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');
Route::get('/certificates/verify/{code}', [CertificateController::class, 'verify'])->name('certificates.verify');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::get('/certificates/{registration}/generate', [CertificateController::class, 'generate'])->name('certificates.generate');

    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.read-all');

    Route::middleware('permission:report.view')->group(function () {
        Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
        Route::get('/reports/events', [ReportController::class, 'events'])->name('reports.events');
        Route::get('/reports/registrations', [ReportController::class, 'registrations'])->name('reports.registrations');
        Route::get('/reports/registrations/export', [ReportController::class, 'exportRegistrations'])->name('reports.registrations.export');
        Route::get('/reports/events/export', [ReportController::class, 'exportEvents'])->name('reports.events.export');
    });
});

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';

require __DIR__.'/super-admin.php';
require __DIR__.'/university-admin.php';
require __DIR__.'/coordinator.php';
require __DIR__.'/faculty.php';
require __DIR__.'/student.php';
