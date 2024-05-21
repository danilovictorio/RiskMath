<template>
  <div class="w-full h-full flex items-center justify-center bg-gray-900 p-8 sm:px-8 lg:px-8 rounded-lg">
    <div class="shadow-lg sm:rounded-lg rounded-lg bg-gray-800 p-6 rounded-lg">
      <h1 class="text-3xl font-bold text-center mb-4 text-green-300">Unirse a sala</h1>
      <div class="space-y-4">
        <div>
          <label for="linkSala" class="block text-sm font-medium text-gray-300">Enlace de la sala:</label>
          <input v-model="linkSala" id="linkSala" required class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-700 text-white">
        </div>
        <div>
          <button @click="unirseSala" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Unirse a sala</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { socket } from '@/utils/socket.js';
import { useAppStore } from '../stores/app.js';

export default {
  data() {
    return {
      linkSala: "",
      store: useAppStore(),
    };
  },
  methods: {
    unirseSala() {
      const nombreJugador = this.store.nombre;
      socket.emit('unirseSala', this.linkSala, nombreJugador, (response) => {
        if (response.success) {
          this.$router.push({ name: 'SalaEspera' });
        } else {
          console.error(response.message);
        }
      });
    },
    usuarioUnidoSalaHandler(data) {
      this.store.setSala(data.sala);
      console.log('Datos de la sala:', this.store.sala);
      console.log('Usuarios en la sala:', this.store.usuariosJuego.users);
    },
  },
  mounted() {
    socket.on('usuarioUnidoSala', this.usuarioUnidoSalaHandler);
  },
  beforeDestroy() {
    socket.off('usuarioUnidoSala', this.usuarioUnidoSalaHandler);
  },
};
</script>

<style>
body {
  background-color: #1A202C;
}
</style>
