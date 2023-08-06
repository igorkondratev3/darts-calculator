<script setup>
import { ref } from 'vue';
import { useButtons } from './composables.js';

const props = defineProps({
  seenZero: Boolean,
  seenOne: Boolean,
  seenThree: Boolean,
  message: String
});

const buttonsBox = ref(null);
const { buttons, focusOnButton } = useButtons();
</script>

<template>
  <div
    class="dialog-content-wrapper number-darts-dialog"
    @click="buttonsBox.focus()"
    @keyup="focusOnButton"
  >
    <div class="number-darts-dialog__message">{{ props.message }}</div>
    <div class="number-darts-dialog__values" ref="buttonsBox" tabindex="1">
      <button
        class="number-darts-dialog__value"
        v-for="numberDarts in 4"
        :key="numberDarts + 'darts'"
        ref="buttons"
        v-show="
          (numberDarts === 1 && props.seenZero) ||
          (numberDarts === 2 && props.seenOne) ||
          numberDarts === 3 ||
          (numberDarts === 4 && props.seenThree)
        "
      >
        {{ numberDarts - 1 }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
//dialog-content-wrapper на главной странице

.number-darts-dialog {
  &__message {
    width: 100%;
    font-size: calc(var(--base) * 0.56);
    font-weight: 700;
    color: white;
    text-align: center;
  }

  &__values {
    display: flex;
    margin-top: calc(var(--base) * 0.32);
    margin-bottom: calc(var(--base) * 2);
  }

  &__values:focus {
    border: none;
    outline: none;
  }

  &__value {
    width: calc(var(--base) * 0.64);
    height: calc(var(--base) * 0.64);
    margin-right: calc(var(--base) * 0.16);
    padding: calc(var(--base) * 0.08);
    outline: none;
    border: none;
    border-radius: 50%;
    font: inherit;
    font-weight: 700;
    font-size: calc(var(--base) * 0.32);
    color: white;
    background-color: rgb(66, 63, 63);
    transition: background-color 0.5s linear, color 0.5s linear;
  }

  &__value:hover,
  &__value:focus-visible {
    color: black;
    background-color: white;
  }
}
</style>
