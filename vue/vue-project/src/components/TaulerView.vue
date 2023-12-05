<template>
  <div class="container">
    <div class="mapa">
      <div @click="atacar(pais.nombre)">
      </div>
        <div class="paisos" v-for="pais in paises" :key="pais.id">
          <div class="nom__pais">
            {{ pais.nombre }}
          </div>
          <div class="propietari__pais">
            Propietario: {{ pais.ocupante || 'Vacío' }}
          </div>
        </div>
    </div>

    <div v-if="currentQuestion !== null" class="preguntaRespostes__container">
      <div class="pregunta">
        <h1>{{ preguntas[currentQuestion].pregunta }}</h1>
      </div>
      <div class="respostes">
        <button class="button__respostes" @click="resposta(preguntas[currentQuestion].id, 'a')">a: {{ preguntas[currentQuestion].a }}</button>
        <button class="button__respostes" @click="resposta(preguntas[currentQuestion].id, 'b')">b: {{ preguntas[currentQuestion].b }}</button>
        <button class="button__respostes" @click="resposta(preguntas[currentQuestion].id, 'c')">c: {{ preguntas[currentQuestion].c }}</button>
        <button class="button__respostes" @click="resposta(preguntas[currentQuestion].id, 'c')">d: {{ preguntas[currentQuestion].d }}</button>
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

    resposta(questionId, option) {

      console.log(`Selected option: ${option} for question ID: ${questionId}`);


      this.validateResponse(questionId, option);
    },

    async fetchQuestion(countryId) {
      const userId = 4;
      try {
        const response = await fetch();
        const data = await response.json();
        this.question = data.question;
      } catch (error) {
        console.error('Error al obtener la pregunta:', error);
      }
    },

    // validateResponse(questionId, selectedOption) {
    //   const apiUrl = 'http://localhost:8000/api/verificarRespuesta';
    //   const requestData = {
    //     preguntaId = questionId,
    //     respuestaUsuario = selectedOption
    //   };

    //   fetch(apiUrl, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(requestData),
    //   })
    //     .then(response => response.json())
    //     .then(result => {
    //       if (result.resultado === true) {
    //         console.log('La respuesta es verdadera');
    //       } else {
    //         console.log('La respuesta es falsa');
    //       }
    //     })
    //     .catch(error => {
    //       console.error('Error validating response:', error);
    //     });
    // },
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "mapa preguntes-respostes";
  height: 100vh;
  width: 100vw;
}

.preguntaRespostes__container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pregunta {
  border: 1px solid #ccc;
  padding: 20px;
  grid-area: preguntes-respostes;
}

.respostes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  margin-top: 10px;
}

.button__respostes {
  border-radius: 20px;
  background-color:tan;
  padding: 5px;
}

.mapa {
  grid-area: mapa;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}

.paisos{
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas: "pais"
  "."
  "propietari";
  border: 1px solid black;
  border-radius: 50%;
}

.nom__pais{
  grid-area: pais;
  display: flex;
  justify-content: center;
  
}

.propietari__pais{
  grid-area: propietari;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

