<script setup>
import { toRef } from 'vue';
import RoundPoints from './roundPoints/roundPoints.vue';
import { useRoundPointsVisibility } from './composables.js';
import { calculateRemainder } from './helpers.js';

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

defineEmits(['setPointsAndRemainder', 'legCompleted']);

const roundPointsVisibilityP1 = useRoundPointsVisibility(
  'P1',
  toRef(props, 'legNumber'),
  toRef(props, 'setNumber'),
  toRef(props, 'remainderBeforeGetPointsP2'),
  toRef(props, 'remainderAfterGetPointsP2')
);

const roundPointsVisibilityP2 = useRoundPointsVisibility(
  'P2',
  toRef(props, 'legNumber'),
  toRef(props, 'setNumber'),
  toRef(props, 'remainderBeforeGetPointsP1'),
  toRef(props, 'remainderAfterGetPointsP1')
);
</script>

<template>
  <div class="points__round-information round-information">
    <div
      class="round-information__points-area round-information__points-area_margin-right"
    >
      <RoundPoints
        :remainder="remainderBeforeGetPointsP1"
        :points="roundPointsP1"
        :seenRoundPoints="roundPointsVisibilityP1"
        @setPoints="
          (roundPoints) =>
            calculateRemainder(
              roundPoints,
              'playerOne',
              remainderBeforeGetPointsP1,
              roundNumber,
              $emit
            )
        "
      />
    </div>
    <div class="round-information__remainder">
      {{ remainderAfterGetPointsP1 }}
    </div>
    <div class="round-information__number-darts">
      {{ roundNumber * 3 }}
    </div>
    <div class="round-information__remainder">
      {{ remainderAfterGetPointsP2 }}
    </div>
    <div
      class="round-information__points-area round-information__points-area_margin-left"
    >
      <RoundPoints
        :remainder="remainderBeforeGetPointsP2"
        :points="roundPointsP2"
        :seenRoundPoints="roundPointsVisibilityP2"
        @setPoints="
          (roundPoints) =>
            calculateRemainder(
              roundPoints,
              'playerTwo',
              remainderBeforeGetPointsP2,
              roundNumber,
              $emit
            )
        "
      />
    </div>
  </div>
</template>

<style lang="scss">
.round-information__points-area {
  display: flex;
  align-items: center;
  width: calc(var(--base) * 1.4);
}

.round-information__points-area_margin-right {
  margin-right: calc(var(--base) * 0.16);
}

.round-information__points-area_margin-left {
  margin-left: calc(var(--base) * 0.16);
}

@media (max-width: 550px) {
  .round-information__points-area {
    display: flex;
    align-items: center;
    width: calc(var(--base) * 0.7);
  }
}

@media (max-width: 800px) {
  .round-information__points-area {
    width: calc(var(--base) * 0.9);
  }
}
</style>
