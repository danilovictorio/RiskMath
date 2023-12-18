import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../components/PaginaPrincipal.vue'
import TaulerView from '../components/TaulerView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
    
  ]
})

export default router
