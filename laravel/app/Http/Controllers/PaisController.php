<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaisController extends Controller
{
    public function obtenerPaises()
    {
        $paises = Pais::all();
        return response()->json(['paises' => $paises]);
    }
}
