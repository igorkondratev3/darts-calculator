<script setup>
import { ref } from 'vue';
import RoundPoints from './roundPoints/roundPoints.vue';
const props = defineProps({
  remainderPlayerOne: Number,
  remainderPlayerTwo: Number,
  roundNumber: Number,
  newRemainderPlayerOne: Number,
  newRemainderPlayerTwo: Number,
  roundPointsPlayerOne: Number,
  roundPointsPlayerTwo: Number,
  legNumber: Number,
  setNumber: Number
});

const emit = defineEmits(['setPointsAndRemainder', 'legCompleted']);
const newRemainderPlayerOne = ref();
const newRemainderPlayerTwo = ref();

const calculateRemainder = (roundPoints, player) => {
  //попробовать сделать динамически(передавать ссылку в функцию)
  if (player === 'playerOne') {
    newRemainderPlayerOne.value = props.remainderPlayerOne - roundPoints;
    if (newRemainderPlayerOne.value > 1)
      emit(
        'setPointsAndRemainder',
        roundPoints,
        newRemainderPlayerOne.value,
        'playerOne', props.roundNumber
      );
    if (newRemainderPlayerOne.value === 0) emit('legCompleted', 'playerOne');
  }
  if (player === 'playerTwo') {
    newRemainderPlayerTwo.value = props.remainderPlayerTwo - roundPoints;
    if (newRemainderPlayerTwo.value > 1)
      emit(
        'setPointsAndRemainder',
        roundPoints,
        newRemainderPlayerTwo.value,
        'playerTwo', props.roundNumber
      );
    if (newRemainderPlayerTwo.value === 0) emit('legCompleted', 'playerTwo');
  }
};
</script>

<template>
  <div class="points__round-information round-information">
    <div
      class="round-information__points-area round-information__points-area_margin-right"
    >
      <RoundPoints
        v-show="
          (props.legNumber % 2 && props.setNumber % 2 && props.remainderPlayerTwo) ||
          (props.legNumber % 2 === 0 && props.setNumber % 2 && props.newRemainderPlayerTwo) ||
          (props.legNumber % 2 === 0 && props.setNumber % 2 === 0 && props.remainderPlayerTwo) ||
          (props.legNumber % 2 && props.setNumber % 2 === 0 && props.newRemainderPlayerTwo)
        "
        :remainder="props.remainderPlayerOne"
        :points="props.roundPointsPlayerOne"
        @setPoints="
          (roundPoints) => calculateRemainder(roundPoints, 'playerOne')
        "
      />
    </div>
    <div class="round-information__remainder">
      {{ props.newRemainderPlayerOne }}
    </div>
    <div class="round-information__number-darts">
      {{ props.roundNumber * 3 }}
    </div>
    <div class="round-information__remainder">
      {{ props.newRemainderPlayerTwo }}
    </div>
    <div
      class="round-information__points-area round-information__points-area_margin-left"
    >
      <RoundPoints
        v-show="
          (props.legNumber % 2 === 0 && props.setNumber % 2 && props.remainderPlayerOne) ||
          (props.legNumber % 2 && props.setNumber % 2 && props.newRemainderPlayerOne) ||
          (props.legNumber % 2 && props.setNumber % 2 === 0 && props.remainderPlayerOne) ||
          (props.legNumber % 2 === 0 && props.setNumber % 2 === 0 && props.newRemainderPlayerOne)
        "
        :remainder="props.remainderPlayerTwo"
        :points="props.roundPointsPlayerTwo"
        @setPoints="
          (roundPoints) => calculateRemainder(roundPoints, 'playerTwo')
        "
      />
    </div>
  </div>
</template>

<style lang="scss">
.round-information__points-area {
  width: 140px;
}

.round-information__points-area_margin-right {
  margin-right: 16px;
}

.round-information__points-area_margin-left {
  margin-left: 16px;
}
</style>
