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

    // public function verificarRespuesta($request)
    // {
    //     $preguntaId = $request->input('preguntaId');
    //     $respuestaUsuario = $request->input('respuestaUsuario');

    //     $pregunta = Pregunta::find($preguntaId);
    //     $respuestaCorrecta = $pregunta->respuesta_correcta;
    //     $esCorrecta = $respuestaUsuario === $respuestaCorrecta;

    //     return response()->json(['success' => $esCorrecta]);
    // }


     public function verificarRespuesta(Request $request){

        
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