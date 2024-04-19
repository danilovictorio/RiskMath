<template>
  <div>
    <h1>Sala de espera</h1>
    <h3>{{ sala ? sala.nombre : 'Nombre de la sala no disponible' }}</h3>
    <p>Código de la sala: {{ sala ? sala.id : 'Nombre de la sala no disponible' }}</p>
    <p>Usuarios en la sala:</p>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario.id">ID: {{ usuario ? usuario.id : "No hay usuairoid" }}</li>
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
    usuarios() {
      let store = useAppStore();
      return store.usuariosJuego.users;
    },
    esCreador() {
      let store = useAppStore();
      return store.esCreador;
    }
  },
  setup() {
    const store = useAppStore();
    const esCreador = ref(false);

    onMounted(() => {
      socket.on('salaCreada', (data) => {
        console.log('Datos recibidos:', data);
        store.setSala(data.sala);
        store.setUsuariosJuego(data.jugadores);
        console.log('Sala creada:', store.sala);
      });
      socket.on('salas', (salas) => {
        console.log('Salas recibidas:', salas);
        if (store.sala) {
          const sala = salas[store.sala.id];
          if (sala) {
            store.setSala(sala);
            console.log('Sala guardada en Pinia:', store.sala);
          }
        }
      });

      socket.emit('obtenerSalas');

      socket.on('usuarioUnidoSala', (data) => {
        store.setSala(data.sala);
        store.setUsuariosJuego(data.usuarios);
        console.log('Datos de la sala:', store.sala);
        console.log('Usuarios en la sala:', store.usuariosJuego.users);
      });

      const iniciarPartida = async () => {
      try {
        socket.emit('iniciarPartida', store.sala.id, (response) => {
          if (response.success) {
            console.log(response.message);
            router.push('/tablero');
          } else {
            console.error(response.message);
          }
        });
      } catch (error) {
        console.error('Error al iniciar la partida:', error);
      }
    };

    return {
      iniciarPartida,
    };
  },
</script>