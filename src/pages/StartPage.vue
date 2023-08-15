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
        <PlayerNavigation player="P1" />
        <RouterLink class="base-button to-match" to="/game" tabindex="3">
          К матчу
        </RouterLink>
        <PlayerNavigation player="P2" />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.start-page {
  padding-bottom: calc(var(--base) * 0.9);
  //с учетом высоты кнопки вне нормального потока
  
  
  &__header {
    font-size: calc(var(--base) * 0.64);
    font-weight: 700;
    margin-bottom: calc(var(--base) * 0.32);
    text-align: center;
  }

  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
  }

  &__hello-message {
    padding: calc(var(--base) * 0.16);
    border-radius: calc(var(--base) * 0.08);
    max-width: calc(var(--base) * 6);
    text-align: justify;
    margin-bottom: calc(var(--base) * 0.16);
    background-color: rgb(173, 206, 236);
  }

  &__players-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}

.to-match {
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: calc(var(--base) * 0.74);
  width: calc(var(--base) * 3.2);
  transform: translateY(calc(100% + calc(var(--base) * 0.04)));
}

@media (max-width: 1070px) {
  .to-match {
    order: 3;
    transform: translateY(calc(var(--base) * 0.04));
  }
}

@media (max-width: 755px) {
  .start-page__players-wrapper {
    flex-direction: column;
  }

  .to-match {
    align-self: center;
  }
}
</style>
