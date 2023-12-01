<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pais;  

class PaisController extends Controller
{
    public function obtenerPaises()
    {
        $paises = Pais::all();
        return response()->json(['paises' => $paises]);
    }
    public function atacar(Request $request)
    {
        $nombrePais = $request->input('pais');

      
        DB::table('paises')->where('nombre', $nombrePais)->update(['ocupante' => $usuarioActual]);

      
        $pregunta = Pregunta::where('pais_relacionado', $nombrePais)->inRandomOrder()->first();

        return response()->json(['pregunta' => $pregunta]);
    }
}
