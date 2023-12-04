<template>
    <div>
      <h1>Bienvenido a la Landing</h1>
      <div>
        <label for="userId">Ingresa tu ID de Usuario:</label>
        <input type="text" v-model="userId" />
        <button @click="iniciarJuego">Iniciar Juego</button>
      </div>
    </div>
  </template>
  
  <script>
  import { useSessionStore } from '@/stores/sessionStore';
  
  export default {
    data() {
      return {
        userId: null,
      };
    },
    methods: {
      iniciarJuego() {
        const sessionStore = useSessionStore();
        sessionStore.addPlayer({ id: this.userId });
  
       
        this.$router.push('/SalaEspera');
      },
    },
  };
  </script>
  
  <style scoped>
 
  </style>
  