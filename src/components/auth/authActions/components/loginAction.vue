<script setup>
import { useUsersStore } from '@/stores/users.js';

defineProps({
  player: String
});
const emit = defineEmits(['openAuthComp']);

const usersStore = useUsersStore();

const login = (player) => {
  if (localStorage.getItem(`user${player}`)) {
    usersStore.login(player, JSON.parse(localStorage.getItem(`user${player}`)));
    return;
  }
  emit('openAuthComp');
};
</script>

<template>
  <button
    class="auth-action"
    :class="{
      'auth-action_left': player === 'P1',
      'auth-action_right': player === 'P2'
    }"
    title="вход/регистрация"
    @click="login(player)"
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
