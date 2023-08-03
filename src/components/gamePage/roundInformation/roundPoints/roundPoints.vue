<script setup>
import { toRef } from 'vue';
import { useRoundPoints } from './composables.js';
import { scrollToElement } from '@/helpers/general.js';

const props = defineProps({
  remainder: Number,
  points: Number,
  seenRoundPoints: Boolean
});

defineEmits(['setPoints']);

const { roundPoints, checkNumber, setPoints } = useRoundPoints(
  toRef(props, 'points')
);
</script>

<template>
  <input
    class="round-information__points"
    type="number"
    min="0"
    max="180"
    v-show="seenRoundPoints"
    v-model="roundPoints"
    @input="checkNumber(remainder, $event)"
    @keyup.enter="setPoints($emit)"
    @focus="scrollToElement"
  />
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.round-information__points {
  width: calc(var(--base) * 1.4);
  padding: calc(var(--base) * 0.08);
  outline: none;
  border: calc(var(--base) * 0.01) solid black;
  border-radius: calc(var(--base) * 0.08);
  @include fonts.Advent;
  font-size: calc(var(--base) * 0.48);
  text-align: center;
  background: transparent;

  &:focus {
    background: radial-gradient(transparent 65%, rgb(182, 195, 197));
  }
}

@media (max-width: 800px) {
  .round-information__points {
    width: calc(var(--base) * 0.9);
  }
}

@media (max-width: 550px) {
  .round-information__points {
    font-size: calc(var(--base) * 0.32);
    width: calc(var(--base) * 0.7);
  }
}
</style>
