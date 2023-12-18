<template>
  <div>
    <h1>SOY LA PAGINA PRINCIPAL</h1>
    <div v-if="!nombreEscrito">
      <button @click="iniciarPartida">Iniciar Partida</button>
      <input v-model="nombreUsuario" placeholder="Nombre de usuario" />
    </div>
    <ul>
      <li v-for="usuario in usuariosJuego" :key="usuario.id">{{ usuario.nombreUsuario }}</li>
    </ul>
  </div>
</template>

<script>
import { socket } from '@/utils/socket.js';
import { useAppStore } from '../stores/app';

export default {
  data() {
    return {
      nombreUsuario: "",
      usuariosJuego: [], 
      nombreEscrito: false,
      app: useAppStore(),
      user: "",
    };
  },
  methods: {
    iniciarPartida() {
     // const appStore = useAppStore();
      this.app.setNombre(this.nombreUsuario);
      socket.emit('peticion_jugar',  { nombreUsuario: this.nombreUsuario });
      this.nombreEscrito = true;
    },
  },
  mounted() {  
    socket.on('actualizacionUsuario', (usuarios) => {
      console.log('Usuarios actualizados:', usuarios);
      this.usuariosJuego = usuarios;
      if (this.usuariosJuego.length >= 2) {
        console.log('Redireccionando a TaulerView...');
        this.$router.push({ name: 'TaulerView' });
      }
    });
  },
};
</script>

<style lang="scss" scoped></style>
