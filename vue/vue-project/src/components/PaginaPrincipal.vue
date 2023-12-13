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

export default {
  data() {
    return {
      nombreUsuario: "",
      usuariosJuego: [], 
      nombreEscrito: false
    };
  },
  methods: {
    iniciarPartida() {
      const appStore = useAppStore();
      appStore.setNombre(this.nombreUsuario);

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
