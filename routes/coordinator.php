<?php

use App\Http\Controllers\Coordinator\AttendanceController;
use App\Http\Controllers\Coordinator\CertificateBulkController;
use App\Http\Controllers\Coordinator\EventController;
use App\Http\Controllers\Coordinator\FeedbackController;
use App\Http\Controllers\Coordinator\GalleryController;
use App\Http\Controllers\Coordinator\RegistrationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:Coordinator'])
    ->prefix('coordinator')
    ->name('coordinator.')
    ->group(function () {
        Route::resource('events', EventController::class)->except(['show']);
        Route::post('events/{event}/submit', [EventController::class, 'submit'])->name('events.submit');
        Route::post('events/{event}/publish', [EventController::class, 'publish'])->name('events.publish');
        Route::post('events/{event}/unpublish', [EventController::class, 'unpublish'])->name('events.unpublish');

        Route::get('events/{event}/registrations', [RegistrationController::class, 'index'])->name('events.registrations');
        Route::get('events/{event}/feedback', [FeedbackController::class, 'index'])->name('events.feedback');
        Route::get('events/{event}/gallery', [GalleryController::class, 'index'])->name('events.gallery');
        Route::post('events/{event}/gallery', [GalleryController::class, 'store'])->name('events.gallery.store');
        Route::delete('events/{event}/gallery/{gallery}', [GalleryController::class, 'destroy'])->name('events.gallery.destroy');

        Route::get('events/{event}/certificates', [CertificateBulkController::class, 'index'])->name('events.certificates');
        Route::post('events/{event}/certificates/generate-all', [CertificateBulkController::class, 'generateAll'])->name('events.certificates.generate-all');

        Route::get('attendance/scan', [AttendanceController::class, 'scanForm'])->name('attendance.scan');
        Route::post('attendance/scan', [AttendanceController::class, 'scan'])->name('attendance.scan.store');
    });
