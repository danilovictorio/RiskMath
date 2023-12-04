import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/PaginaPrincipal.vue'
import TaulerView from '../components/TaulerView.vue'
import SalaEspera from '../components/SalaEspera.vue'; 


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/TaulerView',
      name: 'TaulerView',
      component: TaulerView
    },
    {
      path: '/SalaEspera',
      name: '/SalaEspera',
      component: SalaEspera
    }
    
  ]
})

export default router
