<template>
    <div class="w-full h-full flex items-center justify-center bg-gray-900 p-8 sm:px-8 lg:px-8 rounded-lg">
        <div class="shadow-lg sm:rounded-lg rounded-lg">
            <div class="px-4 py-5 bg-gray-800 text-white space-y-6 sm:p-6 rounded-lg">
               <h1 class="text-3xl font-bold text-center mb-4 text-green-300">Crear sala</h1>
                <form @submit.prevent="crearSala" class="space-y-4">
                    <div>
                        <label for="nombreSala" class="block text-sm font-medium text-gray-300">Nombre de la sala:</label>
                        <input v-model="nombreSala" id="nombreSala" required class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-700 text-white">
                    </div>

                    <div>
                        <label for="capacidadSala" class="block text-sm font-medium text-gray-300">Capacidad de la sala:</label>
                        <input v-model="capacidadSala" id="capacidadSala" type="number" min="2" max="4" required class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-700 text-white">
                    </div>

                    <div>
                        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Crear sala</button>
                    </div>
                </form>
                <p v-if="link" class="text-center text-sm text-gray-300">Enlace de la sala: {{ link }}</p>
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
<style>
body{
    background-color: #1A202C;
}
</style>