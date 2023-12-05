<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; 
class UserController extends Controller
{
    public function addUser(Request $request)
    {
     
        $request->validate([
            'nombreUsuario' => 'required|string',
        ]);
    
        $nuevoUsuario = new User();
        $nuevoUsuario->name = $request->input('nombreUsuario');
      
        $nuevoUsuario->save();
    
        return response()->json(['mensaje' => 'Usuario agregado correctamente']);
    } 
    public function removeUser($name){

    $usuario = User::find($name);

    if ($usuario) {
        $usuario->delete();

        return response()->json(['mensaje' => 'Usuario eliminado correctamente']);
    } else {
        return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
    }
    }
}

    





