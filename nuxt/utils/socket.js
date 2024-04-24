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

// Emitir eventos para crear y unirse a salas
 
//Deberías mover estos a funciones o métodos que puedas llamar en respuesta a acciones del usuario
// socket.emit('createRoom', 2); // Crear una sala con capacidad para 2 jugadores
// socket.emit('joinRoom', 'roomId'); // Unirse a la sala con el ID 'roomId'

// Escuchar el evento 'startGame' para saber cuándo ha comenzado el juego
socket.on('startGame', () => { 
  // Aquí puedes agregar código para manejar el inicio del juego
});
socket.on('salaCreada', (data) => {
  let store = useAppStore();
  console.log('Datos recibidos:', data);
  store.setSala(data.sala);
  console.log('Sala creada:', store.sala);
});
socket.on('salas', (salas) => {
  let store = useAppStore();
  console.log('Salas recibidas:', salas);
  if (store.sala) {
    const sala = salas[store.sala.id];
    if (sala) {
      store.setSala(sala);
      console.log('Sala guardada en Pinia:', store.sala);
    }
  }
})
socket.on('usuarioUnidoSala', (data) => {
  let store = useAppStore();
  store.setSala(data.sala);
  console.log('Datos de la sala DE UNIDO SALA:', store.sala);
});


const usuarioUnidoSalaHandler = (data) => {
  store.setSala(data.sala);
  console.log('Datos de la sala:', store.sala);
  console.log('Usuarios en la sala:', store.usuariosJuego.users);
};

onMounted(() => {
  socket.on('usuarioUnidoSala', usuarioUnidoSalaHandler);
});

onUnmounted(() => {
  socket.off('usuarioUnidoSala', usuarioUnidoSalaHandler);
});

socket.on('cambiarPrimerTurno', ({ turno_de, color }) => {
  const appStore = useAppStore();
  appStore.setTurno(turno_de);
  appStore.setColor(color);
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

socket.on('peticion_jugar_aceptada', (jugador) => {
  const appStore = useAppStore();
  appStore.setTurno(jugador.nombre);
  appStore.setColor(jugador.color);
  console.log('Nos han aceptado la petición:', jugador);

});
socket.on('rellenarColor',(colorTurno)=>{
  const appStore = useAppStore();
  appStore.setColor(colorTurno);
  console.log('1r color turno pinia actualizado',appStore.getColor())
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