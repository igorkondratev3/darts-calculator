<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  remainder: Number,
  points: Number,
  seenRoundPoints: Boolean
});

const emit = defineEmits(['setPoints']);

const roundPoints = ref(props.points);

watch(
  () => props.points,
  () => {
    roundPoints.value = props.points;
  }
);
//подумать над этим - исчезают значения при hot reload когда этого нет

const checkNumber = (event) => {
  if (event.data < '0' || event.data > '9') roundPoints.value = 0;
  if (
    roundPoints.value > 180 ||
    roundPoints.value < 0 ||
    roundPoints.value > props.remainder ||
    props.remainder - roundPoints.value === 1
  )
    roundPoints.value = Math.trunc(roundPoints.value / 10);
  if (roundPoints.value === 0) {
    roundPoints.value = '0';
    roundPoints.value = 0; //защита от нескольких нулей
  }
};

const setPoints = () => {
  if (roundPoints.value || roundPoints.value === 0)
    emit('setPoints', roundPoints.value);
};
</script>

<template>
  <input
    class="round-information__points"
    type="number"
    min="0"
    max="180"
    v-show="seenRoundPoints"
    v-model="roundPoints"
    @input="checkNumber"
    @keyup.enter="setPoints"
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

@media(max-width: 800px) {
  .round-information__points {
    width: calc(var(--base) * 0.9);
  }
}

@media(max-width: 550px) {
  .round-information__points {
    font-size: calc(var(--base) * 0.32);
    width: calc(var(--base) * 0.7);
  }
}
</style>
