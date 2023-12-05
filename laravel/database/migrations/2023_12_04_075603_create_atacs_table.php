<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    

     
    public function up()
    {
        Schema::create('atacs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('idUser'); 
            $table->unsignedBigInteger('idPregunta');
            $table->foreign('idPregunta')
                ->references('id')
                ->on('preguntas')
                ->onDelete('cascade');
            $table->string('estat');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('atacs');
    }
};
