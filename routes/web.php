<?php

use Illuminate\Support\Facades\Route;

use App\Models\Event;

Route::get('/', function () {
    $events = Event::where('status', 'published')->orderBy('start_at','asc')->take(6)->get();

    return inertia('welcome', [
        'events' => $events,
    ]);
})->name('home');

// Temporary dashboard route: redirect to home until role dashboards are implemented
Route::get('/dashboard', function () {
    return redirect()->route('home');
})->name('dashboard');

Route::get('/events/{slug}', [App\Http\Controllers\EventPublicController::class, 'show'])->name('events.show');
Route::get('/certificates/verify/{code}', [App\Http\Controllers\CertificateController::class, 'verify'])->name('certificates.verify');

Route::middleware(['auth'])->group(function () {
    Route::get('/certificates/{registration}/generate', [App\Http\Controllers\CertificateController::class, 'generate'])->name('certificates.generate');
});

require __DIR__.'/auth.php';

require __DIR__.'/super-admin.php';
require __DIR__.'/university-admin.php';
require __DIR__.'/coordinator.php';
require __DIR__.'/faculty.php';
require __DIR__.'/student.php';