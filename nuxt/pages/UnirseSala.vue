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
          store.setSala(response.sala);
          store.setUsuariosJuego(response.usuarios);
          router.push({ name: 'SalaEspera' });
        } else {
          console.error(response.message);
        }
      });
    };

    onMounted(() => {
      socket.on('usuarioUnidoSala', (data) => {
        store.setSala(data.sala);
        store.setUsuariosJuego(data.usuarios);
        console.log('Usuarios en la sala:', store.usuariosJuego.users);
      });
    });

    return {
      linkSala,
      unirseSala,
    };
  },
};
</script>