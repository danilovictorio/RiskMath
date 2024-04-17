<template>
  <div>
    <h1>Sala de espera</h1>
    <h3>{{ sala.nombre }}</h3>
    <p>Código de la sala: {{ sala.id }}</p>
    <p>Usuarios en la sala:</p>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario.id">ID: {{ usuario.id }}</li>
    </ul>
    <button v-if="esCreador" @click="iniciarPartida">Iniciar partida</button>
  </div>
</template>

<script>
import { socket } from '@/utils/socket.js';
import { useAppStore } from '../stores/app.js';

export default {
  data() {
    return {
      usuarios: [],
      esCreador: false,
      codigoSala: '',
      sala: {},
    };
  },
  methods: {
    iniciarPartida() {
      socket.emit('iniciarPartida', this.$route.params.id);
    },
  },
  mounted() {
    // Escuchar el evento 'salaCreada' y actualizar la sala
    socket.on('salaCreada', (data) => {
      console.log('Datos recibidos:', data);
      this.sala = data.sala;
      this.usuarios = data.sala.jugadores;
      console.log('Sala creada:', this.sala);
    });

    // Escuchar el evento 'usuarioUnidoSala' y actualizar la lista de usuarios
    socket.on('usuarioUnidoSala', (data) => {
      this.sala = data.sala;
      this.usuarios = data.usuarios;
      console.log('Usuarios en la sala:', this.usuarios);
    });

    // Escuchar el evento 'joinedRoom' para determinar si el usuario es el creador de la sala
    socket.on('joinedRoom', (data) => {
      this.esCreador = data.esCreador;
    });

    // Escuchar el evento 'startGame' para redirigir al tablero cuando se inicie la partida
    socket.on('startGame', () => {
      this.$router.push({ name: 'Tablero' });
    });
  },
};
</script>
