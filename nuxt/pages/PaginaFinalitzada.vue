<template>
  <div class="w-screen h-screen flex items-center justify-center bg-center bg-cover bg-no-repeat" style="background-image: url('/mapaRisk.png');">
    <div class="result-container text-center">
      <h1 class="text-4xl font-bold mb-4 text-white">El guanyador es:</h1>
      <h1 class="ganador text-6xl font-bold text-green-500 mb-8">{{ ganador }}!</h1>
      <div v-for="(count, player) in paisesConquistados" :key="player" class="mb-4">
        <h2 class="text-2xl font-bold text-white">{{ player }}: {{ count }} </h2>
      </div>
      <router-link to="/" class="block px-8 py-4 bg-blue-500 text-white rounded-md text-xl font-semibold hover:bg-red-500 transition duration-300">Inici</router-link>
    </div>
  </div>
</template>

<script>
import { useAppStore } from "../stores/app";

export default {
  setup() {
    const appStore = useAppStore();
    return {
      ganador: appStore.jugadorGanador,
      paisesConquistados: appStore.paisesConquistados
    };
  }
};
</script>

<style scoped>
/* Añadidos estilos para el contenedor de resultados */
.result-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(10px); /* Aplicar efecto de desenfoque al fondo */
  padding: 20px; /* Añadir espacio alrededor del contenido */
  border-radius: 10px; /* Añadir bordes redondeados al contenedor */
  background-color: rgba(255, 255, 255, 0.5); /* Fondo semi-transparente */
}
.ganador {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
