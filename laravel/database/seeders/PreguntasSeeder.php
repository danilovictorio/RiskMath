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
                'a' => $preguntaData['opciones']['a'],
                'b' => $preguntaData['opciones']['b'],
                'c' => $preguntaData['opciones']['c'],
                'd' => $preguntaData['opciones']['d'],
                'respuesta_correcta' => $preguntaData['respuesta_correcta'],
            ]);
        }
        
    
}
}

    

