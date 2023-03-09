<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TypeCongesController;
use App\Http\Controllers\Api\TypeContratController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// header('Access-Control-Allow-Origin: *');
Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/users',UserController::class);
    Route::apiResource('/conges',TypeCongesController::class);
    Route::apiResource('/contrats',TypeContratController::class);
});

Route::middleware(['cors'])->group(function () {
Route::post('/signup', [AuthController::class, 'signup']);
});

Route::post('/login', [AuthController::class, 'login']);