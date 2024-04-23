<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PreguntaController;
use App\Http\Controllers\PaisController;
use App\Http\Controllers\AtacController;
use App\Http\Controllers\RoomController;
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


    //Rutas de Atacs
Route::post('/enviar-atac', [AtacController::class, 'enviarAtac']);
Route::post('/cambiar-estado-ataque', [AtacController::class, 'cambiarEstadoAtaque']);

Route::post('/propietarios-paises', [PaisController::class, 'propietariosPaises']);
Route::get('/todos-paises-conquistados', [PaisController::class, 'todosPaisesConquistados']);
Route::post('/borrar-ocupantes', [PaisController::class, 'borrarOcupantes']);
Route::post('/final-confirmado', [PaisController::class, 'finalConfirmado']);


//Rutas de paisos
Route::get('/paises', [PaisController::class, 'obtenerPaises']);
Route::post('/confirmar-ataque', [PaisController::class, 'confirmarAtaque']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// routes/api.php

