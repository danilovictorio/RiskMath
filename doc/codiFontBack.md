CODI FONT DE BACK

namespace App\Http\Controllers;

use App\Models\Pregunta;
use Illuminate\Http\Request;

class PreguntaController extends Controller
{
    public function mostrarPreguntas()
    {
        $preguntas = Pregunta::all();
        return response()->json(['preguntas' => $preguntas]);
    }

    public function modificarPregunta(Request $request)
    {
        // Encuentra la pregunta en la base de datos
        $pregunta = Pregunta::find($request->id);

        // Si la pregunta no existe, devuelve un error
        if (!$pregunta) {
            return response()->json(['error' => 'Pregunta no encontrada'], 404);
        }

        // Actualiza los campos de la pregunta con los datos de la solicitud
        $pregunta->pregunta = $request->pregunta;
        $pregunta->a = $request->a;
        $pregunta->b = $request->b;
        $pregunta->c = $request->c;
        $pregunta->d = $request->d;
        $pregunta->respuesta_correcta = $request->respuesta_correcta;

        // Guarda los cambios en la base de datos
        $pregunta->save();

        // Devuelve la pregunta modificada
        return response()->json($pregunta);
    }

    public function eliminarPregunta(Request $request)
    {
        // Encuentra la pregunta en la base de datos
        $pregunta = Pregunta::find($request->id);

        // Si la pregunta no existe, devuelve un error
        if (!$pregunta) {
            return response()->json(['error' => 'Pregunta no encontrada'], 404);
        }

        // Elimina la pregunta
        $pregunta->delete();

        // Devuelve una respuesta exitosa
        return response()->json(['success' => 'Pregunta eliminada correctamente']);
    }
    public function crearPregunta(Request $request)
    {
        // Valida los datos de la solicitud
        $this->validate($request, [
            'pregunta' => 'required',
            'a' => 'required',
            'b' => 'required',
            'c' => 'required',
            'd' => 'required',
            'respuesta_correcta' => 'required'
        ]);

        // Crea una nueva pregunta con los datos de la solicitud
        $pregunta = Pregunta::create([
            'pregunta' => $request->pregunta,
            'a' => $request->a,
            'b' => $request->b,
            'c' => $request->c,
            'd' => $request->d,
            'respuesta_correcta' => $request->respuesta_correcta
        ]);

        // Devuelve la pregunta creada
        return response()->json($pregunta, 201);
    }

    public function verificarRespuesta(Request $request)
    {


        $respostaJugador = $request->respuestaUsuario;
        $pregunta = $request->preguntaId;
        $pregunta = Pregunta::find($request->preguntaId);
        if (!$pregunta) {
            return response()->json(['mensaje' => 'La pregunta no fue encontrada'], 404);
        }

        $respuesta_correcta = $pregunta->respuesta_correcta;

        if ($respostaJugador == $respuesta_correcta) {
            return response()->json(['resultado' => true]);
        } else {
            return response()->json(['resultado' => false]);
        }
    }
}
 API RUTAS
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
Route::put('/modificar-pregunta', [PreguntaController::class, 'modificarPregunta']);
Route::delete('/eliminar-pregunta', [PreguntaController::class, 'eliminarPregunta']);
Route::post('/crear-pregunta', [PreguntaController::class, 'crearPregunta']);
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
