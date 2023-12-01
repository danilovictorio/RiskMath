<template>
    <div>
      <div>
        SOY LA PAGINA PRINCIPAL
      </div>
      <div>
        <input v-model="user" />
      </div>
      <div>
        <button @click="crearSalaEspera()">Iniciar</button>
      </div>
      <div>
        <h2>Usuarios Conectados:</h2>
        <ul>
          <li v-for="usuario in $store.state.usuariosConectados" :key="usuario.id">
            {{ usuario.nombre }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import io from 'socket.io-client';
  import { useStore } from '@/store'; 
  
  export default {
    setup() {
      const user = ref('');
      const socket = ref(null);
      const store = useStore();
  
      const crearSalaEspera = () => {
        socket.value = io('http://localhost:4532');
  
        socket.value.on('connect', () => {
          console.log('Conectado al servidor de sockets');
          socket.value.emit('usuario-conectado', { nombre: user.value });
        });
  
        socket.value.on('disconnect', () => {
          console.log('Desconectado del servidor de sockets');
        });
  
        socket.value.on('usuario-conectado', (data) => {
          console.log(`Usuario conectado: ${data.nombre}`);
          store.agregarUsuario(data);
        });
      };
  
      onMounted(() => {
       
      });
  
      return {
        user,
        socket,
        crearSalaEspera,
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  </style>
  