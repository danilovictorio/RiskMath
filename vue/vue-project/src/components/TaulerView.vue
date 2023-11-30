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
      <div v-for="pregunta in preguntas" :key="pregunta.id" class="pregunta">
        <h1>{{ pregunta.pregunta }}</h1>
        <ul>
          <li v-for="(opcion, index) in pregunta.opciones" :key="index">
            {{ opcion }}
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
        const data = await response.json();

        this.preguntas = data.preguntas;
        this.respuesta = data.preguntas[0].opciones;
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
