<template>
    <div>
      <h1>Sala de Espera</h1>
      <div v-if="players.length < 4">
        <p>Esperando a que se unan más jugadores...</p>
      </div>
      <div v-else>
        <p>¡Todos los jugadores están listos! ¡Comencemos!</p>
        <router-link to="/TaulerView">Ir al Tablero</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { useSessionStore } from '@/stores/sessionStore';
  
  export default {
    computed: {
      players() {
        const sessionStore = useSessionStore();
        return sessionStore.players;
      },
    },
    watch: {
      players: {
        handler(players) {
          if (players.length === 4) {
          
            this.$router.push('/TaulerView');
          }
        },
        immediate: true,
      },
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  