<?php 

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use App\Models\Atac;
use App\Models\Pregunta;

class AtacController extends Controller
{
    public function enviarAtac(Request $request){

        $name = $request->input('name');
        $idUser = $request->input('idUser');

     
        $pregunta = Pregunta::inRandomOrder()->first();

       $estat="P_ENVIADA";

        $atac = new Atac();
        $atac->name = $name;
        $atac->idUser = $idUser;
        $atac->idPregunta = $pregunta->id;
        $atac->estat = $estat;
        $atac->save();

        Session::put('ataque', $atac);
        Session::put('ataqueId', $atac->id);
       
        $data = [
            'pregunta' => [
                'id' => $pregunta->id,
                'pregunta' => $pregunta->pregunta,
                'respuesta_a' => $pregunta->a,
                'respuesta_b' => $pregunta->b,
                'respuesta_c' => $pregunta->c,
                'respuesta_d' => $pregunta->d,
            ],
        ];
     
        return response()->json($data);
    }

    public function cambiarEstadoAtaque(Request $request){
    $ataqueId = Session::get('ataqueId');
    $resultado = $request->input('resultado');

    // Obtén el ataque almacenado en la sesión
    $ataque = Atac::find($ataqueId);
    
    // Verifica que el ataque existe y pertenece al usuario actual
    if ($ataque) {
        // Actualiza el estado del ataque
        $ataque->estat = $resultado;
        $ataque->save();
    
        $data = [
            'mensaje' => 'Estado del ataque cambiado exitosamente',
        ];
    
        return response()->json($data);
    } else {
        $data = [
            'mensaje' => 'Error: El ataque no existe o no pertenece al usuario actual',
        ];
    
        return response()->json($data, 400); // Código de respuesta 400 para indicar un error
   }
}
}
