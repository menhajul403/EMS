<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:Student'])
    ->prefix('student')
    ->name('student.')
    ->group(function () {
        Route::get('registrations', [App\Http\Controllers\Student\RegistrationController::class, 'index'])->name('registrations.index');
        Route::post('events/{event}/register', [App\Http\Controllers\Student\RegistrationController::class, 'store'])->name('events.register');
        Route::delete('events/{event}/cancel', [App\Http\Controllers\Student\RegistrationController::class, 'destroy'])->name('events.cancel');
    });