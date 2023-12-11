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

    public function removeUser($nom)
    {
        $usuario = User::where('name', $nom)->first();

        if ($usuario) {
            $usuario->delete();
            return response()->json(['mensaje' => 'Usuario eliminado correctamente']);
        } else {
            return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
        }
    }

    public function updateUser($nom, Request $request)
    {
        $usuario = User::where('name', $nom)->first();

        if ($usuario) {
            $usuario->update([
                'loggedIn' => $request->input('loggedIn')
            ]);

            return response()->json(['mensaje' => 'Estado de conexión actualizado correctamente']);
        } else {
            return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
        }
    }
}
