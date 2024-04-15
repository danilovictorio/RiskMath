<?php 

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use App\Models\Atac;
use App\Models\Pregunta;
use Illuminate\Support\Facades\Log;

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
        $idAtac = $atac->id;
        //Log::info('PATATA: '.$idAtac);
        //$request->session()->put('PROVA', "casa");
       // $request->session()->put('ataqueID', $atac->id);

        $data = [
            'pregunta' => [
                'id' => $pregunta->id,
                'pregunta' => $pregunta->pregunta,
                'respuesta_a' => $pregunta->a,
                'respuesta_b' => $pregunta->b,
                'respuesta_c' => $pregunta->c,
                'respuesta_d' => $pregunta->d,
            ],
            'idAtac' => $idAtac, 
        ];
     
        return response()->json($data , 200);
    }

    public function cambiarEstadoAtaque(Request $request){

        //Log::info('AtaqueId: '.$request->input('ataqueId'));
        $resultado = $request->input('resultado');
        $ataqueID = $request->input('ataqueId');
        $ataque = Atac::find($ataqueID);
    
        // Verifica si el ataque existe
        if ($ataque) {
            // Actualiza el estado del ataque
            if ($resultado){
                $ataque->estat = "ACERTADA";
            }else{
                $ataque->estat = "FALLADA";}
            
            $ataque->save();
    
            $data = [
                'mensaje' => 'Estado del ataque cambiado exitosamente',
                'id' => $ataque->id,
            ];
    
            return response()->json($data);
        } else {
            $data = [
                'mensaje' => 'Error: El ataque no existe o no pertenece al usuario actual',
                'id' => $ataque,
            ];
    
            return response()->json($data, 400);
        }
    }
}
