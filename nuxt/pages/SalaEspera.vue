<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen py-6 px-4 sm:px-6 lg:px-8 w-full h-full absolute inset-0"
    :class="{ 'bg-blue-200': !sala, 'bg-blue-300': sala }">
    <div class="max-w-md w-full space-y-8 bg-blue-300 p-6 rounded-xl shadow-md text-blue-1100">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-blue-800">
          Sala d'espera
        </h2>
        <p class="mt-2 text-center text-sm text-blue-800">
          {{ sala ? sala.nombre : 'Nom de la sala no disponible' }}
        </p>
        <p class="mt-2 text-center text-sm relative group text-blue-800">
          Codi de la sala: {{ sala ? sala.id : 'Codi de la sala no disponible' }}
          <span
            class="absolute right-0 top-0 mt-2 mr-2 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out cursor-pointer"
            @click="copyToClipboard(sala ? sala.id : '')">Copiar</span>
        </p>
      </div>
      <div class="mt-8 space-y-6">
        <p class="text-lg mb-2 text-blue-800">Usuaris a la sala:</p>
        <div class="grid grid-cols-1 gap-4">
          <div class="flex items-center p-2 bg-blue-400 rounded-lg shadow-md text-blue-900"
            v-for="jugador in sala.jugadores" :key="jugador.id">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" src="https://via.placeholder.com/150" alt="" />
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-blue-900">
                {{ jugador.nombre }}
              </p>
              <p class="text-xs text-blue-600">
                Esperant per jugar...
              </p>
            </div>
          </div>
        </div>
        <button
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          v-if="esCreador" @click="iniciarPartida">
          Iniciar partida
        </button>
      </div>
    </div>
  </div>
</template>


<script>
// SalaEspera.vue
import { socket } from '@/utils/socket.js';
import { useAppStore } from '../stores/app.js';

export default {
  data() {
    return {
      store: useAppStore(),
    };
  },
  computed: {
    sala() {
      return this.store.sala;
    },
    esCreador() {
      return this.store.esCreador;
    },
  },
  methods: {
    iniciarPartida() {
      socket.emit('iniciarPartida', this.sala.id, (response) => {
        if (response.success) {
          console.log(response.message);
          socket.emit('peticion_jugar', { nombreUsuario: 'Usuario' + socket.id }, this.sala.id);
        } else {
          console.error(response.message);
        }
      });
    },
    handleIniciarPartidaResponse(response) {
      if (response.success) {
        console.log(response.message);
        socket.emit('peticion_jugar', { nombreUsuario: 'Usuario' + socket.id }, this.sala.id);
      } else {
        console.error(response.message);
      }
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard');
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    },
    handlePeticionJugarAceptada(datos) {
      console.log('peticion_jugar_aceptada', datos);
      this.$router.push({ name: 'TaulerView' });
    },
  },
  created() {
    socket.on('peticion_jugar_aceptada', (datos) => {
      console.log('peticion_jugar_aceptada', datos);
      this.$router.push({ name: 'TaulerView' });
    });
  },
  
};
</script>
