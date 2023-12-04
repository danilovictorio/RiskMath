<template>
     <div>
    <h1>SOY LA PAGINA PRINCIPAL</h1>
    <button @click="iniciarPartida">Iniciar Partida</button>
    <input v-model="nombreUsuario" placeholder="Nombre de usuario" />
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
      console.log("Iniciando partida para", this.nombreUsuario);

      // Después de realizar las acciones necesarias, puedes redirigir a la siguiente vista.
      this.$router.push({ name: "TaulerView" });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>