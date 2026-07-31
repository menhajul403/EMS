<?php

use App\Http\Controllers\SuperAdmin\UniversityController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:Super Admin'])
    ->prefix('super-admin')
    ->name('super-admin.')
    ->group(function () {

        Route::resource('universities', UniversityController::class);

    });