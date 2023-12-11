<template>
  <div>
    <h1>SOY LA PAGINA PRINCIPAL</h1>
    <button @click="iniciarPartida">Iniciar Partida</button>
    <input v-model="nombreUsuario" placeholder="Nombre de usuario" />
  </div>
</template>

<script>
import { useUserStore } from '../../../../vue/vue-project/src/stores/useUserStore.js';
import { socket } from '../../../../vue/vue-project/'; 

export default {
  data() {
    return {
      nombreUsuario: "",
    };
  },
  methods: {
    async iniciarPartida() {
      // Guardar el usuario en el store de Pinia
      const userStore = useUserStore();
      await userStore.addUser({ nombre: this.nombreUsuario });

      const apiUrl = 'http://localhost:8000/api/iniciar-partida';

      const datos = {
        nombreUsuario: this.nombreUsuario,
      };

      // Realizar la solicitud al servidor
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datos),
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const result = await response.json();
        console.log('Respuesta del servidor:', result);

        // Emitir evento al servidor para informar sobre el usuario conectado
        socket.emit('usuario_conectado', { nombreUsuario: this.nombreUsuario });

        // Esperar hasta que haya al menos dos usuarios conectados
        await this.esperarUsuariosConectados(2);

        // Redirigir a la vista de Sala de Espera
        this.$router.push({ name: "SalaEspera" });
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    },
    esperarUsuariosConectados(cantidad) {
      return new Promise((resolve) => {
        // Escuchar eventos de usuarios conectados y desconectados
        const userStore = useUserStore();
        const unsubscribe = userStore.$subscribe((mutation) => {
          if (mutation.type === 'addUser' || mutation.type === 'removeUser') {
            const usuariosConectados = userStore.users.length;
            if (usuariosConectados >= cantidad) {
              // Detener la escucha y resolver la promesa
              unsubscribe();
              resolve();
            }
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
