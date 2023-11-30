<template>
  <div class="mapa">
    <ul @click="atacar(pais.nombre)">
      <li v-for="pais in paises" :key="pais.id">
        {{ pais.nombre }} - Ocupante: {{ pais.ocupante || 'Vacío' }}
      </li>
    </ul>
  </div>
  <div class="preguntes">
    <div class="preguntes pregunta">
      <h1>{{ mostrarPregunta() }}</h1>
    </div>
    <div class="preguntes resposta1">
      <button v-on:click="resposta(1)">{{ respuesta[0] }}</button>
    </div>
    <div class="preguntes resposta2">
      <button v-on:click="resposta(2)">{{ respuesta[1] }}</button>
    </div>
    <div class="preguntes resposta3">
      <button v-on:click="resposta(3)">{{ respuesta[2] }}</button>
    </div>
    <div class="preguntes resposta4">
      <button v-on:click="resposta(4)">{{ respuesta[3] }}</button>
    </div>
  </div>
</template>

<script>
  import dataPaises from '../../../../laravel/mapa.json';
  import dataPreguntes from '../../../../laravel/preguntes.json';

  export default {
    data() {
      return {
        paises: [],
        preguntes: [],
        respuesta: [] 
      }
    },
    methods: { 
      mostrarPregunta() {
        //const pregNum = this.preguntes.length; 
        //const aleatorio = Math.floor(Math.random() * pregNum); 
        //return this.preguntes[aleatorio].pregunta; // Devuelve la pregunta
      },
      resposta(numResp) {
        // Lógica para manejar la respuesta seleccionada
      }
    },
    created() {
      this.paises = dataPaises.paises;
      this.preguntes = dataPreguntes.preguntes;
      this.respuesta = [
        // Agrega aquí las respuestas para cada botón, según la estructura de tu JSON
      ];
    }
  }
</script>
