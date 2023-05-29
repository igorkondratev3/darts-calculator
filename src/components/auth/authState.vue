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
  top: 2px;
  width: 28px;
  height: 28px;
  border: 1px solid black;
  border-radius: 50%;
  background-color: v-bind(backgroundColor);

  &:focus {
    outline: 1px solid black;
    outline-offset: 2px;
  }

  &_left {
    left: -28px;
  }

  &_right {
    right: -28px;
  }

  &_cursor_pointer {
    cursor: pointer;
  }

  &__icon {
    width: 24px;
    height: 24px;
    display: block;
  }
}
</style>
