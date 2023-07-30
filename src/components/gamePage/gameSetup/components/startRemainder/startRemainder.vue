<script setup>
import { toRef } from 'vue';
import { useSeenSelectRemainders } from './composables.js';

const props = defineProps({
  startRemainder: Number
});
defineEmits(['updateStartRemainder']);

const { seenSelectRemainders, showSelectRemainders, closeSelectRemainders } =
  useSeenSelectRemainders(toRef(props, 'startRemainder'));
</script>

<template>
  <h3 class="game-setup__parameter-header">Формат матча</h3>
  <div
    class="game-setup__start-remainder start-remainder"
    @keyup.esc="closeSelectRemainders"
  >
    <div
      class="start-remainder__header"
      tabindex="0"
      @click.stop="showSelectRemainders"
      @keyup.enter="showSelectRemainders"
      autofocus
    >
      {{ startRemainder }}
      <img
        class="arrow-down-icon"
        src="/src/assets/images/arrow_down.svg"
        alt="open"
      />
    </div>
    <div
      class="start-remainder__values"
      v-show="seenSelectRemainders"
      @click.stop=""
    >
      <div
        class="start-remainder__value"
        tabindex="0"
        @click="
          !(startRemainder === 501)
            ? $emit('updateStartRemainder', 501)
            : closeSelectRemainders()
        "
        @keyup.enter="
          !(startRemainder === 501)
            ? $emit('updateStartRemainder', 501)
            : closeSelectRemainders()
        "
      >
        501
      </div>
      <div
        class="start-remainder__value"
        tabindex="0"
        @click="
          !(startRemainder === 1001)
            ? $emit('updateStartRemainder', 1001)
            : closeSelectRemainders()
        "
        @keyup.enter="
          !(startRemainder === 1001)
            ? $emit('updateStartRemainder', 1001)
            : closeSelectRemainders()
        "
        @keydown.tab="closeSelectRemainders"
      >
        1001
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.start-remainder {
  align-self: center;

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(var(--base) * 1.8);
    padding: calc(var(--base) * 0.08);
    padding-right: calc(var(--base) * 0.16);
    outline: none;
    border: calc(var(--base) * 0.01) solid transparent;
    border-radius: calc(var(--base) * 0.04);
    font: inherit;
    text-align: center;
    cursor: default;
    background-color: rgb(221, 231, 231);

    &:focus-visible {
      outline: calc(var(--base) * 0.01) solid black;
    }
  }

  &__values {
    position: absolute;
    z-index: 2;
    border-radius: calc(var(--base) * 0.04);
    background-color: rgb(208, 216, 216);
  }

  &__value {
    width: calc(var(--base) * 1.8);
    margin-top: calc(var(--base) * 0.04);
    margin-bottom: calc(var(--base) * 0.04);
    padding: calc(var(--base) * 0.08);
    outline: none;
    border: calc(var(--base) * 0.01) solid transparent;
    border-radius: calc(var(--base) * 0.04);
    font: inherit;
    text-align: center;
    cursor: default;
    background-color: rgb(221, 231, 231);

    &:hover,
    &:focus-visible {
      background-color: rgb(146, 188, 214);
    }
  }
}

.arrow-down-icon {
  position: absolute;
  right: 0;
  width: calc(var(--base) * 0.24);
  height: calc(var(--base) * 0.24);
  display: block;
}
</style>
