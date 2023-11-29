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
}