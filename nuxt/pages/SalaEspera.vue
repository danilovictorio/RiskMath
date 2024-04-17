<template>
  <div>
    <h1>Sala de espera</h1>
    <p>Código de la sala: {{ codigoSala }}</p>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario.id">{{ usuario.nombre }}</li>
    </ul>
    <button v-if="esCreador" @click="iniciarPartida">Iniciar partida</button>
  </div>
</template>

<script>
import { socket } from '@/utils/socket.js';
import { useAppStore } from '../stores/app';
export default {

  data() {
    return {
      usuarios: [],
      esCreador: false,
      codigoSala: '', // Añade una propiedad para el código de la sala
    };
  },
  methods: {
    iniciarPartida() {
      socket.emit('iniciarPartida', this.$route.params.id);
    },
  },
  mounted() {
    const storeApp = useAppStore();
    this.codigoSala = storeApp.codigoSala; // Establece el código de la sala al montar el componente

    socket.on('usuarioUnido', (usuario) => { 
      this.usuarios.push(usuario);
    });

    socket.on('joinedRoom', (data) => {
      this.esCreador = data.esCreador;
    });

    socket.on('startGame', () => {
      this.$router.push({ name: 'Tablero' });
    });
  },
};
</script>