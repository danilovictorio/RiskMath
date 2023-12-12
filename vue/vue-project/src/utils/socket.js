//socket.js
import { io } from "socket.io-client";
import { useUserStore } from '@/stores/useUserStore.js';

const URL = "http://localhost:3001"; 

export const socket = io(URL);

//const userStore = useUserStore();

socket.on('peticion_recibida', (event) => {
  console.log('Nos han aceptado la peticion:');
//  userStore.addUser({ nombre: event.usuario });
});

socket.on('actualizacionUsuario', (datos) => {
  console.log('han actualizado los usuarios', datos);
//  userStore.removeUser(event.usuario); 
});


