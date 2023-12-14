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
import { useAppStore } from '@/stores/app.js';
import { socket } from '@/utils/socket.js';
import { useAppStore } from '../stores/app';

export default {
  data() {
    return {
      nombreUsuario: "",
      usuariosJuego: [], 
      nombreEscrito: false,
      user:nombreUsuario
    };
  },
  methods: {
    iniciarPartida() {
      const appStore = useAppStore();
      socket.emit('peticion_jugar', { nombreUsuario: appStore.usuario.nombre});
      this.nombreEscrito=true;
     
    },
    
  },
  mounted() {  
    socket.on('actualizacionUsuario', (usuarios) => {
      this.usuariosJuego = usuarios;
      if (this.usuariosJuego.length>=2) {
         this.$router.push({ name: "TaulerView" });
      }
    });
  },
};
</script>

<style lang="scss" scoped></style>
