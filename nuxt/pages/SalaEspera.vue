<template>
    <div>
      <h1>Sala de espera</h1>
      <ul>
        <li v-for="usuario in usuarios" :key="usuario.id">{{ usuario.nombre }}</li>
      </ul>
      <button v-if="esCreador" @click="iniciarPartida">Iniciar partida</button>
    </div>
  </template>
  
  <script>
  import { socket } from '@/utils/socket.js';
  
  export default {
    data() {
      return {
        usuarios: [],
        esCreador: false, // Deberías establecer esto en función de si el usuario actual es el creador de la sala
      };
    },
    methods: {
      iniciarPartida() {
        // Aquí podrías emitir un evento al servidor para iniciar la partida
        socket.emit('iniciarPartida');
      },
    },
    mounted() {
      // Aquí podrías escuchar a un evento del servidor que te informe cuando un nuevo usuario se une a la sala
      socket.on('usuarioUnido', (usuario) => {
        this.usuarios.push(usuario);
      });
    },
  };
  </script>