<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pais;  
use Illuminate\Support\Facades\DB;


class PaisController extends Controller
{
    public function obtenerPaises()
    {
        $paises = Pais::all();
        return response()->json(['paises' => $paises]);
    }
    public function borrarOcupantes()
    {
        
            DB::table('pais')->update(['ocupante' => null]);

            return response()->json(['message' => 'Contenido del campo "ocupante" borrado con éxito']);
        
    }


    public function confirmarAtaque(Request $request){
    $idPais = $request->paisSeleccionado;
    $pais = Pais::find($idPais);

    if (!$pais) {
        return response()->json(['error' => 'País no encontrado'], 404);
    }

    $idUser = $request->idUser;
    $pais->ocupante = $idUser;
    $pais->save();

    return response()->json(['message' => 'Ataque confirmado con éxito']);
    }
    public function propietariosPaises(Request $request) {
        $arrayUsers = $request->arrayUsers;
    
        // Obtén un array plano de los usuarios
        $usuarios = array_column($arrayUsers, 'nombreUsuario');
    
        $paisesConquistados = Pais::whereIn('ocupante', $usuarios)->get();
    
        $cantidadPaisesPorUsuario = [];
    
        foreach ($arrayUsers as $usuario) {
            $cantidadPaises = $paisesConquistados->where('ocupante', $usuario['nombreUsuario'])->count();
            if ($cantidadPaises === $) {
                # code...
            }
            $cantidadPaisesPorUsuario[] = [
                'nombre' => $usuario['nombreUsuario'],
                'cantidad' => $cantidadPaises,
            ];
        }
    
        return response()->json(['ocupantes' => $cantidadPaisesPorUsuario]);
    }
    
    public function todosPaisesConquistados() {
   
        $totalPaises = Pais::count();
        $paisesConquistados = Pais::whereNotNull('ocupante')->count();
        $todosConquistados = $totalPaises == $paisesConquistados;

        return response()->json(['todosConquistados' => $todosConquistados]);
    }

    public function finalConfirmado() {
        $totalPaises = Pais::count();
        $paisesConquistados = Pais::whereNotNull('ocupante')->count();

        if ($totalPaises===$paisesConquistados) {
            
        }
    }
    

}
