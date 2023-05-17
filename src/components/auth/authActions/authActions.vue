<script setup>
import LoginAction from './components/loginAction.vue';
import LogoutAction from './components/logoutAction.vue';
import { useUsersStore } from '@/stores/users.js';

defineProps({
  player: String
});
defineEmits(['openAuthComp']);

const usersStore = useUsersStore();
</script>

<template>
  <LoginAction
    v-if="!usersStore.users[player]"
    :player="player"
    @openAuthComp="$emit('openAuthComp')"
  />
  <LogoutAction v-else :player="player" />
</template>

<style lang="scss">
.auth-action {
  position: absolute;
  top: 4px;
  z-index: 2;
  border-radius: 4px;
  cursor: pointer;

  &_left {
    left: 4px;
  }

  &_right {
    right: 4px;
  }

  &:focus {
    outline: 1px solid black;
  }

  &__icon {
    width: 24px;
    height: 24px;
    display: block;

    &_rotate_180deg {
      transform: rotate(180deg);
    }
  }
}
</style>
