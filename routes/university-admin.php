
<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:University Admin'])
    ->prefix('university')
    ->name('university.')
    ->group(function () {

        //
    });