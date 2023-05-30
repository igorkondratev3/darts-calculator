<script setup>
import { ref } from 'vue';
const buttonsBox = ref(null);

const focusOnButtonBox = () => {
  buttonsBox.value.focus();
};
//необходимо для корректной работы tab
</script>

<template>
  <div
    class="dialog-content-wrapper leave-page-dialog"
    @click="focusOnButtonBox"
  >
    <div class="leave-page-dialog__message">
      Вы собираетесь покинуть страницу начатого матча. Вы можете сохранить
      текущий прогресс и вернуться к матчу позже
    </div>
    <div class="leave-page-dialog__values" ref="buttonsBox" tabindex="1">
      <button class="leave-page-dialog__value">
        Сохранить матч
      </button>
      <button class="leave-page-dialog__value">
        Не сохранять
      </button>
      <button class="leave-page-dialog__value">
        Отмена
      </button>
    </div>
  </div>
</template>

<style lang="scss">
//dialog-content-wrapper на главной странице

.leave-page-dialog {
  &__message {
    max-width: 1000px;
    font-size: 40px;
    font-weight: 700;
    text-align: center;
    color: white
  }

  &__values {
    display: flex;
    margin-top: 24px;
    margin-bottom: 200px;
  }

  &__values:focus {
    border: none;
    outline: none;
  }

  &__value {
    width: 200px;
    height: 64px;
    margin-right: 8px;
    margin-left: 8px;
    padding: 8px;
    outline: none;
    border: none;
    border-radius: 8px;
    font: inherit;
    font-size: 24px;
    color: white;
    font-weight: 700;
    background-color: rgb(66, 63, 63);
    transition: background-color 0.5s linear, color 0.5s linear;
  }

  &__value:hover,
  &__value:focus {
    color: black;
    background-color: white;
  }
}
</style>
