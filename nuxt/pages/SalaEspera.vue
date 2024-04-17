<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
    <h1 class="text-2xl text-gray-700 mb-5">Sala de espera</h1>
    <p class="text-lg text-gray-600 mb-5">Código de la sala: {{ codigoSala }}</p>
    <ul class="list-disc list-inside text-gray-600 mb-5">
      <li v-for="usuario in usuarios" :key="usuario.id">{{ usuario.nombre }}</li>
    </ul>
    <button v-if="esCreador" @click="iniciarPartida" class="p-2 text-white bg-blue-500 rounded cursor-pointer transition-colors duration-300 hover:bg-blue-700">Iniciar partida</button>
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
      codigoSala: '', 
    };
  },
  methods: {
    iniciarPartida() {
      socket.emit('iniciarPartida', this.$route.params.id);
    },
  },
  mounted() {
    const storeApp = useAppStore();
    this.codigoSala = storeApp.codigoSala; 

    socket.on('usuarioUnido', (usuario) => { 
      this.usuarios.push(usuario);
    });

    socket.on('joinedRoom', (data) => {
      this.esCreador = data.esCreador;
    });

    socket.on('startGame', () => {
      this.$router.push({ name: 'Tablero' });
    });
    socket.on('usuarioUnido', (usuario) => {
    // Actualizar la lista de usuarios
    this.usuarios.push(usuario);
  });
}
};
</script>