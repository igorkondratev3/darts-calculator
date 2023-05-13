<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import AuthComp from '@/components/auth/authComp.vue';
import { useUsersStore } from '@/stores/users';
const usersStore = useUsersStore();

const seenAuthComp = {
  P1: ref(false),
  P2: ref(false)
};

const login = (player) => {
  if (localStorage.getItem(`user${player}`)) {
    usersStore.login(player, JSON.parse(localStorage.getItem(`user${player}`)));
    return;
  }
  seenAuthComp[player].value = true;
};

const logout = (player) => {
  deleteRefreshTokenFromDB(usersStore.users[player].refreshToken);
  usersStore.logout(player);
  localStorage.removeItem(`user${player}`);
};

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
</script>

<template>
  <div class="start-page">
    <header class="start-page__header">Дартс калькулятор</header>
    <main class="start-page__main">
      <div class="hello-message">
        Приложение "дартс калькулятор" предназначено для подсчета очков при игре
        в дартс и ведения статистика матча. Зарегистрированные пользователи
        дополнительно имеют возможность сохранения статистики матчей и ее
        просмотра в личном профиле
      </div>
      <div class="start-player">
        <div class="sta" v-show="!seenAuthComp.P1.value">
          <h3 class="sta__name">
            {{ usersStore.users.P1?.name || 'Игрок 1' }}
          </h3>
          <RouterLink
            :to="{
              name: 'UserProfile',
              query: { player: 'P1' }
            }"
            tabindex="-1"
            class="sta__li"
          >
            <button class="sta__login" :disabled="!usersStore.users.P1">
              Личный профиль
            </button>
          </RouterLink>
          <button
            v-if="!usersStore.users.P1"
            class="sta__login"
            @click="login('P1')"
          >
            Войти
          </button>
          <button
            v-if="usersStore.users.P1"
            class="sta__login"
            @click="logout('P1')"
          >
            Выйти
          </button>
        </div>
        <AuthComp
          v-if="seenAuthComp.P1.value"
          @closeAuthComp="seenAuthComp.P1.value = false"
          player="P1"
        />
        <RouterLink class="to-match" to="/game"> К матчу </RouterLink>
        <div class="sta" v-show="!seenAuthComp.P2.value">
          <h3 class="sta__name">
            {{ usersStore.users.P2?.name || 'Игрок 2' }}
          </h3>
          <RouterLink
            :to="{
              name: 'UserProfile',
              query: { player: 'P2' }
            }"
            tabindex="-1"
            class="sta__li"
          >
            <button class="sta__login" :disabled="!usersStore.users.P2">
              Личный профиль
            </button>
          </RouterLink>
          <button
            v-if="!usersStore.users.P2"
            class="sta__login"
            @click="login('P2')"
          >
            Войти
          </button>
          <button
            v-if="usersStore.users.P2"
            class="sta__login"
            @click="logout('P2')"
          >
            Выйти
          </button>
        </div>
        <AuthComp
          v-if="seenAuthComp.P2.value"
          @closeAuthComp="seenAuthComp.P2.value = false"
          player="P2"
        />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.hello-message {
  padding: 16px;
  border-radius: 8px;
  max-width: 600px;
  text-align: justify;
  margin-bottom: 16px;
  background-color: rgb(173, 206, 236);
}

.sta {
  width: 352px;
  height: 394px;
  display: flex;
  padding: 16px;
  border-radius: 16px;
  flex-direction: column;
  background-color: rgb(182, 195, 197);
  align-items: center;
  margin-top: 8px;
  margin-left: 4px;
  margin-right: 4px;

  &__name {
    font-size: 40px;
    margin-bottom: 64px;
  }

  &__li {
    width: 100%;
  }

  &__login {
    width: 100%;
    padding: 8px;
    margin-top: 16px;
    border: 1px solid black;
    border-radius: 8px;
    text-decoration: none;
    cursor: default;
    color: black;
    text-align: center;
    @include fonts.Advent;
    transition: background-color 0.5s linear, color 0.5s linear;

    &:focus,
    &:hover {
      background-color: black;
      color: white;
    }

    &:disabled {
      color: black;
      background-color: transparent;
      opacity: 25%;
    }
  }
}

.start-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 16px;
  @include fonts.Advent;
  background-color: rgb(232, 238, 233);

  &__header {
    font-size: 64px;
    font-weight: 700;
    margin-bottom: 32px;
    text-align: center;
  }

  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
  }
}

.start-player {
  display: flex;
  align-items: flex-end;
}

.to-match {
  transform: translateY(100%);
  width: 300px;
  padding: 8px;
  border: 1px solid black;
  border-radius: 8px;
  text-decoration: none;
  cursor: default;
  color: black;
  text-align: center;
  transition: background-color 0.5s linear, color 0.5s linear;

  &:focus,
  &:hover {
    background-color: black;
    color: white;
  }
}
</style>
