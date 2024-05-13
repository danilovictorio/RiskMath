<template>
    <div class="w-full h-full flex items-center justify-center bg-gray-100 py-6 sm:px-6 lg:px-8">
        <div class="shadow sm:rounded-lg">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <h1 class="text-2xl font-bold text-center mb-4">Crear sala</h1>
                <form @submit.prevent="crearSala" class="space-y-4">
                    <div>
                        <label for="nombreSala" class="block text-sm font-medium text-gray-700">Nombre de la sala:</label>
                        <input v-model="nombreSala" id="nombreSala" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div>
                        <label for="capacidadSala" class="block text-sm font-medium text-gray-700">Capacidad de la sala:</label>
                        <input v-model="capacidadSala" id="capacidadSala" type="number" min="2" max="4" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div>
                        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Crear sala</button>
                    </div>
                </form>
                <p v-if="link" class="text-center text-sm text-gray-500">Enlace de la sala: {{ link }}</p>
            </div>
        </div>
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
            codigoSala: '',
        };
    },
    methods: {
        crearSala() {
            const storeApp = useAppStore();
            storeApp.esCreador = true;
            const nombreJugador = storeApp.nombre;
            socket.emit('crearSala', { nombreSala: this.nombreSala, nombreJugador: nombreJugador, capacidadSala: this.capacidadSala });
            this.$router.push({ name: 'SalaEspera' });
        },
    },
};
</script>