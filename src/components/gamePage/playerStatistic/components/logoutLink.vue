<script setup>
import { useUsersStore } from '@/stores/users.js';
const props = defineProps({
  player: String
});

const position = {};
if (props.player === 'P1') position.left = '4px';
else position.right = '4px';

const usersStore = useUsersStore();
const logout = () => {
  deleteRefreshTokenFromDB(usersStore.users[props.player].refreshToken);
  usersStore.logout(props.player);
  localStorage.removeItem(`user${props.player}`);
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
  <button class="auth-link" :style="position" title="выход" @click="logout">
    <img
      class="auth-link__icon"
      :class="{ 'auth-link__icon_rotate_180deg': props.player === 'P2' }"
      src="@/assets/images/logout.svg"
      alt="logout"
    />
  </button>
</template>

<style>
/*стили в рожительском компоненте*/
</style>
