import { createRouter, createWebHistory } from 'vue-router';
import { useUsersStore } from '@/stores/users.js';

const UserProfile = () => import('@/pages/UserProfile.vue');
const GamePage = () => import('@/pages/GamePage.vue');
const StartPage = () => import('@/pages/StartPage.vue');

const checkAuth = (to, from) => {
  if (!useUsersStore().users[to.query.player]) return '/';
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
      component: UserProfile,
      beforeEnter: checkAuth,
      props: (route) => ({
        player: route.query.player
      })
    }
  ]
});

export default router;
