/* 
  RUTAS PARA EXPORTAR SOCKETS
  En LOCAL : http://localhost:3123
  En PREPRODUCCIÓN : http://preprod.tr2g724.daw.inspedralbes.cat:3184
  En PRODUCCIÓN : http://tr2g724.daw.inspedralbes.cat:3123

  sustituir valor en variable constante:  URL
*/

// Importar el cliente Socket.io
import { io } from "socket.io-client";
import { useAppStore } from '../stores/app';

const URL = "http://localhost:3123"; 


export const socket = io(URL);

const colores = ['green','blue'];
socket.on('cambiarPrimerTurno', ({ turno_de, color }) => {
  console.log('Cambio de turno. ¿Es mi turno?', turno_de);
  const app= useAppStore();
  app.setTurno(turno_de);
  app.setColor(color);
  
});
socket.on('cambiarTurno', ({ turno_de, usuarios }) => {
  console.log('Cambio de turno. ¿Es mi turno?', turno_de);
  const app= useAppStore();
  app.setTurno(turno_de);
  if (app.turnoDe.nombre===usuarios[0].nombreUsuario) {
    console.log('entrandoooooo1')
    app.setColor(usuarios[1].color);
    console.log('así queda: ', app.getColor())
  }else{
    console.log("entrandooooooo2")
    app.setColor(usuarios[0].color)
    console.log('así queda: ', app.getColor())
  }
 

  
});
socket.on('finDelJuego', ({ ganador, empate }) => {
  const appStore = useAppStore();

  if (ganador) {
    console.log(`¡${ganador} es el ganador!`);
    appStore.setGanador(ganador); // Agrega un método en tu store para almacenar el ganador
  } else if (empate) {
    console.log('¡El juego ha terminado en empate!');
    appStore.setGanador(null); // Puedes manejar el empate según tus necesidades
  }
});

socket.on('peticion_jugar_aceptada', (datos) => {
  const appStore = useAppStore();
  appStore.setTurno(datos);
  console.log('Nos han aceptado la petición:', datos);

});
socket.on('rellenarColor',(colorTurno)=>{
  const appStore = useAppStore();
  appStore.setColor(colorTurno);
  console.log('color turno pinia actualizado',appStore.getColor())
});
socket.on('actualizacionUsuario', (datos) => {
  console.log('Han actualizado los usuarios', datos);
  const appStore = useAppStore();
  appStore.setUsuariosJuego(datos);
});
socket.on('actualizacionEstado', (datos) => {
  console.log('Han actualizado el estado', datos);
});
// socket.on('actualizarColor', (color1,color2) => {
//   const appStore = useAppStore();
//   appStore.setColor(color1);
//   appStore.setColor(color2);
//   console.log('Han actualizado el color', color1,color2);
// });
socket.on('comprobarColorActualMapa', ({ idPais, color, acertado,color0,color1 }) => {
  const paisElement = document.getElementById(idPais);
  const appStore = useAppStore();
  // if (appStore.turnoDe.color==color0) {
  //   appStore.setColor(color1);
  // }else{
  //   appStore.setColor(color0);
  // }
  if (paisElement) {
    if (acertado) {
      paisElement.style.fill = color;
    } else {
      const colorActual = paisElement.style.fill;

      if (colorActual !== color) {
        paisElement.style.fill = colorActual;
      }
    
    }
  }
});