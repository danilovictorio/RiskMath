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
        socket.emit('joinRoom', roomId);
        // Aquí podrías redirigir al usuario a la sala a la que se acaba de unir
        // Por ejemplo, si estás usando vue-router, podrías hacer algo como esto:
        // this.$router.push({ name: 'Sala', params: { id: roomId } });
      },
    },
  };
  </script>