<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;  

class UserController extends Controller {
    public function obtenerUsuaris(){
        $usuaris = User::all();
        return response()->json(['usuaris' => $usuaris]);
    }

    public function nouUser(Request $request){
        $nuevoUsuario = new User();
        $nuevoUsuario->nombre = $request->input('nombre');
        $nuevoUsuario->save();

        return response()->json(['mensaje' => 'Usuario creado correctamente', 'usuario' => $nuevoUsuario]);
    }
}

