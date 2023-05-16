<script setup>
import AuthAction from './components/authAction.vue';
import LogoutAction from './components/logoutAction.vue';
import { useUsersStore } from '@/stores/users.js';

defineProps({
  player: String,
});
defineEmits(['openAuthComp']);

const usersStore = useUsersStore();
</script>

<template>
  <AuthAction
    v-if="!usersStore.users[player]"
    @openAuthComp="$emit('openAuthComp')"
    :player="player"
  />
  <LogoutAction v-else :player="player" />
</template>

<style lang="scss">
.auth-link {
  position: absolute;
  width: 26px;
  top: 4px;
  z-index: 2;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;

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
