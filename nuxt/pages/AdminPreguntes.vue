<template>
    <div>
        <h2 class="text-2xl font-bold mb-4">Lista de Preguntas</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="pregunta in preguntas" :key="pregunta.id" class="border rounded p-4">
                <p class="font-bold">Id:</p>
                <p>{{ pregunta.id }}</p>
                <p class="font-bold">Pregunta:</p>
                <p>{{ pregunta.pregunta }}</p>
                <p class="font-bold">Opción A:</p>
                <p>{{ pregunta.a }}</p>
                <p class="font-bold">Opción B:</p>
                <p>{{ pregunta.b }}</p>
                <p class="font-bold">Opción C:</p>
                <p>{{ pregunta.c }}</p>
                <p class="font-bold">Opción D:</p>
                <p>{{ pregunta.d }}</p>
                <p class="font-bold">Respuesta Correcta:</p>
                <p>{{ pregunta.respuesta_correcta }}</p>
                <div class="flex justify-end mt-2">
                    <button @click="editarPregunta(pregunta)"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Editar</button>
                    <button @click="eliminarPregunta(pregunta.id)"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Eliminar</button>
                </div>
            </div>
        </div>
        <button @click="crearPregunta()"
            class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Crear Pregunta</button>

        <!-- Modal para editar pregunta -->
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div class="bg-white p-8 rounded shadow-md">
                <h3 class="text-lg font-bold mb-4">Editar Pregunta</h3>
                <!-- Formulario para editar la pregunta -->
                <input v-model="preguntaEditada.id" type="hidden">
                <input v-model="preguntaEditada.pregunta" class="border rounded p-2 mb-2" placeholder="Pregunta">
                <input v-model="preguntaEditada.a" class="border rounded p-2 mb-2" placeholder="Opción A">
                <input v-model="preguntaEditada.b" class="border rounded p-2 mb-2" placeholder="Opción B">
                <input v-model="preguntaEditada.c" class="border rounded p-2 mb-2" placeholder="Opción C">
                <input v-model="preguntaEditada.d" class="border rounded p-2 mb-2" placeholder="Opción D">
                <input v-model="preguntaEditada.respuesta_correcta" class="border rounded p-2 mb-2"
                    placeholder="Respuesta Correcta">
                <div class="flex justify-end">
                    <button @click="guardarEdicion(preguntaEditada)"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Guardar</button>
                    <button @click="cancelarEdicion()"
                        class="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mostrarPreguntas, eliminarPregunta } from '../services/communicationManager.js';

export default {
    data() {
        return {
            preguntas: [],
            preguntaEditada: {}, // Aquí se almacenará la pregunta que se está editando
            showModal: false // Variable para controlar la visibilidad del modal
        };
    },
    methods: {
        async mostrarPreguntas() {
            try {
                const response = await mostrarPreguntas();
                this.preguntas = response;
            } catch (error) {
                console.error('Error al cargar las preguntas:', error);
            }
        },
        async eliminarPregunta(id) {
            try {
                await eliminarPregunta(id);
                // Actualizar la lista de preguntas después de eliminar
                await this.mostrarPreguntas();
            } catch (error) {
                console.error('Error al eliminar la pregunta:', error);
            }
        },
        async editarPregunta(pregunta) {
            this.preguntaEditada = { ...pregunta }; // Clonamos la pregunta para no modificar la original
            this.showModal = true; // Mostramos el modal de edición
        },
        async guardarEdicion(pregunta) {
            // Lógica para guardar la edición de la pregunta
            console.log('Guardando edición de la pregunta:', pregunta);
            this.showModal = false; // Ocultamos el modal después de guardar
        },
        cancelarEdicion() {
            this.showModal = false; // Ocultamos el modal sin guardar cambios
        },
        crearPregunta() {
            // Lógica para crear una nueva pregunta
            console.log('Crear nueva pregunta');
        }
    },
    mounted() {
        this.mostrarPreguntas();
    }
};
</script>