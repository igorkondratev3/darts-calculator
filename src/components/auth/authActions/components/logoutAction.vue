<script setup>
import { useUsersStore } from '@/stores/users.js';
defineProps({
  player: String
});

const usersStore = useUsersStore();

const logout = (player) => {
  deleteRefreshTokenFromDB(usersStore.users[player].refreshToken);
  usersStore.logout(player);
  localStorage.removeItem(`user${player}`);
};

const deleteRefreshTokenFromDB = async (refreshToken) => {
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_URI}/refreshToken`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${refreshToken}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <button
    class="auth-action"
    :class="{
      'auth-action_left': player === 'P1',
      'auth-action_right': player === 'P2'
    }"
    title="выход"
    @click="logout(player)"
  >
    <img
      class="auth-action__icon"
      :class="{ 'auth-action__icon_rotate_180deg': player === 'P2' }"
      src="@/assets/images/logout.svg"
      alt="logout"
    />
  </button>
</template>

<style>
/*стили в рожительском компоненте*/
</style>
