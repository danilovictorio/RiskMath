<template>
  <div class="container">
    <div class="result-container">
      <h1>¡El ganador es:</h1>
      <h1 class="ganador">{{ ganador }}</h1>
      <!-- Mueve el botón dentro del contenedor de resultados -->
      <router-link to="/" class="volver-btn">Volver</router-link>
    </div>
  </div>
</template>

<script>
import { socket } from "@/utils/socket.js";
import { useAppStore } from "../stores/app";

export default {
  data() {
    return {
      nombreUsuario: "",
      usuariosJuego: [],
      nombreEscrito: false,
      app: useAppStore(),
      user: "",
      ganador: useAppStore().jugadorGanador,
      ruta: "http://localhost:8000",
    };
  },
};
</script>

<style lang="css" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url(../public/mapaRisk.jpg) no-repeat center center fixed;
  background-position: center;
  background-size: cover;
  object-fit: cover;
}

.ganador {
  color: #28a745;
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.result-container {
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin-top: 20px;
}

.result-container h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 10px;
}

/* Estilos para el botón */
.volver-btn {
  margin-top: 20px; /* Ajusta el espacio entre el ganador y el botón */
  display: inline-block; /* Hace que el botón se muestre en línea */
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none; /* Elimina la decoración de texto por defecto */
}

.volver-btn:hover {
  background-color: #0056b3;
}
</style>
