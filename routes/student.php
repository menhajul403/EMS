<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:Student'])
    ->prefix('student')
    ->name('student.')
    ->group(function () {

        //
    });