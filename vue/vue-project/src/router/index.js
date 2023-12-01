// index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/PaginaPrincipal.vue';
import TaulerView from '../components/TaulerView.vue';
import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
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
app.use(store);

app.mount('#app');
