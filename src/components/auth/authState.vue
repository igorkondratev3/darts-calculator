<script setup>
import { useUsersStore } from '@/stores/users';
import { RouterLink } from 'vue-router';

defineProps({
  player: String,
  backgroundColor: String
});

const usersStore = useUsersStore();
</script>

<template>
  <div>
    <RouterLink
      :to="'/userProfile?player=' + player"
      v-if="usersStore.users[player]"
      class="auth-state auth-state_cursor_pointer"
      :class="{
        'auth-state_left': player === 'P1',
        'auth-state_right': player === 'P2'
      }"
      title="Перейти на страницу профиля"
    >
      <img
        class="auth-state__icon"
        src="/src/assets/images/yes_login.svg"
        alt="yes login"
      />
    </RouterLink>
    <div
      v-else
      class="auth-state"
      :class="{
        'auth-state_left': player === 'P1',
        'auth-state_right': player === 'P2'
      }"
      title="Вход не выполнен"
    >
      <img
        class="auth-state__icon"
        src="/src/assets/images/no_login.svg"
        alt="no login"
      />
    </div>
  </div>
</template>

<style lang="scss">
.auth-state {
  position: absolute;
  z-index: 2;
  top: calc(var(--base) * 0.02);
  width: calc(var(--base) * 0.28);
  height: calc(var(--base) * 0.28);
  border: calc(var(--base) * 0.01) solid black;
  border-radius: 50%;
  background-color: v-bind(backgroundColor);

  &:focus {
    outline: calc(var(--base) * 0.01) solid v-bind(backgroundColor);
    outline-offset: calc(var(--base) * 0.02);
  }

  &_left {
    left: calc(var(--base) * -0.28);
  }

  &_right {
    right: calc(var(--base) * -0.28);
  }

  &_cursor_pointer {
    cursor: pointer;
  }

  &__icon {
    width: calc(var(--base) * 0.24);
    height: calc(var(--base) * 0.24);
    display: block;
  }
}
</style>
