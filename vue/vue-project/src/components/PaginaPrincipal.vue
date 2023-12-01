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
          <li v-for="usuario in usuariosConectados" :key="usuario.id">
            {{ usuario.nombre }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  
  export default {
    data() {
      return {
        user: '',
        socket: null,
      };
    },
    methods: {
      crearSalaEspera() {
        this.socket = io('http://localhost:4532');
  
        this.socket.on('connect', () => {
          console.log('Conectado al servidor de sockets');
          this.socket.emit('usuario-conectado', { nombre: this.user });
        });
  
        this.socket.on('disconnect', () => {
          console.log('Desconectado del servidor de sockets');
        });
  
       
        this.socket.on('usuario-conectado', (data) => {
          console.log(`Usuario conectado: ${data.nombre}`);
     
          this.$store.commit('agregarUsuario', data);
        });
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  </style>
  