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
        <button @click="abrirModalCrearPregunta()"
            class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Crear Pregunta</button>
        <!-- Modal para crear pregunta -->
        <div v-if="showModalCrear" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div class="bg-white w-full md:w-2/3 lg:w-1/2 px-12 py-10 rounded shadow-md">
                <h3 class="text-lg font-bold mb-4">Crear Pregunta</h3>
                <input v-model="preguntaNueva.pregunta" class="border rounded p-2 mb-2 w-full" placeholder="Pregunta">
                <h3 class="text-lg font-bold mb-4">Opción A</h3>
                <input v-model="preguntaNueva.a" class="border rounded p-2 mb-2 w-full" placeholder="Opción A">
                <h3 class="text-lg font-bold mb-4">Opción B</h3>
                <input v-model="preguntaNueva.b" class="border rounded p-2 mb-2 w-full" placeholder="Opción B">
                <h3 class="text-lg font-bold mb-4">Opción C</h3>
                <input v-model="preguntaNueva.c" class="border rounded p-2 mb-2 w-full" placeholder="Opción C">
                <h3 class="text-lg font-bold mb-4">Opción D</h3>
                <input v-model="preguntaNueva.d" class="border rounded p-2 mb-2 w-full" placeholder="Opción D">
                <h3 class="text-lg font-bold mb-4">Respuesta Correcta</h3>
                <select v-model="preguntaNueva.respuesta_correcta" class="border rounded p-2 mb-2 w-full">
                    <option value="a">Opción A</option>
                    <option value="b">Opción B</option>
                    <option value="c">Opción C</option>
                    <option value="d">Opción D</option>
                </select>
                <div class="flex justify-end">
                    <button @click="guardarNuevaPregunta()"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Guardar</button>
                    <button @click="cancelarEdicion()"
                        class="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Cancelar</button>
                </div>
            </div>
        </div>
        <!-- Modal para editar pregunta -->
        <div v-if="showModalEditar" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div class="bg-white w-full md:w-2/3 lg:w-1/2 px-12 py-10 rounded shadow-md">
                <h3 class="text-lg font-bold mb-4">Editar Pregunta</h3>
                <!-- Formulario para editar la pregunta -->
                <input v-model="preguntaEditada.id" type="hidden">
                <input v-model="preguntaEditada.pregunta" class="border rounded p-2 mb-2 w-full" placeholder="Pregunta">
                <h3 class="text-lg font-bold mb-4">Editar respuesta A</h3>
                <input v-model="preguntaEditada.a" class="border rounded p-2 mb-2" placeholder="Opción A">
                <h3 class="text-lg font-bold mb-4">Editar respuesta B</h3>
                <input v-model="preguntaEditada.b" class="border rounded p-2 mb-2" placeholder="Opción B">
                <h3 class="text-lg font-bold mb-4">Editar respuesta C</h3>
                <input v-model="preguntaEditada.c" class="border rounded p-2 mb-2" placeholder="Opción C">
                <h3 class="text-lg font-bold mb-4">Editar respuesta D</h3>
                <input v-model="preguntaEditada.d" class="border rounded p-2 mb-2" placeholder="Opción D">
                <h3 class="text-lg font-bold mb-4">Selecciona respuesta correcta</h3>
                <select v-model="preguntaEditada.respuesta_correcta" class="border rounded p-2 mb-2 w-full">
                    <option value="a">Opción A</option>
                    <option value="b">Opción B</option>
                    <option value="c">Opción C</option>
                    <option value="d">Opción D</option>
                </select>
                <div class="flex justify-end">
                    <button @click="guardarEdicion(preguntaEditada)"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Guardar</button>
                    <button @click="cancelarEdicion()"
                        class="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Cancelar</button>
                </div>
            </div>
        </div>
        <nuxt-link to="/">Volver</nuxt-link>
    </div>
</template>

<script>
import { mostrarPreguntas, eliminarPregunta, actualizarPreguntaEditada, crearPregunta } from '../services/communicationManager.js';

export default {
    data() {
        return {
            preguntas: [],
            preguntaEditada: {},
            preguntaNueva: {},
            showModalEditar: false,
            showModalCrear: false
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
            this.showModalEditar = true; // Mostramos el modal de edición
        },
        async guardarEdicion(pregunta) {
            console.log('Guardar edición de la pregunta:', pregunta);
            try {
                // Llamar a la función del communicationManager para enviar la pregunta editada
                await actualizarPreguntaEditada(pregunta);

                // Actualizar la lista de preguntas después de editar
                await this.mostrarPreguntas();

                this.showModalEditar = false; // Ocultar el modal después de guardar
            } catch (error) {
                console.error("Error al guardar la edición de la pregunta:", error);
            }
        },
        cancelarEdicion() {
            this.showModalEditar = false;
            this.showModalCrear = false; // Ocultamos el modal sin guardar cambios
        },
        async guardarNuevaPregunta() {
            try {
                // Enviar la nueva pregunta al servidor
                await crearPregunta(this.preguntaNueva);

                // Actualizar la lista de preguntas después de crear la nueva pregunta
                await this.mostrarPreguntas();

                // Ocultar el modal después de crear la pregunta
                this.showModalCrear = false;

                // Limpiar el estado de la nueva pregunta
                this.preguntaNueva = {};
            } catch (error) {
                console.error("Error al crear la pregunta:", error);
            }
        },
        abrirModalCrearPregunta() {
            // Abrir el modal para crear una nueva pregunta y limpiar el estado de la nueva pregunta
            this.showModalCrear = true;
            this.preguntaNueva = {
                pregunta: '',
                a: '',
                b: '',
                c: '',
                d: '',
                respuesta_correcta: ''
            };
        }
    },
    mounted() {
        this.mostrarPreguntas();
    }
};
</script>