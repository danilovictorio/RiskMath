<template>
  <div class="container">
    <div class="login-container" v-if="!nombreEscrito">
      <h2>Iniciar sesión</h2>
      <div class="input-container">
        <input v-model="nombreUsuario" />
        <label for="nombreUsuario">Nombre de usuario</label>
      </div>
      <button class="login-btn" @click="iniciarPartida">Iniciar Partida</button>
    </div>
    <h3 v-for="usuario in usuariosJuego" :key="usuario.id">{{ usuario.nombreUsuario }}</h3>
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

@import url(../assets/normalise.css);

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url(../assets/mapaRisk.jpg) no-repeat center center fixed;
  background-position: center;
  background-size: cover;
  object-fit: cover;
}


.login-container {
  position: relative;
  width: 350px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-container h2 {
  font-size: 2.3rem;
  color: #fff;
  text-align: center;
}

.input-container {
  position: relative;
  margin: 30px 0;
  width: 300px;
  border-bottom: 2px solid #fff;
}

.input-container label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  color: #fff;
  font-size: 1rem;
  pointer-events: none;
  transition: 0.6s;
  font-weight: bold;
}

.input-container input {
  width: 100%;
  height: 50px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 5px 0;
  color: #fff;
}

.input-container input:focus~label,
.input-container input:valid~label {
  top: -5px;
}

.login-btn {
  width: 80%;
  height: 45px;
  border-radius: 40px;
  background-color: #fff;
  border: none;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  font-size: 1rem;
  transition: 0.4s;
}

.login-btn:hover {
  opacity: 0.9;
  background-color: #000;
  color: #fff;
}


/* button {}

button:hover {
  box-shadow: inset 0 0 0 50px #FA3030;
}

@media (min-width: 1620px) {
  .content {
    right: 4.65%;
  }

  .content {
    right: 4.65%;
  }
}

@media (min-width: 1720px) {
  .content {
    right: 10%;
  }
}

@media (orientation: portrait) {

  input::placeholder,
  button {
    font-size: large;
  }
} */
</style>