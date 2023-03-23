import { createRouter, createWebHistory } from 'vue-router'
import GamePage from '@/pages/GamePage.vue';

//component: () => import('../views/AboutView.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'GamePage',
      component: GamePage
    },

  ]
})

export default router
