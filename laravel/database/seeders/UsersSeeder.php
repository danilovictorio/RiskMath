<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class PaisesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Utiliza base_path para obtener la ruta completa
        $jsonPath = base_path('../laravel/users.json');

        // Verifica si el archivo existe
        if (file_exists($jsonPath)) {
            // Lee el contenido del archivo JSON
            $json = file_get_contents($jsonPath);
            $data = json_decode($json, true);

            // Inserta los datos en la base de datos
            foreach ($data['users'] as $userData) {
                Pais::create($userData);
            }
        } else {
            // Maneja el caso donde el archivo no existe
            $this->command->error('El archivo JSON no existe en la ruta especificada.');
        }
    }
}
