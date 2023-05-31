<script setup>
import LoginAction from './components/loginAction.vue';
import LogoutAction from './components/logoutAction.vue';
import { useUsersStore } from '@/stores/users.js';

defineProps({
  player: String,
  isSingle: Boolean
});
defineEmits(['openAuthComp']);

const usersStore = useUsersStore();
</script>

<template>
  <LoginAction
    v-if="!usersStore.users[player]"
    :class="{ 'auth-action_single-right': player === 'P2' && isSingle }"
    :player="player"
    @openAuthComp="$emit('openAuthComp')"
  />
  <LogoutAction
    v-else
    :player="player"
    :class="{ 'auth-action_single-right': player === 'P2' && isSingle }"
  />
</template>

<style lang="scss">
.auth-action {
  position: sticky;
  display: inline;
  width: calc(var(--base) * 0.24);
  top: calc(var(--base) * 0.04);
  z-index: 2;
  border-radius: calc(var(--base) * 0.04);
  cursor: pointer;

  &_left {
    margin-left: calc(var(--base) * -0.12);
  }

  &_right {
    margin-right: calc(var(--base) * -0.12);
  }

  &_single-right {
    margin-left: calc(100% - calc(var(--base) * 0.12));
  }

  &:focus {
    outline: calc(var(--base) * 0.01) solid black;
  }

  &__icon {
    width: calc(var(--base) * 0.24);
    height: calc(var(--base) * 0.24);
    display: block;

    &_rotate_180deg {
      transform: rotate(180deg);
    }
  }
}

.auth-actions-wrapper {
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: calc(var(--base) * 0.04);
  z-index: 2;
  margin-top: calc(var(--base) * 0.04);
}
</style>
