<script setup>
import { computed } from 'vue';
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
let newRemainderPlayerOne;
let newRemainderPlayerTwo;

const calculateRemainder = (roundPoints, player) => {
  //попробовать сделать динамически(передавать ссылку в функцию)
  if (player === 'playerOne') {
    newRemainderPlayerOne = props.remainderPlayerOne - roundPoints;
    if (newRemainderPlayerOne > 1)
      emit(
        'setPointsAndRemainder',
        roundPoints,
        newRemainderPlayerOne,
        'playerOne',
        props.roundNumber
      );
    if (newRemainderPlayerOne === 0) emit('legCompleted', 'playerOne');
  }
  if (player === 'playerTwo') {
    newRemainderPlayerTwo = props.remainderPlayerTwo - roundPoints;
    if (newRemainderPlayerTwo > 1)
      emit(
        'setPointsAndRemainder',
        roundPoints,
        newRemainderPlayerTwo,
        'playerTwo',
        props.roundNumber
      );
    if (newRemainderPlayerTwo === 0) emit('legCompleted', 'playerTwo');
  }
};

const seenRoundPointsP1 = computed(() =>
  Boolean(
    (props.legNumber % 2 && props.setNumber % 2 && props.remainderPlayerTwo) ||
      (props.legNumber % 2 === 0 &&
        props.setNumber % 2 &&
        props.newRemainderPlayerTwo) ||
      (props.legNumber % 2 === 0 &&
        props.setNumber % 2 === 0 &&
        props.remainderPlayerTwo) ||
      (props.legNumber % 2 &&
        props.setNumber % 2 === 0 &&
        props.newRemainderPlayerTwo)
  )
);

const seenRoundPointsP2 = computed(
  () => Boolean(
    (props.legNumber % 2 === 0 &&
      props.setNumber % 2 &&
      props.remainderPlayerOne) ||
    (props.legNumber % 2 &&
      props.setNumber % 2 &&
      props.newRemainderPlayerOne) ||
    (props.legNumber % 2 &&
      props.setNumber % 2 === 0 &&
      props.remainderPlayerOne) ||
    (props.legNumber % 2 === 0 &&
      props.setNumber % 2 === 0 &&
      props.newRemainderPlayerOne)
));
</script>

<template>
  <div class="points__round-information round-information">
    <div
      class="round-information__points-area round-information__points-area_margin-right"
    >
      <RoundPoints
        :remainder="props.remainderPlayerOne"
        :points="props.roundPointsPlayerOne"
        :seenRoundPoints="seenRoundPointsP1"
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
        :remainder="props.remainderPlayerTwo"
        :points="props.roundPointsPlayerTwo"
        :seenRoundPoints="seenRoundPointsP2"
        @setPoints="
          (roundPoints) => calculateRemainder(roundPoints, 'playerTwo')
        "
      />
    </div>
  </div>
</template>

<style lang="scss">
.round-information__points-area {
  display: flex;
  align-items: center;
  width: 140px;
}

.round-information__points-area_margin-right {
  margin-right: 16px;
}

.round-information__points-area_margin-left {
  margin-left: 16px;
}
</style>
