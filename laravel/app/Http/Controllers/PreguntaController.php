<?php

namespace App\Http\Controllers;
use App\Models\Pregunta;
use Illuminate\Http\Request;

class PreguntaController extends Controller
{
    public function mostrarPregunta($id)
    {
        $pregunta = Pregunta::findOrFail($id);

        return view('pregunta.mostrar', ['pregunta' => $pregunta]);
}
}