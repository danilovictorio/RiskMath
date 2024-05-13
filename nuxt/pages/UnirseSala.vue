<template>
  <div class="w-full h-full flex items-center justify-center bg-gray-900 p-8 sm:px-8 lg:px-8 rounded-lg">
    <div class="shadow-lg sm:rounded-lg rounded-lg bg-gray-800 p-6 rounded-lg">
      <h1 class="text-3xl font-bold text-center mb-4 text-green-300">Unirse a sala</h1>
      <form @submit.prevent="unirseSala" class="space-y-4">
        <div>
          <label for="linkSala" class="block text-sm font-medium text-gray-300">Enlace de la sala:</label>
          <input v-model="linkSala" id="linkSala" required class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-700 text-white">
        </div>
        <div>
          <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Unirse a sala</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { socket } from '@/utils/socket.js';
import { ref, onMounted } from 'vue';
import { useAppStore } from '../stores/app.js';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const linkSala = ref('');
    const store = useAppStore();
    const router = useRouter();

    const unirseSala = () => {
       const nombreJugador = store.nombre
      socket.emit('unirseSala', linkSala.value, nombreJugador, (response) => {
        if (response.success) {
          router.push({ name: 'SalaEspera' });
        } else {
          console.error(response.message);
        }
      });
    };

   

    return {
      linkSala,
      unirseSala,
    };
  },
};
</script>
<style>
body {
  background-color: #1A202C;
}
</style>