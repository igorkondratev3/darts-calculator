import { createRouter, createWebHistory } from 'vue-router';
import GamePage from '@/pages/GamePage.vue';
import StartPage from '@/pages/StartPage.vue';
import { useUsersStore } from '@/stores/users.js';

const checkAuth = (to, from) => {
 if (!useUsersStore().users[to.query.player])
  return '/';
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage
    },
    {
      path: '/game',
      name: 'GamePage',
      component: GamePage
    },
    {
      path: '/userProfile',
      name: 'UserProfile',
      component: () => import('@/pages/UserProfile.vue'),
      beforeEnter: checkAuth,
      props: (route) => ({
        player: route.query.player
      })
    }
  ]
});

export default router;
