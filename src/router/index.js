import { createRouter, createWebHistory } from 'vue-router';
import GamePage from '@/pages/GamePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'GamePage',
      component: GamePage
    },
    {
      path: '/playerCharts',
      name: 'PlayerCharts',
      component: () => import('@/pages/PlayerCharts.vue')
    }
  ]
});

export default router;
