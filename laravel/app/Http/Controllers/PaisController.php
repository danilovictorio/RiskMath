<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pais;  
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


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
        $arrayUsers = $request->input('arrayUsers');
    
        if (!is_array($arrayUsers)) {
            throw new \Exception('El parámetro "arrayUsers" no es un array válido.');
        }
    
        Log::info('Array de usuarios: ' . json_encode($arrayUsers));
        // Obtén un array plano de los usuarios
        $usuarios = array_column($arrayUsers, 'nombreUsuario');
    
        $paisesConquistados = Pais::whereIn('ocupante', $usuarios)->get();
    
        $cantidadPaisesPorUsuario = [];
        $todosConquistados = 15;
        foreach ($arrayUsers as $usuario) {
            if (is_array($usuario)) {
                $nombreUsuario = $usuario['nombreUsuario'];
            } else {
                $nombreUsuario = $usuario;
            }
            $cantidadPaises = $paisesConquistados->where('ocupante', $nombreUsuario)->count();
            if ($cantidadPaises === $todosConquistados) {
                // Haz algo si el usuario ha conquistado todos los países
            }
            $cantidadPaisesPorUsuario[] = [
                'nombre' => $nombreUsuario,
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

    public function finalConfirmado(Request $request) {
        $acabat = false;
        $idUser = $request->idUser;
        $totalPaises = Pais::count();
        $paisesUsuario = Pais::where('ocupante', $idUser)->count();

        if ($totalPaises == $paisesUsuario) {
            $acabat = true;
        }

        return response()->json(['acabat'=>$acabat]);
    }
    

}
