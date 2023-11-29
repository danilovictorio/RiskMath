<template>
  <div>
 
    <form @submit.prevent="unirseSala">
      <label for="nombre">Nombre del Jugador:</label>
      <input v-model="nombre" type="text" id="nombre" required>
      <button type="submit">Unirse</button>
    </form>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      nombre: '',
    };
  },
  methods: {
      unirseSala() {
   socket.emit('altaUser',nombre);


 
   socket.emit('jugadorUnido', { nombre: this.nombre, id: obtenerIdUsuario() });

  
},
  },
};
