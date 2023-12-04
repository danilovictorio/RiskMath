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


    public function confirmarAtaque(Request $request){
    $idPais = $request->paisSeleccionado; // Cambia 'nombre' por el nombre del campo que contiene el ID del país en la solicitud

    // Recuperar el país por su ID
    $pais = Pais::find($idPais);

    if (!$pais) {
        return response()->json(['error' => 'País no encontrado'], 404);
    }

    $idUser = $request->idUser;

    // Actualizar el campo 'ocupante' con el ID del usuario
    $pais->ocupante = $idUser;
    $pais->save();

    return response()->json(['message' => 'Ataque confirmado con éxito']);
    }

}
