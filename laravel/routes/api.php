<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PreguntaController;
use App\Http\Controllers\PaisController;
use App\Http\Controllers\AtacController;
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
Route::get('/obtener-Pregunta-Aleatoria', [PreguntaController::class, 'obtenerPreguntaAleatoria']);
Route::post('/verificar-Respuesta', [PreguntaController::class, 'verificarRespuesta']);
Route::post('/enviar-atac', [AtacController::class, 'enviarAtac']);

//Rutas de paisos
Route::get('/obtenerPaises', [PaisController::class, 'obtenerPaises']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
