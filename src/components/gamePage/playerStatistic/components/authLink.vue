<script setup>
import { useUsersStore } from '@/stores/users.js';
const props = defineProps({
  player: String
});
const emit = defineEmits(['openAuthComp']);

const position = {};
if (props.player === 'P1') position.left = '4px';
else position.right = '4px';

const usersStore = useUsersStore();
const login = () => {
  if (localStorage.getItem(`user${props.player}`)) {
    usersStore.login(
      props.player,
      JSON.parse(localStorage.getItem(`user${props.player}`))
    );
    return;
  }
  emit('openAuthComp');
};
</script>

<template>
  <button
    class="auth-link"
    :style="position"
    title="вход/регистрация"
    @click="login"
  >
    <img
      class="auth-link__icon"
      :class="{ 'auth-link__icon_rotate_180deg': props.player === 'P2' }"
      src="@/assets/images/login.svg"
      alt="login"
    />
  </button>
</template>

<style>
/*стили в рожительском компоненте*/
</style>
