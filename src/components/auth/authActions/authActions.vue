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
  width: 24px;
  top: 4px;
  z-index: 2;
  border-radius: 4px;
  cursor: pointer;

  &_left {
    margin-left: -12px;
  }

  &_right {
    margin-right: -12px;
  }

  &_single-right {
    margin-left: calc(100% - 12px);
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

.auth-actions-wrapper {
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 4px;
  z-index: 2;
  margin-top: 4px;
}
</style>
