<template>
  <div class="container">
    <div v-if="!nombreEscrito" class="content">
      <h1>¡Inicia sesion!</h1>
      <input v-model="nombreUsuario" placeholder="Nombre de usuario" />
      <button @click="iniciarPartida">Iniciar Partida</button>
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
     console.log("nombre",this.nombreUsuario);
      console.log("nompinia",this.app.nombre);
     //console.log("turno de",this.app.turnoDe.nombre);
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

<style lang="css" scoped>
.container {
  display: grid;
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */
  /* padding: 0; */
  place-items: center;
  /* margin-left: 0; */
  font-family: Arial, sans-serif;
}

h1{
  color: #FA3030;
  font-family: impact;
}
.content{
  position: relative;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  top: 27vh;
  height: 20vh;
  width: 80vw;
  padding: 5px 16px;
  border: 2px solid #52C8FA;
  max-width: fit-content;
  height: auto;
}

input {
  padding: 10px;
  text-align: center;
  border-radius: 8px;
  border: 2px solid #000;
  margin-bottom: 7px;
  backdrop-filter: blur(10px);
  background-color: transparent;
}

input::placeholder {
  font-weight: bold;
  color: #000;
}


button {
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: 0.5s ease;
  background-color: transparent;
  font-weight: bold;
}

button:hover {
  box-shadow: inset 0 0 0 50px #FA3030;
}

</style>