import { io } from "socket.io-client";
import { useUserStore } from './path-to-your-user-store';

const URL = "http://alvaro.dam.inspedralbes.cat:3999";

export const socket = io(URL);

socket.on("actualizacionVotos", (newVotos) => {
  const userStore = useUserStore();
  userStore.setUsers(newVotos);
});


socket.on('UsuarioConectadoEvent', (event) => {
  const userStore = useUserStore();
  console.log('Usuario conectado:', event.usuario);
  userStore.addUser({ nombre: event.usuario });
});


socket.on('UsuarioDesconectadoEvent', (event) => {
  const userStore = useUserStore();
  console.log('Usuario desconectado:', event.usuario);
 
});
