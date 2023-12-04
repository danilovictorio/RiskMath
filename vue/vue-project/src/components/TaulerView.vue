<template>
  <div class="container">
    <div class="mapa">

      <ul>
        <li v-for="pais in paises" :key="pais.id"  @click="enviarAtac(pais && pais.nombre, idUser)">
          {{ pais.nombre }} - Ocupante: {{ pais.ocupante || 'Vacío' }}
        </li>
      </ul>

    </div>
    <div v-if="mostrar !== null" class="pregunta-container">
      <div class="pregunta">
        <h2>{{ pregunta ? pregunta.pregunta : 'No hay pregunta disponible' }}</h2>
        <p @click="validateResponse(pregunta.id, 1)" v-if="pregunta">Respuesta A: {{ pregunta.respuesta_a }}</p>
        <p  @click="validateResponse(pregunta.id, 2)" v-if="pregunta">Respuesta B: {{ pregunta.respuesta_b }}</p>
        <p  @click="validateResponse(pregunta.id, 3)" v-if="pregunta">Respuesta C: {{ pregunta.respuesta_c }}</p>
        <p  @click="validateResponse(pregunta.id, 4)" v-if="pregunta">Respuesta D: {{ pregunta.respuesta_d }}</p>
      </div>
    </div>

  </div>
</template>

<script>
//import dataPaises from '../../../../laravel/mapa.json';
//import dataPreguntes from '../../../../laravel/preguntes.json';
import { useSessionStore } from '@/stores/sessionStore';
export default {
  data() {
    return {
      paises: [],
      preguntas: [],
      respuesta: [],
      pregunta: {},
      idUser: 1,
      currentQuestion: null,
      mostrar: null
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
    validateResponse(questionId, selectedOption) {
      const apiUrl = 'http://localhost:8000/api/verificar-respuesta';
      const requestData = {
        preguntaId: questionId,
        respuestaUsuario: selectedOption
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
          if (result.resultado === true) {
            console.log('La respuesta es verdadera');
          } else {
            console.log('La respuesta es falsa');
          }
        })
        .catch(error => {
          console.error('Error validating response:', error);
        });
    },

    async enviarAtac(name, idUser) {
      const sessionStore = useSessionStore();
      const jugador = sessionStore.getPlayer(sessionStore.userId);

      console.log('hola');
      try {
        const response = await fetch('http://localhost:8000/api/enviar-atac', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
             idUser: sessionStore.userId,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        this.pregunta = {
          id: data.pregunta.id,
          pregunta: data.pregunta.pregunta,
          respuesta_a: data.pregunta.respuesta_a,
          respuesta_b: data.pregunta.respuesta_b,
          respuesta_c: data.pregunta.respuesta_c,
          respuesta_d: data.pregunta.respuesta_d,
        };

        this.mostrar = 1;

      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
    ,
    nextQuestion() {
      this.currentQuestion += 1;
    }
  },
  async mounted() {
    
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