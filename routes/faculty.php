<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:Faculty'])
    ->prefix('faculty')
    ->name('faculty.')
    ->group(function () {

        //
    });