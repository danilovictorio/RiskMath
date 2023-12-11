<template>
  <div class="container">
    <div class="content">
      <h1>¡Inicia sesion!</h1>
      <input v-model="nombreUsuario" placeholder="Nombre de usuario" />
      <button @click="iniciarPartida">Iniciar Partida</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombreUsuario: "",
    };
  },
  methods: {
    iniciarPartida() {
      // Aquí puedes realizar acciones relacionadas con el inicio de la partida,
      // como enviar una solicitud al servidor para crear una nueva partida, etc.
      // Puedes acceder al nombre del usuario con this.nombreUsuario.
      //background-color: rgba(0, 169, 250, 0.75);
      console.log("Iniciando partida para", this.nombreUsuario);

      // Después de realizar las acciones necesarias, puedes redirigir a la siguiente vista.
      this.$router.push({ name: "TaulerView" });
    },
  },
};
</script>

<style lang="css" scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  font-family: Arial, sans-serif;
  background-image: url('../assets/artwork.png');
}

h1{
  color: #FA3030;
  font-family: impact;
}
.content{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  
  border-radius: 10px;
  height: 30vh;
  width: 20vw;
  padding: 5px;
  border: 2px solid #52C8FA;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  border-radius: 10px;
  background-color: white;
  border: none;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

button:hover {
  box-shadow: inset 0 0 0 50px #FA3030;
}

</style>