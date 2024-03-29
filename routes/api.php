<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TypeCongesController;
use App\Http\Controllers\Api\TypeContratController;
use App\Http\Controllers\Api\DemandeCongesController;
use App\Http\Controllers\Api\PosteController;
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

Route::middleware(['cors'])->group(function () {
    Route::middleware('auth:sanctum')->group(function(){
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        Route::post('/logout', [AuthController::class, 'logout']);
    });
    Route::apiResource('/users',UserController::class);
    Route::apiResource('/conges',TypeCongesController::class);
    Route::apiResource('/contrats',TypeContratController::class);
    Route::apiResource('/dconges',DemandeCongesController::class);
    Route::apiResource('/postes',PosteController::class);


    Route::post('/login', [AuthController::class, 'login']);
    Route::get("/dcongeuser/{id}",[DemandeCongesController::class, 'showbyuser']);
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/image',[DemandeCongesController::class, 'imageStore']);
    Route::get('/count-users', [UserController::class, 'countUsers']);
    Route::get('/count-demandes', [DemandeCongesController::class, 'countDemande']);
    Route::get('/demandeschart', [DemandeCongesController::class, 'countDemandedays']);
    Route::get('/getcongebycontrat/{id}', [TypeCongesController::class, 'getcongebycontrat']);
    Route::get('/count-past-7-days/{etat?}', [DemandeCongesController::class, 'getCountForPast7Days']);
    Route::get('/count-last-mounth/{etat?}', [DemandeCongesController::class, 'getCountForLastMounth']);
    Route::get('/count-contrats', [TypeContratController::class, 'countContrat']);
    Route::get('/count-post', [PosteController::class, 'countPost']);
    Route::get('/typeconges', [TypeCongesController::class, 'getTypeCongesWithContrats']);
    Route::get('/getSuper', [DemandeCongesController::class, 'getSuper']);



});