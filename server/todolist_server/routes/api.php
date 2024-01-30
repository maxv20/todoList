<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoItemController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/todoItems', [TodoItemController::class, 'index']);

Route::prefix('/todoItem')->group(function () {
        Route::post('/store', [TodoItemController::class, 'store']);
        Route::put('/{id}', [TodoItemController::class, 'update']);
        Route::delete('/{id}', [TodoItemController::class, 'destroy']);
    }
);	