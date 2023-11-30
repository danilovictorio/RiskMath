<?php

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

    public function verificarRespuesta($id, $resposta)
    {
        $pregunta = Pregunta::find($id);

        if (!$pregunta) {
            return response()->json(['mensaje' => 'La pregunta no fue encontrada'], 404);
        }

        $respuesta_correcta = $pregunta->respuesta_correcta;

        if ($resposta == $respuesta_correcta) {
            return response()->json(['resultado' => true]);
        } else {
            return response()->json(['resultado' => false]);
        }
    }
}
