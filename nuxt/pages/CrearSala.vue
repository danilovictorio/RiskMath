<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 class="text-2xl text-gray-700 mb-5">Crear sala</h1>
        <form @submit.prevent="crearSala" class="flex flex-col w-72 space-y-2">
            <label for="nombreSala" class="text-lg text-gray-600">Nombre de la sala:</label>
            <input v-model="nombreSala" id="nombreSala" required class="p-2 text-base border border-gray-300 rounded">

            <label for="capacidadSala" class="text-lg text-gray-600">Capacidad de la sala:</label>
            <input v-model="capacidadSala" id="capacidadSala" type="number" min="2" max="4" required class="p-2 text-base border border-gray-300 rounded">

            <button type="submit" class="p-2 text-white bg-blue-500 rounded cursor-pointer transition-colors duration-300 hover:bg-blue-700">Crear sala</button>
        </form>
        <p v-if="link" class="mt-5 text-lg text-gray-700">Enlace de la sala: {{ link }}</p>
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
            socket.on('roomCreated', (roomId) => {
                console.log('Sala creada, con ID:', roomId);
                storeApp.codigoSala = roomId; 
                this.$router.push({ name: 'SalaEspera', params: { id: roomId } });
                this.esCreador = true; 
            });
        },
    },
};
</script>
