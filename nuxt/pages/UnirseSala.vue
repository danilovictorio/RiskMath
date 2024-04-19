<template>
  <div>
    <h1>Unirse a sala</h1>
    <form @submit.prevent="unirseSala">
      <label for="linkSala">Enlace de la sala:</label>
      <input v-model="linkSala" id="linkSala" required>
      <button type="submit">Unirse a sala</button>
    </form>
  </div>
</template>

<script>
import { socket } from '@/utils/socket.js';
import { ref, onMounted } from 'vue';
import { useAppStore } from '../stores/app.js';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const linkSala = ref('');
    const store = useAppStore();
    const router = useRouter();

    const unirseSala = () => {
      socket.emit('unirseSala', linkSala.value, (response) => {
        if (response.success) {
          router.push({ name: 'SalaEspera' });
        } else {
          console.error(response.message);
        }
      });
    };

    const usuarioUnidoSalaHandler = (data) => {
      store.setSala(data.sala);
      store.setUsuariosJuego(data.usuarios);
      console.log('Datos de la sala:', store.sala);
      console.log('Usuarios en la sala:', store.usuariosJuego.users);
    };

    onMounted(() => {
      socket.on('usuarioUnidoSala', usuarioUnidoSalaHandler);
    });

    onUnmounted(() => {
      socket.off('usuarioUnidoSala', usuarioUnidoSalaHandler);
    });

    return {
      linkSala,
      unirseSala,
    };
  },
};
</script>