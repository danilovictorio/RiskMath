<!-- RUTAS PARA FETCH A LARAVEL
  En LOCAL : http://localhost:8000
  En PREPRODUCCIÓN : http://preprod.tr2g724.daw.inspedralbes.cat/laravel/public
  En PRODUCCIÓN : http://tr2g724.daw.inspedralbes.cat/laravel/public

  sustituir valor en variable global:  ruta
 -->

 <template>
  <div class="w-screen h-screen flex items-center justify-center bg-center bg-cover bg-no-repeat" style="background-image: url('/mapaRisk.jpg');">
   <div class="login-container" v-if="!nombreEscrito">
      <h2>Risk Math</h2>
      <div class="input-container">
        <input v-model="nombreUsuario" />
        <label for="nombreUsuario">Nombre de usuario</label>
      </div>
      <button @click="crearSala">Crear sala</button>
      <button @click="unirseSala">Unirse a sala</button>

      <img src="../public/info_icon.png" @click="popupInfo" class="info-icon">
      <div class="superpuesto" id="superpuesto">
        <button @click="popoffInfo" class="poppup_btn">x</button>
        <p>En "MultipliCAT", dos jugadors competeixen responent preguntes sobre mesures per conquerir
          territoris. Cada
          territori té una pregunta sobre sistemes de mesures. L'objectiu: guanyar responent correctament i
          dominar el món
          demostrant coneixements en unitats i conversions.</p>
      </div>
    </div>
    <div class="contador" v-if="this.mostrarContador">
      CONTADOR:{{ this.countdown }}
    </div>
  </div>
</template>

<script>
import { socket } from '@/utils/socket.js';
import { useAppStore } from '../stores/app';

export default {
  data() {
    return {
      nombreUsuario: null,
      nombreEscrito: false,
      app: useAppStore(),
      user: "",
      ruta: 'http://localhost:8000',
      countdown: 0,
      mostrarContador: false,
      link: '',
    };
  },
  methods: {
    async iniciarPartida() {
      try {
        
        this.app.setNombre(this.nombreUsuario);

        if (this.usuariosJuego.length >= 2) {
          this.startCountdown();
        }

        socket.emit('peticion_jugar', { nombreUsuario: this.nombreUsuario }, roomId);
        this.nombreEscrito = true;
      } catch (error) {
        console.error('Error al iniciar la partida:', error);
      }
    },
    async startCountdown() {
      this.mostrarContador = true;
      this.countdown = 3;

      const timer = setInterval(() => {
        this.countdown--;

        console.log(this.countdown);
        if (this.countdown === 0) {

          clearInterval(timer);

          this.$router.push({ name: 'TaulerView' });
        }
      }, 1000);
    },
    async borrarOcupantes() {
      try {

        const response = await fetch(`${this.ruta}/api/borrar-ocupantes`, {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);

        console.log("DATOS BORRADOS DE OCUPANTES");
      } catch (error) {
        console.error('Error al borrar ocupantes:', error);
        throw error;
      }
    },
    popupInfo() {
      var superpuesto = document.getElementById("superpuesto");
      superpuesto.classList.add("mostrar");
    },
    popoffInfo() {
      var superpuesto = document.getElementById("superpuesto");
      superpuesto.classList.remove("mostrar");
    },
    crearSala() {
      if (this.nombreUsuario==null) {
       alert("Introduce un nombre de usuario");
      } else {
      let store = useAppStore();
      store.setNombre(this.nombreUsuario);
      this.$router.push({ name: 'CrearSala' });
      }
    },
    unirseSala() {
      if (this.nombreUsuario==null) {
       alert("Introduce un nombre de usuario");
      } else {
        let store = useAppStore();
        store.setNombre(this.nombreUsuario);
        this.$router.push({ name: 'UnirseSala' });
      }
    },
  },
  mounted() {
    socket.on('actualizacionUsuario', (usuarios) => {
      console.log('Usuarios actualizados:', usuarios);
      this.usuariosJuego = usuarios;
      if (this.usuariosJuego.length >= 2) {
        this.startCountdown();
      }
    });
  },
};
</script>

<style lang="css" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url(../public/mapaRisk.jpg) no-repeat center center fixed;
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
  width: 60%;
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

img.info-icon {
  cursor: pointer;
  position: fixed;
  bottom: 60px;
  right: 30px;
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
  background-color: beige;
  border-radius: 10px;
  border: 2px solid #52C8FA;
}


.superpuesto button {
  display: flex;
  height: 30px;
  width: 40px;
  justify-content: center;
  align-items: center;

}

.mostrar {
  display: block;
  transform: translate(-50%, -50%) scale(1);
  border-radius: 10px;
  border: 2px solid red;
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

.contador {
  padding: 50px;

}

.contador {
  font-size: 2.3rem;
  text-align: center;
  border-radius: 50%;
  backdrop-filter: blur(5px);
  border: 3px solid #fff;
  color: #fff;
}
</style>