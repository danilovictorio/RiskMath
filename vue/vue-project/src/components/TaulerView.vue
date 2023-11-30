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
      <h1>{{ getPreguntes().pregunta }}</h1>
    </div>
    <div class="preguntes resposta1">
      <button v-on:click="resposta(1)">{{ getPreguntes().opciones[0] }}</button>
    </div>
    <div class="preguntes resposta2">
      <button v-on:click="resposta(2)">{{ getPreguntes().opciones[1] }}</button>
    </div>
    <div class="preguntes resposta3">
      <button v-on:click="resposta(3)">{{ getPreguntes().opciones[2] }}</button>
    </div>
    <div class="preguntes resposta4">
      <button v-on:click="resposta(4)">{{ getPreguntes().opciones[3] }}</button>
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
        preguntes: []
      }
    },
    methods: { 
      async getPreguntes() {
        try{
          const response= await fetch('http://localhost:8000/api/pregunta')
          if (!response.ok) {
            throw new Error('Error de red - Código $(response.status)');
          }
          const data = await response.json();
          console.log('Respuesta de la API',data);

        }catch(error){
          console.error('Error al obtener datos de la API:',error)
        }
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
