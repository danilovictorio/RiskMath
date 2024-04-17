<template>
  <div>
    <h1>Sala de espera</h1>
    <p>Código de la sala: {{ codigoSala }}</p>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario.id">{{ usuario.nombre }} (ID: {{ usuario.id }})</li>
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
    const storeApp = useAppStore();

    this.codigoSala = storeApp.sala.id;
    console.log(this.codigoSala);
    this.sala = storeApp.sala;
    console.log(this.sala);

    // Emitir el evento 'unirseSala' y comenzar a escuchar el evento 'actualizarUsuarios'
    socket.emit('unirseSala', this.codigoSala, (response) => {
      if (response.success) {
        socket.on('actualizarUsuarios', (usuarios) => {
          this.usuarios = usuarios.map(id => ({ id, nombre: 'Usuario' + id }));
        });
      } else {
        // Manejar errores o mostrar un mensaje de error
        console.error(response.message);
      }
    });

    socket.on('joinedRoom', (data) => {
      this.esCreador = data.esCreador;
    });

    socket.on('startGame', () => {
      this.$router.push({ name: 'Tablero' });
    });
  },
};
</script>
