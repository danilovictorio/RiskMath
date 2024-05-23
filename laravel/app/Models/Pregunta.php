<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pregunta extends Model
{
    use HasFactory;
    protected $fillable = ['pregunta', 'a', 'b', 'c', 'd', 'respuesta_correcta'];
    
    public function opciones()
    {
        return $this->hasMany(Opcion::class, 'pregunta_id');
    }
}
