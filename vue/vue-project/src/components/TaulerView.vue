<template>
  <div>
    <div class="mapa">
      <ul @click="atacar(pais.nombre)">
        <li v-for="pais in paises" :key="pais.id">
          {{ pais.nombre }} - Ocupante: {{ pais.ocupante || 'Vacío' }}
        </li>
      </ul>
    </div>
    <div v-if="currentQuestion !== null">
      <div class="pregunta">
        <h1>{{ preguntas[currentQuestion].pregunta }}</h1>
        <ul>
          <li>
            <button @click="resposta(preguntas[currentQuestion].id, 'a')">a: {{ preguntas[currentQuestion].a }}</button>
            <button @click="resposta(preguntas[currentQuestion].id, 'b')">b: {{ preguntas[currentQuestion].b }}</button>
            <button @click="resposta(preguntas[currentQuestion].id, 'c')">c: {{ preguntas[currentQuestion].c }}</button>
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
    resposta(questionId, option) {

      console.log(`Selected option: ${option} for question ID: ${questionId}`);


      this.validateResponse(questionId, option);
    },
    validateResponse(questionId, selectedOption) {
      const apiUrl = 'http://localhost:8000/api/validar-respuesta';

      const requestData = {
        questionId: questionId,
        selectedOption: selectedOption
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

          if (result.success) {
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
    this.currentQuestion = 0;
  },
  created() {
    this.paises = dataPaises.paises;
    this.respuesta = [];
  }
};
</script>

