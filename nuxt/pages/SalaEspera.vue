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
      
      
      

      socket.emit('obtenerSalas');

      
    });

    return {
      iniciarPartida() {
        socket.emit('iniciarPartida', store.sala.id, (response) => {
          if (response.success) {
            console.log(response.message);
            this.$router.push({ name: 'TaulerView' });
          } else {
            console.error(response.message);
          }
      });
      }
  }
}
};
</script>