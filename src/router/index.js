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
      path: '/userProfile',
      name: 'UserProfile',
      component: () => import('@/pages/UserProfile.vue'),
      props: (route) => ({
        player: route.query.player
      })
    }
  ]
});

export default router;
