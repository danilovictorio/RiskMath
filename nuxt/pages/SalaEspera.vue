<template>
  <div>
    <h1>Sala de espera</h1>
    <h3>{{ sala ? sala.nombre : 'Nombre de la sala no disponible' }}</h3>
    <p>Código de la sala: {{ sala ? sala.id : 'Nombre de la sala no disponible' }}</p>
    <p>Usuarios en la sala:</p>
    <ul>
      <li v-for="(jugador, index) in sala.jugadores" :key="index">{{ jugador ? jugador : "No hay usuario" }}</li>
    </ul>
    <button v-if="esCreador" @click="iniciarPartida">Iniciar partida</button>
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