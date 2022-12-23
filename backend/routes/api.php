<?php

use App\Http\Controllers\Api\Customer\CustomerController;
use App\Http\Controllers\Api\User\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::group(['as' => 'api.', 'middleware' => ['auth:sanctum', 'ability:user', 'json.response']], function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);

    // Customers
    Route::apiResource('customers', CustomerController::class);
});
