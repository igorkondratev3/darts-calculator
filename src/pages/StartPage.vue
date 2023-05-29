<script setup>
import { RouterLink } from 'vue-router';
import PlayerNavigation from '@/components/startPage/playerNavigation.vue';
</script>

<template>
  <div class="page start-page">
    <header class="start-page__header">Дартс калькулятор</header>
    <main class="start-page__main">
      <div class="start-page__hello-message">
        Приложение "дартс калькулятор" предназначено для подсчета очков при игре
        в дартс и ведения статистика матча. Зарегистрированные пользователи
        дополнительно имеют возможность сохранения статистики матчей и ее
        просмотра в личном профиле
      </div>
      <div class="start-page__players-wrapper">
        <PlayerNavigation player="P1" tabindex="1"/>
        <RouterLink class="base-button to-match" to="/game" tabindex="3">
          К матчу
        </RouterLink>
        <PlayerNavigation player="P2" tabindex="2"/>
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.start-page {
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

  &__hello-message {
    padding: 16px;
    border-radius: 8px;
    max-width: 600px;
    text-align: justify;
    margin-bottom: 16px;
    background-color: rgb(173, 206, 236);
  }

  &__players-wrapper {
    display: flex;
  }
}

.to-match {
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 74px;
  width: 320px;
  margin-top: 398px;
}
</style>
