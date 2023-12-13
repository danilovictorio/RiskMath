<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('atac_name')->nullable();
            $table->unsignedBigInteger('atac_user_id')->nullable();
            $table->foreign('atac_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('atac_pregunta_id')->nullable();
            $table->foreign('atac_pregunta_id')->references('id')->on('preguntas')->onDelete('cascade');
            $table->string('atac_estat')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sessions', function (Blueprint $table) {
            // Eliminar las columnas relacionadas con el ataque
            $table->dropColumn(['atac_name', 'atac_user_id', 'atac_pregunta_id', 'atac_estat']);
        });
    }
};
