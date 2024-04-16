<!-- RUTAS PARA FETCH A LARAVEL
  En LOCAL : http://localhost:8000
  En PREPRODUCCIÓN : http://preprod.tr2g724.daw.inspedralbes.cat/laravel/public
  En PRODUCCIÓN : http://tr2g724.daw.inspedralbes.cat/laravel/public

  sustituir valor en variable global:  ruta
 -->

 <template>
    <div class="container">
     <div class="result-container">
       <h1>¡El ganador es:</h1>
       <h1 class="ganador">{{ ganador }}</h1>
     </div>
   </div>
 </template>
 
 <script>
 import { socket } from "@/utils/socket.js";
 import { useAppStore } from "../stores/app";
 
 export default {
   data() {
     return {
       nombreUsuario: "",
       usuariosJuego: [],
       nombreEscrito: false,
       app: useAppStore(),
       user: "",
       ganador: "",
       ruta: "http://localhost:8000",
     };
   },
   methods: {
     async iniciarPartida() {
       try {
         await this.borrarOcupantes(); // Espera a que se complete borrarOcupantes
         this.app.setNombre(this.nombreUsuario);
         socket.emit("peticion_jugar", { nombreUsuario: this.nombreUsuario });
         this.nombreEscrito = true;
       } catch (error) {
         console.error("Error al iniciar la partida:", error);
       }
     },
     async borrarOcupantes() {
       try {
         // Realiza una solicitud al servidor para borrar los ocupantes
         const response = await fetch(`${this.ruta}/api/borrar-ocupantes`, {
           method: "POST", // O el método que estés utilizando en tu controlador
         });
 
         if (!response.ok) {
           throw new Error(`Error en la solicitud: ${response.status}`);
         }
 
         const data = await response.json();
         console.log(data.message);
         // Puedes realizar acciones adicionales después de borrar los ocupantes si es necesario
         console.log("DATOS BORRADOS DE OCUPANTES");
       } catch (error) {
         console.error("Error al borrar ocupantes:", error);
         throw error; // Puedes propagar el error para manejarlo en el bloque catch de iniciarPartida
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
   },
 
   mounted() {
     socket.on("actualizacionUsuario", (usuarios) => {
       console.log("Usuarios actualizados:", usuarios);
       this.usuariosJuego = usuarios;
       if (this.usuariosJuego.length >= 2) {
         console.log("Redireccionando a TaulerView...");
         this.$router.push({ name: "TaulerView" });
       }
     });
 
     this.ganador = this.$route.params.usuarioGanador;
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
   background: url(../assets/mapaRisk.jpg) no-repeat center center fixed;
   background-position: center;
   background-size: cover;
   object-fit: cover;
 }
 /* Estilos adicionales para el mensaje del ganador */
 .ganador {
   color: #28a745; /* Color verde, puedes cambiarlo según tu preferencia */
   font-size: 2.5rem;
   font-weight: bold;
   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Sombra para resaltar el texto */
 }
 .result-container {
   text-align: center;
   background-color: rgba(255, 255, 255, 0.8);
   padding: 20px;
   border-radius: 10px;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
   margin-top: 20px;
 }
 
 .result-container h1 {
   color: #333; /* Cambia el color del texto según tu preferencia */
   font-size: 2rem;
   margin-bottom: 10px;
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
 
 .input-container input:focus ~ label,
 .input-container input:valid ~ label {
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
   transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
   border-radius: 10px;
   border: 2px solid #52c8fa;
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
 </style>