<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'No estás registrado'], 401);
    }

    $token = $user->createToken('api_access')->plainTextToken;

    return response()->json([
        'user_id' => $user->id,
        'token' => $token,
        'role' => $user->role,
        'message' => 'Inicio de sesión exitoso'
    ], 200);
}
public function register(Request $request)
{
    $request->validate([
        'name' => 'required|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:3',
        'role' => 'nullable|in:user,admin',
    ]);

    $role = $request->input('role', 'user');

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => $role,
    ]);

    $token = $user->createToken('api_access')->plainTextToken;

    return response()->json([
        'user' => $user,
        'token' => $token,
        'message' => 'Usuario registrado con éxito',
        'role' => $role,
    ], 201);
}

}
