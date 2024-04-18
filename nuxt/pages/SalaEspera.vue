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
// SalaEspera.vue
import { onMounted, computed } from 'vue';
import { socket } from '@/utils/socket.js';
import { useAppStore } from '../stores/app.js';

export default {

  setup() {
    const store = useAppStore();
    const esCreador = ref(false);

    onMounted(() => {
      socket.emit('obtenerSalas'); // Emitir solicitud de datos de las salas

      socket.on('salas', (salas) => {
        // Actualizar el estado de la tienda con las salas recibidas
        store.setSalas(salas);
        
    
        console.log('Salas recibidas:', salas);
      });
      socket.on('salaCreada', (data) => {
        console.log('Datos recibidos:', data);
        store.setSala(data.sala);
        store.setUsuariosJuego(data.jugadores);
        console.log('Sala creada:', store.sala);
      });

      socket.on('usuarioUnidoSala', (data) => {
        store.setSala(data.sala);
        store.setUsuariosJuego(data.usuarios);
        console.log('Usuarios en la sala:', store.usuariosJuego.users);
      });

      socket.on('joinedRoom', (data) => {
        esCreador.value = data.esCreador;
      });

      socket.on('startGame', () => {
        this.$router.push({ name: 'Tablero' });
      });
    });

    return {
      sala: computed(() => store.sala),
      usuarios: computed(() => store.usuariosJuego.users),
      esCreador,
      iniciarPartida() {
        socket.emit('iniciarPartida', store.sala.id);
      },
    };
  },
};
</script>
