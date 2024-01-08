/* 
  RUTAS PARA EXPORTAR SOCKETS
  En LOCAL : http://localhost:3123
  En PREPRODUCCIÓN : http://preprod.tr2g724.daw.inspedralbes.cat:3123
  En PRODUCCIÓN : http://tr2g724.daw.inspedralbes.cat:3123

  sustituir valor en variable constante:  URL
*/

// Importar el cliente Socket.io
import { io } from "socket.io-client";
import { useAppStore } from '../stores/app';

const URL = "http://localhost:3123"; 


export const socket = io(URL);


socket.on('cambiarTurno', ({ turno_de, idPais, color }) => {
  console.log('Cambio de turno. ¿Es mi turno?', turno_de);
  const app= useAppStore();
  app.setTurno(turno_de);
  const paisElement = document.getElementById(idPais);
  
  if (paisElement) {
    paisElement.style.fill = color;
  }
});

socket.on('peticion_jugar_aceptada', (datos) => {
  const appStore = useAppStore();
  appStore.setTurno(datos);
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
socket.on('actualizarColor', (color1,color2) => {
  const appStore = useAppStore();
  appStore.setColor(color1);
  appStore.setColor(color2);
  console.log('Han actualizado el color', color1,color2);
});
