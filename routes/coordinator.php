<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:Coordinator'])
    ->prefix('coordinator')
    ->name('coordinator.')
    ->group(function () {

        //
    });