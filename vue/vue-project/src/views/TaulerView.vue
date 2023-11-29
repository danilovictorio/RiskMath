<template>
<div class="mapa">
    <ul>
        <li v-for="pais in paises" :key="pais.id">
            {{ pais.nombre }} - Ocupante: {{ pais.ocupante || 'Vacío' }}
        </li>
    </ul>
</div>
<div class="preguntes">
    <div class="preguntes pregunta">
        <h1>{{ }}</h1>
    </div>
    <div class="preguntes resposta1">
        <button>{{ }}</button>
    </div>
    <div class="preguntes resposta2">
        <button>{{ }}</button>
    </div>
    <div class="preguntes resposta3">
        <button>{{ }}</button>
    </div>
    <div class="preguntes resposta4">
        <button>{{ }}</button>
    </div>
</div>
</template>

<script>
    import dataPaises from '../laravel/paises.json'; 
    import dataPreguntes from '../laravel/paises.json';
    export default {
      data() {
        return {
          paises: [],
          preguntes: []
        };
      },
      created() {
        this.paises = dataPaises.paises; 
        this.paises = dataPreguntes.preguntes; 
      }
    };
</script>