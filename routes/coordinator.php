<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:Coordinator'])
    ->prefix('coordinator')
    ->name('coordinator.')
    ->group(function () {
        Route::resource('events', App\Http\Controllers\Coordinator\EventController::class);
        Route::post('attendances/scan', [App\Http\Controllers\Coordinator\AttendanceController::class, 'scan'])->name('attendances.scan');
    });