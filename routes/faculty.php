<?php

use App\Http\Controllers\Faculty\EventApprovalController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:Faculty'])
    ->prefix('faculty')
    ->name('faculty.')
    ->group(function () {
        Route::get('events', [EventApprovalController::class, 'index'])->name('events.index');
        Route::post('events/{event}/approve', [EventApprovalController::class, 'approve'])->name('events.approve');
        Route::post('events/{event}/reject', [EventApprovalController::class, 'reject'])->name('events.reject');
        Route::post('events/{event}/request-changes', [EventApprovalController::class, 'requestChanges'])->name('events.request-changes');
    });
