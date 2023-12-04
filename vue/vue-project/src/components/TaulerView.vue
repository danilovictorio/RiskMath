<template>
  <div class="container">
    <div class="mapa">
      <ul @click="fetchQuestion()">
        <li v-for="pais in paises" :key="pais.id">
          {{ pais.nombre }} - Propietario: {{ pais.ocupante || 'Vacío' }}
        </li>
      </ul>
      <ul>
        <li v-for="pais in paises" :key="pais.id"  @click="enviarAtac(pais.nombre, idUser)">
          {{ pais.nombre }} - Ocupante: {{ pais.ocupante || 'Vacío' }}
        </li>
      </ul>
    </div>
    <div v-if="mostrar" class="pregunta-container">
      <div class="pregunta">
        <h2>{{ pregunta ? pregunta.pregunta : 'No hay pregunta disponible' }}</h2>
        <p v-if="pregunta">Respuesta A: {{ pregunta.respuesta_a }}</p>
        <p v-if="pregunta">Respuesta B: {{ pregunta.respuesta_b }}</p>
        <p v-if="pregunta">Respuesta C: {{ pregunta.respuesta_c }}</p>
        <p v-if="pregunta">Respuesta D: {{ pregunta.respuesta_d }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paises: [],
      preguntas: [],
      respuesta: [],
      pregunta: null,
      idUser: 1,
      currentQuestion: null,
      mostrar: false,
      paisSeleccionado: false
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
        const response = await fetch('http://localhost:8000/api/obtenerPaises');
        const data = await response.json();
        this.paises = data.paises;
        console.log(data);
      } catch (error) {
        console.error('Error al obtener datos de países:', error);
      }
    },
    async fetchQuestion() {
      try {
        const response = await fetch('http://localhost:8000/api/obtener-Pregunta-Aleatoria', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: this.idUser,
          }),
        });
        const data = await response.json();
        this.pregunta = data.question;
      } catch (error) {
        console.error('Error al obtener la pregunta:', error);
      }
    },
    async enviarAtac(name, idUser) {
      console.log('hola');
      try {
        const response = await fetch('http://localhost:8000/api/enviar-atac', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            idUser: idUser,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        this.pregunta = {
          pregunta: data.pregunta.pregunta,
          respuesta_a: data.pregunta.respuesta_a,
          respuesta_b: data.pregunta.respuesta_b,
          respuesta_c: data.pregunta.respuesta_c,
          respuesta_d: data.pregunta.respuesta_d,
        };

        this.mostrar = true;
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
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
