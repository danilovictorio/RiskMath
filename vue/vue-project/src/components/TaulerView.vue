<template>
  <div class="container">
    <div class="mapa">
      <!-- Your existing code for the map -->
      <ul @click="atacar(pais.nombre)">
        <li v-for="pais in paises" :key="pais.id">
          {{ pais.nombre }} - Ocupante: {{ pais.ocupante || 'Vacío' }}
        </li>
      </ul>
      <img src="../../../../laravel/resources/img/mapa1.jpg" alt="">
    </div>
    <div v-if="preguntaActual !== null" class="pregunta-container">
      <div class="pregunta">
        <h1>{{ preguntas[preguntaActual].pregunta }}</h1>
        <ul>
          <li>
            <button @click="resposta('a')">a: {{ preguntas[preguntaActual].a }}</button>
            <button @click="resposta('b')">b: {{ preguntas[preguntaActual].b }}</button>
          </li>
          <li>
            <button @click="resposta('c')">c: {{ preguntas[preguntaActual].c }}</button>
            <button @click="resposta('d')">d: {{ preguntas[preguntaActual].d }}</button>
          </li>
        </ul>
      </div>
      <button @click="seguentPregunta" v-if="preguntaActual < preguntas.length - 1">Següent</button>
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
      respuesta: [],
      preguntaActual: null
    };
  },
  methods: {
    async obtenerPreguntas() {
      try {
        const response = await fetch('http://localhost:8000/api/mostrar-preguntas');
        const data = await response.json();

        this.preguntas = data.preguntas;
        this.respuesta = data.preguntas[0].opciones;

        console.log(data.preguntas);
      } catch (error) {
        console.error('Error al obtener preguntas:', error);
      }
    },

    async obtenerDatosPaises() {
      try {
        const response = await fetch('http://localhost:5173/api/paises');
        const data = await response.json();
        this.paises = data.paises;
      } catch (error) {
        console.error('Error al obtener datos de países:', error);
      }
    },

    resposta(preguntaId, opcio) {

      console.log(`Selected option: ${opcio} for question ID: ${preguntaId}`);


      this.validateResponse(preguntaId, opcio);
    },
    async validateResponse(preguntaId, respuestaUsuario) {
      const apiUrl = 'http://localhost:8000/api/validar-respuesta';

      const requestData = {
        preguntaId: preguntaId,
        respuestaUsuario: respuestaUsuario
      };

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const resultat = await response.json();

        if (resultat.success) {
          console.log('Answer is correct!');
        } else {
          console.log('Answer is incorrect.');
        }
      } catch (error) {
        console.error('Error validating response:', error);
      }
    },

    seguentPregunta() {
      this.preguntaActual += 1;
    }
  },
  async mounted() {
    await this.obtenerPreguntas();
    this.obtenerDatosPaises();
    this.preguntaActual = 0;
  },
  created() {
    this.paises = dataPaises.paises;
    this.respuesta = [];
  }
};
</script>
<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.mapa {
  width: 50%;

}

.pregunta-container {
  width: 50%;
  padding: 20px;
  box-sizing: border-box;

}

.pregunta {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li button {
  margin-bottom: 10px;

}
</style>

