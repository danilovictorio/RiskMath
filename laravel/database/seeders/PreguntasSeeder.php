<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pregunta;

class PreguntasSeeder extends Seeder
{
    public function run()
    {
        $preguntasJson = file_get_contents('../laravel/preguntes.json');
        $preguntas = json_decode($preguntasJson, true);
            foreach ($preguntas as $preguntaData) {
                Pregunta::create([
                    'pregunta' => $preguntaData['pregunta'],
                    'a' => $preguntaData.opciones[0], 
                    'b' => $preguntaData.opciones[1],
                    'c' => $preguntaData.opciones[2],
                    'd' => $preguntaData.opciones[3],
                    'respuesta_correcta' => $preguntaData['respuesta_correcta'],
                ]);
            }
        
    
}
}

    

