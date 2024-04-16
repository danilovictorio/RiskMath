<template>
  <div>
    <button @click="createRoom">Crear</button>
    <button @click="joinRoom">Unir</button>
    <input v-model="capacity" type="number" min="2" max="4" step="2">
  </div>
</template>

<script>
export default {
  data() {
    return {
      capacity: 2
    }
  },
  methods: {
    async createRoom() {
      await this.$axios.$post('/api/rooms', { capacity: this.capacity });
    },
    async joinRoom() {
      await this.$axios.$post('/api/rooms/{id}/join', { player: 'player1' });
    }
  }
}
</script>