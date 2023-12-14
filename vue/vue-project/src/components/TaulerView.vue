<template>
  <div class="container">
    <div :class="{ 'mapa': esActivo, 'disabled': !esActivo }">
      <ul>
        <li v-for="pais in paises" :key="pais.id" @click="enviarAtac(pais.nombre, pais.id, idUser)">
          {{ pais.nombre }} - Ocupante: {{ pais.ocupante || 'Vacío' }}
        </li>
      </ul>
    </div>
    <div v-if="mostrarPregunta && esMiTurno" class="pregunta-container">
      <div class="pregunta">
        <h2>{{ pregunta ? pregunta.pregunta : 'No hay pregunta disponible' }}</h2>
        <p @click="validateResponse(pregunta.id, 'a')" v-if="pregunta && Object.keys(pregunta).length">Respuesta A: {{
          pregunta.respuesta_a }}</p>
        <p @click="validateResponse(pregunta.id, 'b')" v-if="pregunta && Object.keys(pregunta).length">Respuesta B: {{
          pregunta.respuesta_b }}</p>
        <p @click="validateResponse(pregunta.id, 'c')" v-if="pregunta && Object.keys(pregunta).length">Respuesta C: {{
          pregunta.respuesta_c }}</p>
        <p @click="validateResponse(pregunta.id, 'd')" v-if="pregunta && Object.keys(pregunta).length">Respuesta D: {{
          pregunta.respuesta_d }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { socket } from '@/utils/socket.js';
import { useAppStore } from '../stores/app';

export default {
  data() {
    return {
      paises: [],
      preguntas: [],
      pregunta: {},
      idUser: 1,
      paisSeleccionado: null,
      mostrarPregunta: false,
      usuario: nombreUsuario,
      app: useAppStore(),
      esMiTurno: nombreUsuario,
      esActivo:true,
    };
  },
  methods: {


    //funció que serveix per obtenir el json de preguntes
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


    //funció per obtenir el json de paisos
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


    //funció que valida si la resposta d'un usuari es la correcta 
    validateResponse(questionId, selectedOption) {

      if (this.nombreUsuario==this.app.usuario.nombre) {    
        
      this.app.setEstado = "Acabado";
      console.log('Pregunta ID:', questionId);
      const apiUrl = 'http://localhost:8000/api/verificar-respuesta';
      const requestData = {
        preguntaId: questionId,
        respuestaUsuario: selectedOption,
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
            this.confirmarAtaque(this.idUser, this.paisSeleccionado);
            this.esMiTurno = false;

          } else {
            console.log('La respuesta es falsa');
            this.respuestaJugador(false);
          }
          socket.emit('respuestaJugador', { userId: this.idUser });
          this.app.setEstado = "Respondiendo";
          this.esMiTurno = false;
        })
        .catch(error => {
          console.error('Error validating response:', error);
        });
      }else{
        this.esActivo=false;
        return;
      }},


    //funció per confirmar atac
    async confirmarAtaque(idUser, paisSeleccionado) {
      if (this.usuario == this.app.usuario.nombre) {
        try {
          const response = await fetch('http://localhost:8000/api/confirmar-ataque', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idUser: idUser,
              paisSeleccionado: paisSeleccionado,
            }),
          });

          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
          }

          const result = await response.json();
          console.log(result.message);
          console.log('Usuario: ' + idUser, 'Conquista Pais: ' + paisSeleccionado)

        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      } else { 
        this.esActivo=false;
        return; 
      }
    },


    //funció enviar atac a server
    async enviarAtac(name, paisId, idUser) {
      if (this.usuario == this.app.usuario.nombre) {

        this.app.setEstado = "Atacando";
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
            id: data.pregunta.id,
            pregunta: data.pregunta.pregunta,
            respuesta_a: data.pregunta.respuesta_a,
            respuesta_b: data.pregunta.respuesta_b,
            respuesta_c: data.pregunta.respuesta_c,
            respuesta_d: data.pregunta.respuesta_d,
          };

          this.mostrar = 1;
          this.paisSeleccionado = paisId;
          this.app.setEstado = "Respondiendo";
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      } else {
        this.esActivo=false;
        return;
      }
    },
  },
  async mounted() {
    await this.obtenerPreguntas();
    this.obtenerDatosPaises();
    const app = useAppStore();
    this.usuario = app.usuario.nombre;



  },
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
.disabled{
  pointer-events: none; 
  opacity: 0.5
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
