<template>
  <div class="w-full h-full flex flex-col items-center justify-center bg-blue-200 p-8 sm:px-8 lg:px-8 rounded-lg">
    <div class="mb-4 text-center bg-blue-300 p-6 rounded-lg">
      <p class="text-blue-600">Aquí puedes unirte a una sala existente ingresando el enlace de la sala.</p>
    </div>
    <div class="shadow-lg sm:rounded-lg rounded-lg bg-blue-300 p-6 rounded-lg">
      <h1 class="text-3xl font-bold text-center mb-4 text-blue-600">Unirse a sala</h1>
      <div class="space-y-4">
        <div>
          <label for="linkSala" class="block text-sm font-medium text-blue-700">Enlace de la sala:</label>
          <input v-model="linkSala" id="linkSala" required class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-blue-200 rounded-md bg-blue-100 text-blue-800">
        </div>
        <div>
          <button @click="unirseSala" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Unirse a sala</button>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <button @click="goBack" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Atrás</button>
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
    goBack() {
      this.$router.push('/');
    },
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

    },
  },
  mounted() {
    socket.on('usuarioUnidoSala', this.usuarioUnidoSalaHandler);
    document.body.classList.add('bg-blue-200');
  },
  beforeDestroy() {
    socket.off('usuarioUnidoSala', this.usuarioUnidoSalaHandler);
    
  },
};
</script>

<style>
body {
  background-color: #bfd4ff;
}
</style>
