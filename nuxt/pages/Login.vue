<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Inicia Sessió
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >Correu electrònic</label
          >
          <div class="mt-2">
            <input
              v-model="email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Contrasenya</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
            />
          </div>
        </div>

        <div>
          <button
            @click="login"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Inicia Sessio
          </button>
        </div>
      </div>

      
    </div>
  </div>
</template>

<script>
import { login } from '../services/communicationManager.js';

export default {
  data() {
    return {
        app: useAppStore(),
        email: '',
        password: ''
    };
  },
  methods: {
    async login() {
        //console.log(this.email, this.password)
        try {
        const data = await login(this.email, this.password);
       //console.log(data);

        if (data.role == "admin") {

          this.$router.push("/AdminPreguntes");
        } else {
          this.$router.push("/"); // Redirige a la página principal o cualquier otra página para usuarios normales
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>