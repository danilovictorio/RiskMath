<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PreguntaController;
use App\Http\Controllers\PaisController;
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
//Rutas de Preguntas con las respuestas
Route::get('/mostrar-preguntas', [PreguntaController::class, 'mostrarPreguntas']);
Route::post('/verificar-respuesta', [PreguntaController::class, 'verificarRespuesta']);

//Rutas de paisos
Route::get('/paises', [PaisController::class, 'obtenerPaises']);
Route::post('/atacar', [TuControlador::class, 'atacar'])->name('atacar');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
