<?php

use App\Http\Controllers\Student\FeedbackController;
use App\Http\Controllers\Student\RegistrationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:Student'])
    ->prefix('student')
    ->name('student.')
    ->group(function () {
        Route::get('registrations', [RegistrationController::class, 'index'])->name('registrations.index');
        Route::get('registrations/{registration}/qr', [RegistrationController::class, 'showQr'])->name('registrations.qr');
        Route::post('events/{event}/register', [RegistrationController::class, 'store'])->name('events.register');
        Route::delete('events/{event}/cancel', [RegistrationController::class, 'destroy'])->name('events.cancel');

        Route::get('feedback', [FeedbackController::class, 'index'])->name('feedback.index');
        Route::get('feedback/{registration}/create', [FeedbackController::class, 'create'])->name('feedback.create');
        Route::post('feedback/{registration}', [FeedbackController::class, 'store'])->name('feedback.store');
    });
