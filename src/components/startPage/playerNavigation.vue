<script setup>
import { defineAsyncComponent } from 'vue';
import { RouterLink } from 'vue-router';
import LoadingAuth from '@/components/common/auth/authComp/components/loadingAuth.vue';
import { useUsersStore } from '@/stores/users.js';
import { useElementVisibility } from '@/composables/elementVisibility.js';
import { login, logout } from '@/helpers/auth.js';
const AuthComp = defineAsyncComponent({
  loader: () => import('@/components/common/auth/authComp/authComp.vue'),
  loadingComponent: LoadingAuth,
  delay: 0
});

defineProps({
  player: String
});

const usersStore = useUsersStore();

const {
  visibility: authCompVisibility,
  showElement: showAuthComp,
  hideElement: hideAuthComp
} = useElementVisibility();
</script>

<template>
  <div
    class="start-page__player-navigation player-navigation"
    v-show="!authCompVisibility"
  >
    <h4 class="player-navigation__name">
      {{ usersStore.users[player]?.name || `Игрок ${player.charAt(1)}` }}
    </h4>
    <RouterLink
      :to="{
        name: 'UserProfile',
        query: { player: player }
      }"
      :tabindex="Boolean(usersStore.users[player]) ? player.at(-1) : '-1'"
      class="player-navigation__profile base-button player-navigation__button"
      :class="{ 'link-disabled': !usersStore.users[player] }"
    >
      Личный профиль
    </RouterLink>
    <button
      v-if="!usersStore.users[player]"
      class="base-button player-navigation__button player-navigation__login"
      @click="login(player, usersStore, showAuthComp)"
      :tabindex="player.at(-1)"
    >
      Войти
    </button>
    <button
      v-else
      class="base-button player-navigation__button player-navigation__logout"
      @click="logout(player, usersStore)"
      :tabindex="player.at(-1)"
    >
      Выйти
    </button>
  </div>
  <AuthComp
    class="margin-top_less_755px"
    v-if="authCompVisibility"
    @closeAuthComp="hideAuthComp"
    :player="player"
  />
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.start-page__player-navigation {
  margin: 0px calc(var(--base) * 0.04);
}

.player-navigation {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--authWIdth);
  height: var(--authHeight);
  padding: calc(var(--base) * 0.16);
  border-radius: calc(var(--base) * 0.16);
  background-color: rgb(182, 195, 197);

  &__name {
    font-size: calc(var(--base) * 0.4);
    margin-bottom: calc(var(--base) * 0.64);
  }

  &__profile {
    width: 100%;
  }

  &__button {
    width: 100%;
    margin-top: calc(var(--base) * 0.16);
  }
}

.link-disabled {
  pointer-events: none;
  opacity: 25%;
}

@media (max-width: 755px) {
  .start-page__player-navigation {
    margin-top: calc(var(--base) * 0.04);
  }

  .margin-top_less_755px {
    margin-top: calc(var(--base) * 0.04);
  }
}
</style>
