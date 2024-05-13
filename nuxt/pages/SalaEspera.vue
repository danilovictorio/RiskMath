<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 py-6 px-4 sm:px-6 lg:px-8 w-full h-full absolute inset-0">
    <div class="max-w-md w-full space-y-8 bg-gray-800 p-6 rounded-xl shadow-md text-white">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-green-400">
          Sala de espera
        </h2>
        <p class="mt-2 text-center text-sm">
          {{ sala ? sala.nombre : 'Nombre de la sala no disponible' }}
        </p>
        <p class="mt-2 text-center text-sm relative group" @click="copyToClipboard(sala ? sala.id : '')">
          Código de la sala: {{ sala ? sala.id : 'Nombre de la sala no disponible' }}
          <span class="absolute right-0 top-0 mt-2 mr-2 text-xs text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out cursor-pointer">Copy</span>
        </p>
      </div>
      <div class="mt-8 space-y-6">
        <p class="text-lg mb-2">Usuarios en la sala:</p>
        <div class="grid grid-cols-1 gap-4">
          <div class="flex items-center p-2 bg-gray-700 rounded-lg shadow-md" v-for="(jugador, index) in sala.jugadores" :key="index">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" src="https://via.placeholder.com/150" alt="" />
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-white">
                {{ jugador ? jugador : "No hay usuario" }}
              </p>
              <p class="text-xs text-gray-400">
                Esperando para jugar...
              </p>
            </div>
          </div>
        </div>
        <button class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" v-if="esCreador" @click="iniciarPartida">
          Iniciar partida
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// SalaEspera.vue
import { onMounted, computed, ref } from 'vue';
import { socket } from '@/utils/socket.js';
import { useAppStore } from '../stores/app.js';

export default {
  computed: {
    sala() {
      let store = useAppStore();
      return store.sala;
    },
    esCreador() {
      let store = useAppStore();
      return store.esCreador;
    }
  },
  setup() {
    const store = useAppStore();
    const esCreador = ref(false);
    const router = useRouter();

    const redirectToGame = () => {
      router.push({ name: 'TaulerView' });
    };

    onMounted(() => {
      socket.on('peticion_jugar_aceptada', (datos) => {
        console.log('peticion_jugar_aceptada', datos);
        redirectToGame();
      });

      socket.emit('obtenerSalas');
    });

    return {
      iniciarPartida() {
        socket.emit('iniciarPartida', store.sala.id, (response) => {
          if (response.success) {
            console.log(response.message);
            socket.emit('peticion_jugar', { nombreUsuario: 'Usuario' + socket.id }, store.sala.id);
          } else {
            console.error(response.message);
          }
        });
      },
      async copyToClipboard(text) {
        try {
          await navigator.clipboard.writeText(text);
          alert('Código de sala copiado al portapapeles');
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      }
    }
  }
};
</script>