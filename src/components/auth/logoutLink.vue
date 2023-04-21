<script setup>
import { useUsersStore } from '@/stores/users.js';
const props = defineProps({
  player: String
});

const position = {};
if (props.player === 'P1') position.left = '4px';
else position.right = '4px';

const usersStore = useUsersStore();
const deleteRefreshTokenFromDB = async (refreshToken) => {
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_URI}/refreshToken`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${refreshToken}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};
const logout = () => {
  deleteRefreshTokenFromDB(usersStore.users[props.player].refreshToken);
  usersStore.logout(props.player);
  localStorage.removeItem(`user${props.player}`);
};
</script>

<template>
  <button class="auth-link" :style="position" title="выход" @click="logout">
    <img
      class="auth-link__icon"
      :class="{ 'auth-link__icon_rotate_180deg': props.player === 'P2' }"
      src="@/assets/images/logout.svg"
      alt="logout"
    />
  </button>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.auth-link {
  position: absolute;
  top: 4px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;

  &:focus {
    outline: 1px solid black;
  }

  &__icon {
    width: 24px;
    height: 24px;

    &_rotate_180deg {
      transform: rotate(180deg);
    }
  }
}
</style>
