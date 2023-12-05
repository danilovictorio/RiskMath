<template>
  <div>
    <h1>SOY LA PAGINA PRINCIPAL</h1>
    <button @click="iniciarPartida">Iniciar Partida</button>
    <input v-model="nombreUsuario" placeholder="Nombre de usuario" />
  </div>
</template>

<script>
import socket from '@/path/to/sockets'; 

export default {
  data() {
    return {
      nombreUsuario: "",
    };
  },
  methods: {
    iniciarPartida() {
      const apiUrl = 'http://localhost:8000/api/iniciar-partida';

      const datos = {
        nombreUsuario: this.nombreUsuario
      };

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos) 
      })
        .then(response => response.json())
        .then(result => {
          console.log('Respuesta del servidor:', result);
        })
        .catch(error => {
          console.error('Error en la solicitud:', error);
        });

      console.log("Iniciando partida para", this.nombreUsuario);

   
      socket.emit('usuario_conectado', { nombreUsuario: this.nombreUsuario });

      this.$router.push({ name: "TaulerView" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
