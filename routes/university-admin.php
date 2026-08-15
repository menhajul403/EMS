<?php

use App\Http\Controllers\University\DepartmentController;
use App\Http\Controllers\University\EventCategoryController;
use App\Http\Controllers\University\VenueController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:University Admin'])
    ->prefix('university')
    ->name('university.')
    ->group(function () {
        Route::get('categories', [EventCategoryController::class, 'index'])->name('categories.index');
        Route::post('categories', [EventCategoryController::class, 'store'])->name('categories.store');
        Route::put('categories/{category}', [EventCategoryController::class, 'update'])->name('categories.update');
        Route::delete('categories/{category}', [EventCategoryController::class, 'destroy'])->name('categories.destroy');

        Route::get('venues', [VenueController::class, 'index'])->name('venues.index');
        Route::post('venues', [VenueController::class, 'store'])->name('venues.store');
        Route::put('venues/{venue}', [VenueController::class, 'update'])->name('venues.update');
        Route::delete('venues/{venue}', [VenueController::class, 'destroy'])->name('venues.destroy');

        Route::get('departments', [DepartmentController::class, 'index'])->name('departments.index');
        Route::post('departments', [DepartmentController::class, 'store'])->name('departments.store');
        Route::put('departments/{department}', [DepartmentController::class, 'update'])->name('departments.update');
        Route::delete('departments/{department}', [DepartmentController::class, 'destroy'])->name('departments.destroy');
    });
