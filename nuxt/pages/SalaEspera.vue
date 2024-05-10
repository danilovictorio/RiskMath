<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sala de espera
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ sala ? sala.nombre : 'Nombre de la sala no disponible' }}
        </p>
        <p class="mt-2 text-center text-sm text-gray-600">
          Código de la sala: {{ sala ? sala.id : 'Nombre de la sala no disponible' }}
        </p>
      </div>
      <div class="mt-8 space-y-6">
        <p class="text-lg mb-2">Usuarios en la sala:</p>
        <ul class="list-disc list-inside mb-4">
          <li class="mb-1" v-for="(jugador, index) in sala.jugadores" :key="index">{{ jugador ? jugador : "No hay usuario" }}</li>
        </ul>
        <button class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" v-if="esCreador" @click="iniciarPartida">
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
    }
  }
};
</script>