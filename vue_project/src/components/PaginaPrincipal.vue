<template>
  <div class="container">
    <div v-if="!nombreEscrito" class="content">
      <h1>¡Inicia sesió!</h1>
      <input v-model="nombreUsuario" placeholder="Nom d'usuari" />
      <button @click="iniciarPartida">Iniciar Partida</button>
      <img src="../assets/info_icon.png" @click="popupInfo">
      <div class="superpuesto" id="superpuesto">
          <button @click="popoffInfo">x</button>
          <p>En "MultipliCAT", dos jugadors competeixen responent preguntes sobre mesures per conquerir territoris. Cada territori té una pregunta sobre sistemes de mesures. L'objectiu: guanyar responent correctament i dominar el món demostrant coneixements en unitats i conversions.</p>
      </div>
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
      ruta: 'http://localhost:8000'
    };
  },
  methods: {
    async iniciarPartida() {
      try {
      await this.borrarOcupantes(); // Espera a que se complete borrarOcupantes
      this.app.setNombre(this.nombreUsuario);
      socket.emit('peticion_jugar', { nombreUsuario: this.nombreUsuario });
      this.nombreEscrito = true;
    } catch (error) {
      console.error('Error al iniciar la partida:', error);
    }
    },
    async borrarOcupantes() {
    try {
      // Realiza una solicitud al servidor para borrar los ocupantes
      const response = await fetch(`${this.ruta}/api/borrar-ocupantes`, {
        method: 'POST', // O el método que estés utilizando en tu controlador
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);
      // Puedes realizar acciones adicionales después de borrar los ocupantes si es necesario
      console.log("DATOS BORRADOS DE OCUPANTES");
    } catch (error) {
      console.error('Error al borrar ocupantes:', error);
      throw error; // Puedes propagar el error para manejarlo en el bloque catch de iniciarPartida
    }
  },
  popupInfo(){
    var superpuesto = document.getElementById("superpuesto");
    superpuesto.classList.add("mostrar");
  },
  popoffInfo(){
    var superpuesto = document.getElementById("superpuesto");
    superpuesto.classList.remove("mostrar");
  }
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
  background-image: url('../assets/artwork.png');
  background-size: cover; /* Ajusta el tamaño de la imagen para cubrir completamente el contenedor */
  background-position: center; /* Centra la imagen en el contenedor */
  height: 100vh;
}

h1{
  color: #FA3030;
  font-family: impact;
  font-size: xx-large;
}
.content{
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  top: 27vh;
  right: 2.25%;
  /* height: 20vh; */
  width: 80vw;
  padding: 5px 16px;
  border: 2px solid #52C8FA;
  max-width: fit-content;
  height: auto;
}

img{
  max-height: 26px;
  max-width: 26px;
  padding-left: 250px;
  cursor: pointer;
}

.superpuesto {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  transform: translate(-50%, -50%) scale(0);
  padding: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  border-radius: 10px;
  border: 2px solid #52C8FA;
}

.superpuesto button {
  display: flex;
  height: 30px;
  width: 40px;
  margin-left: 200px;
}

.mostrar {
  display: block;
  transform: translate(-50%, -50%) scale(1);
  border-radius: 10px;
  border: 2px solid red;
}

input {
  padding: 10px;
  text-align: center;
  border-radius: 8px;
  border: 2px solid #000;
  margin-bottom: 7px;
  backdrop-filter: blur(10px);
  background-color: transparent;
  font-size: medium;
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
  font-size: medium;
}

button:hover {
  box-shadow: inset 0 0 0 50px #FA3030;
}
@media (min-width: 1620px) {
  .content{
    right: 4.65%;
  }

  .content{
    right: 4.65%;
  }
}

@media (min-width: 1720px) {
  .content{
    right: 10%;
  }
}

@media (orientation: portrait) {
  input::placeholder, button{
    font-size: large;
  } 
}
</style>