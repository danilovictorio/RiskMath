<template>
  <div>
    <div class="mapa">
      <ul @click="atacar(pais.nombre)">
        <li v-for="pais in paises" :key="pais.id">
          {{ pais.nombre }} - Ocupante: {{ pais.ocupante || 'Vacío' }}
        </li>
      </ul>
    </div>
    <div class="preguntas">
      <div class="pregunta">
        <h1>{{ preguntas.pregunta }}</h1>
        <ul>
          <li >
            {{ preguntas.a }}
          </li>
          <li >
            {{ preguntas[0].opciones[0] }}
          </li>
          <li >
            {{ preguntas[0].opciones[0] }}
          </li>
          <li >
            {{ preguntas[0].opciones[0] }}
          </li>
        </ul>
      </div>
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
      preguntas: [],
      respuesta: []
    }
  },
  methods: {
    async obtenerPreguntas() {
      try {
        const response = await fetch('http://localhost:8000/api/mostrar-preguntas');
        console.log(response);
        const data = await response.json();
        this.preguntas = data.preguntas;
        this.respuesta = data.preguntas.forEach(element => {
          data.preguntas[0].opciones
        });;
      } catch (error) {
        console.error('Error al obtener preguntas:', error);
      }
    },
    resposta(numResp) {
      
    }
  },
  async mounted() {
    await this.obtenerPreguntas();
   
  },
  created() {
    this.paises = dataPaises.paises;
    this.respuesta = [
     
    ];
  }
}
</script>
