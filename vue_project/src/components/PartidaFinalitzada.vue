<template>
    <div class="container">
     <div class="guanyador">FELICITATS!!! EL GUANYADOR DE LA PARTIDA HA ESTAT : (NOM)</div>
     <div class="perdedor">HAS PERDUT......(NOM) </div>
    </div>
  </template>
  
  
  <script>
  import { socket } from '@/utils/socket.js';
  import { useAppStore } from '../stores/app';
  
  export default {
    data() {
      return {
   
        ruta: 'http://localhost:8000'
      };
    },
    methods: {
      
    },
  
    mounted() {
     
    },
  };
  </script>
  
  <style lang="css" scoped>

  </style>