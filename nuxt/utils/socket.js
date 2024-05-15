// Importar el cliente Socket.io
import { io } from "socket.io-client";
import { useAppStore } from '../stores/app';
import { onMounted, onUnmounted } from 'vue';

const url = 'http://localhost:3123';
//const url = 'http://trfinal.a17danvicfer.daw.inspedralbes.cat:3123'; //producción

export const socket = io(url);

const colores = ['green','blue'];


socket.on('startGame', () => { 
  // Aquí puedes agregar código para manejar el inicio del juego
});

socket.on('salaCreada', (data) => {
  let store = useAppStore();
  console.log('Datos recibidos:', data);
  store.setSala(data.sala);
  store.setpaisesConquistados(data.sala.recuentoPaises);
  console.log('Sala creada:', store.sala);
});

socket.on('salas', (salas) => {
  let store = useAppStore();
  console.log('Salas recibidas:', salas);
  if (store.sala) {
    const sala = salas.find(s => s.id === store.sala.id);
    if (sala) {
      store.setSala(sala);
      console.log('Sala guardada en Pinia:', store.sala);
    }
  }
});

socket.on('usuarioUnidoSala', (data) => {
  let store = useAppStore();
  store.setSala(data.sala);
  store.setpaisesConquistados(data.sala.recuentoPaises);
  console.log('Datos de la sala DE UNIDO SALA:', store.sala);
});

socket.on('cambiarPrimerTurno', ({ turno_de }) => {
  const appStore = useAppStore();
  appStore.setTurno(turno_de);
  console.log('Cambio PRIMER de turno. ¿Es mi turno?', turno_de);
});

socket.on('cambiarTurno', ({ turno_de, usuarios }) => {
  console.log('Cambio de turno. ¿Es mi turno?', turno_de);
  const appStore = useAppStore();
  appStore.setTurno(turno_de);
  if (appStore.turnoDe.nombre === usuarios[0].nombre) {
    console.log('entrandoooooo1');
    appStore.setColor(usuarios[0].color);
    console.log('así queda: ', appStore.getColor());
  } else {
    console.log("entrandooooooo2");
    appStore.setColor(usuarios[1].color);
    console.log('así queda: ', appStore.getColor());
  }
});
socket.on('marcarTerritorio', ({ paisId }) => {
  console.log(`¡Territorio ${paisId}! con color gris`);
  const paisElement = document.getElementById(paisId);
  if (paisElement) {
    paisElement.style.fill = 'grey ';
  }
});

socket.on('paisesConquistados', (recuentoPaises) => {
  const appStore = useAppStore();
  appStore.setpaisesConquistados(recuentoPaises);
});

socket.on('respuestaCorrecta', ({ paisId, jugador, color }) => {
  console.log(`¡${jugador} ha conquistado ${paisId}! con color ${color}`);
  const paisElement = document.getElementById(paisId);
  if (paisElement) {
    paisElement.style.fill = color;
  }
});

socket.on('mostrarPreguntas', (preguntas) => {
  const appStore = useAppStore();
  appStore.setMostrarPreguntas(true);
  appStore.setPreguntas(preguntas);
  console.log('Mostrar preguntas SOCKETCLIENT:', appStore.mostrarPreguntas);
});

socket.on('mostrarPreguntasDuelo', (preguntas) => {
  const appStore = useAppStore();
  appStore.setMostrarPreguntas(true);
  appStore.setPreguntas(preguntas);
  appStore.setDuelo(true);
  console.log('Mostrar preguntas duelo SOCKETCLIENT:', appStore.mostrarPreguntas);
});

socket.on('ocultarPreguntas', () => {
  const appStore = useAppStore();
  appStore.setMostrarPreguntas(false);
  console.log('Ocultar preguntas SOCKETCLIENT:', appStore.mostrarPreguntas);
});
socket.on('dueloAcabado', () => {
  const appStore = useAppStore();
  appStore.setDuelo(false);
  console.log('Duelo preguntas terminado SOCKETCLIENT:', appStore.mostrarPreguntas);
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
  console.log('1r color turno pinia actualizado',appStore.getColor());
});

socket.on('actualizacionUsuario', (datos) => {
  console.log('Han actualizado los usuarios', datos);
  const appStore = useAppStore();
  appStore.setUsuariosJuego(datos);
});

socket.on('actualizacionEstado', (datos) => {
  console.log('Han actualizado el estado', datos);
});