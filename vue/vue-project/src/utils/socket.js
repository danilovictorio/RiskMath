// Importar el cliente Socket.io
import { io } from "socket.io-client";

// URL del servidor de Socket.io
const URL = "http://localhost:3001"; 

// Crear el objeto socket
export const socket = io(URL);

// Escuchar el evento de desconexión
socket.on('disconnect', () => {
  console.log('Se ha desconectado del servidor');
});

// Escuchar otros eventos según sea necesario
socket.on('peticion_recibida', (event) => {
  console.log('Nos han aceptado la petición:', event);
});

socket.on('actualizacionUsuario', (datos) => {
  console.log('Han actualizado los usuarios', datos);
});
