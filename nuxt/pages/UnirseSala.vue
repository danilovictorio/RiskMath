<template>
  <div>
    <h1>Unirse a sala</h1>
    <form @submit.prevent="unirseSala">
      <label for="linkSala">Enlace de la sala:</label>
      <input v-model="linkSala" id="linkSala" required>
      <button type="submit">Unirse a sala</button>
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
