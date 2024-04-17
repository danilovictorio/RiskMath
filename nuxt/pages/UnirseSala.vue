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
      // Emitir el evento 'unirseSala' con el ID de la sala
      socket.emit('unirseSala', this.linkSala, (response) => {
        if (response.success) {
          // Si la unión a la sala fue exitosa, redirigir a la Sala de Espera
          this.$router.push({ name: 'SalaEspera' });
        } else {
          // Manejar caso de error, por ejemplo, mostrar un mensaje al usuario
          console.error(response.message);
        }
      });
    },
  },
};
</script>
