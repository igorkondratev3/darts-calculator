<script setup>
import { useUsersStore } from '@/stores/users.js';
import { login } from './helpers.js';

defineProps({
  player: String
});
defineEmits(['openAuthComp']);

const usersStore = useUsersStore();
</script>

<template>
  <button
    class="auth-action"
    :class="{
      'auth-action_left': player === 'P1',
      'auth-action_right': player === 'P2'
    }"
    title="вход/регистрация"
    @click="login(player, usersStore, $emit)"
  >
    <img
      class="auth-action__icon"
      :class="{ 'auth-action__icon_rotate_180deg': player === 'P2' }"
      src="@/assets/images/login.svg"
      alt="login"
    />
  </button>
</template>

<style>
/*стили в рожительском компоненте*/
</style>
