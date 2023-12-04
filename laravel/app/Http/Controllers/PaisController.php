<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pais;  

class PaisController extends Controller
{
    public function obtenerPaises(){
        $paises = Pais::all();
        return response()->json(['paises' => $paises]);
    }
}
