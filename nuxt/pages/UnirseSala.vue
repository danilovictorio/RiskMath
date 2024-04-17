<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
    <h1 class="text-2xl text-gray-700 mb-5">Unirse a sala</h1>
    <form @submit.prevent="unirseSala" class="flex flex-col w-72 space-y-2">
      <label for="linkSala" class="text-lg text-gray-600">Enlace de la sala:</label>
      <input v-model="linkSala" id="linkSala" required class="p-2 text-base border border-gray-300 rounded">
      <button type="submit" class="p-2 text-white bg-blue-500 rounded cursor-pointer transition-colors duration-300 hover:bg-blue-700">Unirse a sala</button>
    </form>
  </div>
</template>

<script>
import { socket } from '@/utils/socket.js';

export default {
  data() {
    return {
      linkSala: '',
    };
  },
  methods: {
    unirseSala() {
      const roomId = this.linkSala.split('/').pop();
      socket.emit('unirseSala', roomId, (response) => {
        if (response.success) {
          this.$router.push({ name: 'SalaEspera', params: { id: roomId } });
        } else {
          // Manejar errores o mostrar un mensaje de error
          console.error(response.message);
        }
      });
    },
  },
};
</script>
