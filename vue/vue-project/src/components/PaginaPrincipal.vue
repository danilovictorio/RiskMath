//PaginaPrincipal.vue
<template>
  <div>
    <h1>SOY LA PAGINA PRINCIPAL</h1>
    <button @click="iniciarPartida">Iniciar Partida</button>
    <input v-model="nombreUsuario" placeholder="Nombre de usuario" />
  </div>
</template>

<script>
import {useAppStore} from '@/stores/app.js';
import {socket} from '@/utils/socket.js';

export default {
  data() {
    return {
      nombreUsuario: "",
    };
  },
  methods: {
    iniciarPartida() {
   
      //METO EL USUARIO EN PINIA
      const appStore = useAppStore();
      appStore.setUsuarioActual(this.nombreUsuario);

      //MANDO UNA PETICION AL SERVIDOR DE SOCKETS
      socket.emit('peticion_jugar', { nombreUsuario: this.nombreUsuario });

      /*
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

        // Redirigir a la vista 
        this.$router.push({ name: "TaulerView" });
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }*/
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
