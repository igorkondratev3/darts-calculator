<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  remainder: Number,
  points: Number,
  seenRoundPoints: Boolean
});

const emit = defineEmits(['setPoints']);

const roundPoints = ref();

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
  width: 140px;
  padding: 8px;
  outline: none;
  border: 1px solid black;
  border-radius: 8px;
  @include fonts.Advent;
  font-size: 48px;
  text-align: center;
  background: transparent;

  &:focus {
    background: radial-gradient(transparent 65%, rgb(182, 195, 197));
  }
}
</style>
