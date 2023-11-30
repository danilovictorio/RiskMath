<?php

namespace App\Http\Controllers;

use App\Models\Pregunta;
use Illuminate\Http\Request;

class PreguntaController extends Controller
{
    public function mostrarPreguntas()
    {
        $preguntas = Pregunta::all();
        return view('mostrar', ['preguntas' => $preguntas]);
    }

    public function pregunta()
    {
        $preguntas = Pregunta::all()->toArray(); 
        shuffle($preguntas); 
        $primeraPregunta = [
            "pregunta" => $preguntas[0]['pregunta'],
            "opciones" => $preguntas[0]['opciones']
        ];
        return response()->json($primeraPregunta);
    }
}
