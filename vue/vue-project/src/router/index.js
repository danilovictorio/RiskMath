// index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/PaginaPrincipal.vue';
import TaulerView from '../components/TaulerView.vue';
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { useStore } from './store';

const pinia = createPinia();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/TaulerView',
      name: 'TaulerView',
      component: TaulerView,
    },
  ],
});

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');
