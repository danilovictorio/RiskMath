// Importar el cliente Socket.io
import { io } from "socket.io-client";
import { useAppStore } from '../stores/app';

const URL = "http://localhost:3001"; 
const app= useAppStore();

export const socket = io(URL);


socket.on('cambiarTurno', ({ turno_de }) => {
  app.setNombre(turno_de);
  nombreUsuario=turno_de;
  console.log('Cambio de turno. ¿Es mi turno?', turno_de);
});

socket.on('peticion_jugar', (event) => {
  console.log('Nos han aceptado la petición:', event);
});

socket.on('actualizacionUsuario', (datos) => {
  console.log('Han actualizado los usuarios', datos);
});
socket.on('actualizacionEstado', (datos) => {
  console.log('Han actualizado el estado', datos);
});