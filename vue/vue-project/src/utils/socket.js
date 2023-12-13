// Importar el cliente Socket.io
import { io } from "socket.io-client";


const URL = "http://localhost:3001"; 


export const socket = io(URL);

socket.esMiTurno = false;

socket.on('disconnect', () => {
  console.log('Se ha desconectado del servidor');
});

socket.on('peticion_recibida', (event) => {
  console.log('Nos han aceptado la petición:', event);
});

socket.on('actualizacionUsuario', (datos) => {
  console.log('Han actualizado los usuarios', datos);
});
