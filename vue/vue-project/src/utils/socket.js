// Importar el cliente Socket.io
import { io } from "socket.io-client";


const URL = "http://localhost:3001"; 


export const socket = io(URL);


socket.on('cambiarTurno', ({ turno_de }) => {

  console.log('Cambio de turno. ¿Es mi turno?', turno_de);
});


socket.on('peticion_jugar', (event) => {
  console.log('Nos han aceptado la petición:', event);
});

socket.on('actualizacionUsuario', (datos) => {
  console.log('Han actualizado los usuarios', datos);
});
