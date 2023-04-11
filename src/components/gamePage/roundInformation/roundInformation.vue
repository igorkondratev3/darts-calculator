<script setup>
import { computed } from 'vue';
import RoundPoints from './roundPoints/roundPoints.vue';
const props = defineProps({
  remainderBeforeGetPointsP1: Number,
  remainderBeforeGetPointsP2: Number,
  remainderAfterGetPointsP1: Number,
  remainderAfterGetPointsP2: Number,
  roundPointsP1: Number,
  roundPointsP2: Number,
  roundNumber: Number,
  legNumber: Number,
  setNumber: Number
});

const emit = defineEmits(['setPointsAndRemainder', 'legCompleted']);

const calculateRemainder = (roundPoints, player) => {
  const shortPlayer = player === 'playerOne' ? 'P1' : 'P2';
  let remainderAfterGetPoints =
    props[`remainderBeforeGetPoints${shortPlayer}`] - roundPoints;
  if (remainderAfterGetPoints > 1)
    emit(
      'setPointsAndRemainder',
      roundPoints,
      remainderAfterGetPoints,
      player,
      props.roundNumber
    );
  if (remainderAfterGetPoints === 0) emit('legCompleted', player);
};

const seenRoundPointsP1 = computed(() =>
  Boolean(
    (props.legNumber % 2 &&
      props.setNumber % 2 &&
      props.remainderBeforeGetPointsP2) ||
      (props.legNumber % 2 === 0 &&
        props.setNumber % 2 &&
        props.remainderAfterGetPointsP2) ||
      (props.legNumber % 2 === 0 &&
        props.setNumber % 2 === 0 &&
        props.remainderBeforeGetPointsP2) ||
      (props.legNumber % 2 &&
        props.setNumber % 2 === 0 &&
        props.remainderAfterGetPointsP2)
  )
);

const seenRoundPointsP2 = computed(() =>
  Boolean(
    (props.legNumber % 2 === 0 &&
      props.setNumber % 2 &&
      props.remainderBeforeGetPointsP1) ||
      (props.legNumber % 2 &&
        props.setNumber % 2 &&
        props.remainderAfterGetPointsP1) ||
      (props.legNumber % 2 &&
        props.setNumber % 2 === 0 &&
        props.remainderBeforeGetPointsP1) ||
      (props.legNumber % 2 === 0 &&
        props.setNumber % 2 === 0 &&
        props.remainderAfterGetPointsP1)
  )
);
</script>

<template>
  <div class="points__round-information round-information">
    <div
      class="round-information__points-area round-information__points-area_margin-right"
    >
      <RoundPoints
        :remainder="props.remainderBeforeGetPointsP1"
        :points="props.roundPointsP1"
        :seenRoundPoints="seenRoundPointsP1"
        @setPoints="
          (roundPoints) => calculateRemainder(roundPoints, 'playerOne')
        "
      />
    </div>
    <div class="round-information__remainder">
      {{ props.remainderAfterGetPointsP1 }}
    </div>
    <div class="round-information__number-darts">
      {{ props.roundNumber * 3 }}
    </div>
    <div class="round-information__remainder">
      {{ props.remainderAfterGetPointsP2 }}
    </div>
    <div
      class="round-information__points-area round-information__points-area_margin-left"
    >
      <RoundPoints
        :remainder="props.remainderBeforeGetPointsP2"
        :points="props.roundPointsP2"
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
