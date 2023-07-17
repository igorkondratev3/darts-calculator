<script setup>
import { useUsersStore } from '@/stores/users.js';
import { logout } from './helpers.js';

defineProps({
  player: String
});

const usersStore = useUsersStore();
</script>

<template>
  <button
    class="auth-action"
    :class="{
      'auth-action_left': player === 'P1',
      'auth-action_right': player === 'P2'
    }"
    title="выход"
    @click="logout(player, usersStore)"
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
