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

 
    public function verificarRespuesta(Request $request)
    {
    $preguntaId = $request->input('pregunta_id');
    $respuestaUsuario = $request->input('respuesta_usuario');

    $pregunta = Pregunta::find($preguntaId);

    if (!$pregunta) {
        return response()->json(['mensaje' => 'Pregunta no encontrada'], 404);
    }

    $respuestaCorrecta = $pregunta->respuesta_correcta;

    $esCorrecta = ($respuestaUsuario == $respuestaCorrecta);

    return response()->json(['es_correcta' => $esCorrecta]);
    
    }

}