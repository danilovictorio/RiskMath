<template>
  <div class="container">
    <div class="mapa">


      <ul @click="atacar(pais.nombre)">
        <li v-for="pais in paises" :key="pais.id">
          {{ pais.nombre }} - Ocupante: {{ pais.ocupante || 'Vacío' }}
        </li>
      </ul>

    </div>
    <div v-if="currentQuestion !== null" class="pregunta-container">
      <div class="pregunta">
        <h1>{{ preguntas[currentQuestion].pregunta }}</h1>
        <ul>
          <li>
            <button @click="resposta('a')">a: {{ preguntas[currentQuestion].a }}</button>
            <button @click="resposta('b')">b: {{ preguntas[currentQuestion].b }}</button>
          </li>
          <li>
            <button @click="resposta('c')">c: {{ preguntas[currentQuestion].c }}</button>
            <button @click="resposta('d')">d: {{ preguntas[currentQuestion].d }}</button>
          </li>
        </ul>
      </div>
      <button @click="nextQuestion" v-if="currentQuestion < preguntas.length - 1">Next</button>
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
      currentQuestion: null
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
        const response = await fetch('http://localhost:8000/api/paises');
        const data = await response.json();
        this.paises = data.paises;
        console.log(data);
      } catch (error) {
        console.error('Error al obtener datos de países:', error);
      }
    },


    async atacar(nombrePais, usuarioActual) {
      const apiUrl = 'http://localhost:8000/api/pais-seleccionado';

      const requestData = {
        nombrePais: nombrePais,
        usuarioActual: usuarioActual
      };

      try {
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        console.log('Solicitud de ataque enviada correctamente.');
      } catch (error) {
        console.error('Error al enviar la solicitud de ataque:', error);
      }
    },

    resposta(questionId, option) {

      console.log(`Selected option: ${option} for question ID: ${questionId}`);


      this.validateResponse(questionId, option);
    },


    validateResponse(preguntaId, respuestaUsuario) {
      const apiUrl = 'http://localhost:8000/api/verificar-respuesta';

      const requestData = {
        preguntaId: preguntaId,
        respuestaUsuario: respuestaUsuario
      };

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then(response => response.json())
        .then(result => {

          if (result.es_correcta) {
            console.log('Answer is correct!');
          } else {
            console.log('Answer is incorrect.');
          }
        })
        .catch(error => {
          console.error('Error validating response:', error);
        });
    },
    nextQuestion() {
      this.currentQuestion += 1;
    }
  },
  async mounted() {
    await this.obtenerPreguntas();
    this.obtenerDatosPaises();
    this.currentQuestion = 0;
  },
  created() {

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

