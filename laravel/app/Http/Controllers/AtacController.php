<?php 

namespace App\Http\Controllers;
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
}
