<template>
  <div>
  <p class="text-center text-blue-700 mb-4">Aquí pots crear una nova sala per jugar amb els teus amics. <br>Només cal que introdueixis el nom de la sala i la capacitat màxima de jugadors.</p>

  <div class="flex flex-col items-center justify-center h-full">
    <div class="w-full flex items-center justify-center bg-blue-200 p-8 sm:px-8 lg:px-8 rounded-lg">
      <div class="shadow-lg sm:rounded-lg rounded-lg bg-blue-300 p-6 rounded-lg">
        <h1 class="text-3xl font-bold text-center mb-4 text-blue-600">Crear sala</h1>
        <form @submit.prevent="crearSala" class="space-y-4">
          <div>
            <label for="nombreSala" class="block text-sm font-medium text-blue-700">Nom de la sala:</label>
            <input v-model="nombreSala" id="nombreSala" required class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-blue-200 rounded-md bg-blue-100 text-blue-800">
          </div>

          <div>
            <label for="capacidadSala" class="block text-sm font-medium text-blue-700">Capacitat de la sala:</label>
            <input v-model="capacidadSala" id="capacidadSala" type="number" min="2" max="4" required class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-blue-200 rounded-md bg-blue-100 text-blue-800">
          </div>

          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Crear sala</button>
          </div>
        </form>
        <p v-if="link" class="text-center text-sm text-blue-700">Enllaç de la sala: {{ link }}</p>
      </div>
    </div>
    <div class="mt-4">
      <button @click="goBack" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Enrere</button>
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
      nombreSala: '',
      capacidadSala: 2,
      link: '',
      codigoSala: '',
    };
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    crearSala() {
      const storeApp = useAppStore();
      storeApp.esCreador = true;
      const nombreJugador = storeApp.nombre;
      socket.emit('crearSala', { nombreSala: this.nombreSala, nombreJugador: nombreJugador, capacidadSala: this.capacidadSala });
      this.$router.push({ name: 'SalaEspera' });
    },
  },
};
</script>

<style>
body {
  background-color: #badefc;
}
</style>