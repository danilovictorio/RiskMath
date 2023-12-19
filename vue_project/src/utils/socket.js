// Importar el cliente Socket.io
import { io } from "socket.io-client";
import { useAppStore } from '../stores/app';

const URL = "http://localhost:3001"; 


export const socket = io(URL);


socket.on('cambiarTurno', ({ turno_de }) => {
  const app= useAppStore();
  app.setNombre(turno_de);
  console.log('Cambio de turno. le toca a :', turno_de);
});

socket.on('peticion_jugar_aceptada', (datos) => {
  const appStore = useAppStore();
  appStore.setNombre(datos);
  console.log('Nos han aceptado la petición:', datos);

});

socket.on('actualizacionUsuario', (datos) => {
  console.log('Han actualizado los usuarios', datos);
  const appStore = useAppStore();
  appStore.setUsuariosJuego(datos);
});
socket.on('actualizacionEstado', (datos) => {
  console.log('Han actualizado el estado', datos);
});