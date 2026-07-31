<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Welcome');
});

require __DIR__.'/auth.php';

require __DIR__.'/super-admin.php';
require __DIR__.'/university-admin.php';
require __DIR__.'/coordinator.php';
require __DIR__.'/faculty.php';
require __DIR__.'/student.php';