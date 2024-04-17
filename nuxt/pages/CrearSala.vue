<template>
    <div>
        <h1>Crear sala</h1>
        <form @submit.prevent="crearSala">
            <label for="nombreSala">Nombre de la sala:</label>
            <input v-model="nombreSala" id="nombreSala" required>

            <label for="capacidadSala">Capacidad de la sala:</label>
            <input v-model="capacidadSala" id="capacidadSala" type="number" min="2" max="4" required>

            <button type="submit">Crear sala</button>
        </form>
        <p v-if="link">Enlace de la sala: {{ link }}</p>
    </div>
</template>

<script>
import { socket } from '@/utils/socket.js';
import { useAppStore } from '../stores/app.js';

export default {
    data() {
        return {
            nombreSala: '',
            capacidadSala: 2,
            link: '',
            esCreador: false,
            codigoSala: '',
        };
    },
    methods: {
        crearSala() {
            const storeApp = useAppStore();

            socket.emit('crearSala', { nombreSala: this.nombreSala, capacidadSala: this.capacidadSala });
            socket.on('roomCreated', (data) => {
                storeApp.sala = data.room; 
                console.log('Sala creada en pinia:', storeApp.sala );
                this.$router.push({ name: 'SalaEspera' });
            });
        },
    },
};
</script>