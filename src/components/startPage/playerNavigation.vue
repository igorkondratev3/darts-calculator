<script setup>
import { ref, defineAsyncComponent } from 'vue';
import { RouterLink } from 'vue-router';
import LoadingAuth from '@/components/auth/components/loadingAuth.vue';
import { deleteRefreshTokenFromDB } from '@/helpers/fetch.js';
import { useUsersStore } from '@/stores/users';
const AuthComp = defineAsyncComponent({
  loader: () => import('@/components/auth/authComp.vue'),
  loadingComponent: LoadingAuth,
  delay: 0
});

defineProps({
  player: String
});

const usersStore = useUsersStore();

const seenAuthComp = ref(false);

const login = (player) => {
  if (localStorage.getItem(`user${player}`)) {
    usersStore.login(player, JSON.parse(localStorage.getItem(`user${player}`)));
    return;
  }
  seenAuthComp.value = true;
};

const logout = (player) => {
  deleteRefreshTokenFromDB(usersStore.users[player].refreshToken);
  usersStore.logout(player);
  localStorage.removeItem(`user${player}`);
};
</script>

<template>
  <div
    class="start-page__player-navigation player-navigation"
    v-show="!seenAuthComp"
  >
    <h4 class="player-navigation__name">
      {{ usersStore.users[player]?.name || `Игрок ${player.charAt(1)}` }}
    </h4>
    <RouterLink
      :to="{
        name: 'UserProfile',
        query: { player: player }
      }"
      tabindex="-1"
      class="player-navigation__profile"
    >
      <button
        class="base-button player-navigation__button"
        :disabled="!usersStore.users[player]"
        v-bind="$attrs"
      >
        Личный профиль
      </button>
    </RouterLink>
    <button
      v-if="!usersStore.users[player]"
      class="base-button player-navigation__button player-navigation__login"
      @click="login(player)"
      v-bind="$attrs"
    >
      Войти
    </button>
    <button
      v-else
      class="base-button player-navigation__button player-navigation__logout"
      @click="logout(player)"
      v-bind="$attrs"
    >
      Выйти
    </button>
  </div>
  <AuthComp
    v-if="seenAuthComp"
    @closeAuthComp="seenAuthComp = false"
    :player="player"
  />
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.start-page__player-navigation {
  margin: 0px 4px;
}

.player-navigation {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 352px;
  height: 394px;
  padding: 16px;
  border-radius: 16px;
  background-color: rgb(182, 195, 197);

  &__name {
    font-size: 40px;
    margin-bottom: 64px;
  }

  &__profile {
    width: 100%;
  }

  &__button {
    width: 100%;
    margin-top: 16px;
  }
}
</style>
