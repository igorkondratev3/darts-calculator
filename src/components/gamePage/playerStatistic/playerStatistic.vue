<script setup>
import StatisticVisibility from './components/statisticVisibility.vue';
import { ref, computed } from 'vue';
const props = defineProps({
  gameStatistic: Object,
  setStatistic: Object,
  averagePointsLeg: Number
});

const seenSetupVisisbility = ref(false);
const seenAveragePointsGame = ref(true);
const seenAveragePointsSet = ref(true);
const seenAveragePointsLeg = ref(true);
const seenAverageFirstNineDartsGame = ref(true);
const seenAverageFirstNineDartsSet = ref(true);
const seenAveragePointsWinLegsGame = ref(true);
const seenAveragePointsWinLegsSet = ref(true);
const seenAveragePointsLoseLegsGame = ref(true);
const seenAveragePointsLoseLegsSet = ref(true);
const seenP180Game = ref(true);
const seenP171Game = ref(true);
const seenP131Game = ref(true);
const seenP96Game = ref(true);
const seenP180Set = ref(true);
const seenP171Set = ref(true);
const seenP131Set = ref(true);
const seenP96Set = ref(true);
const seenPercentDoubleGame = ref(true);
const seenPercentDoubleSet = ref(true);
const seenHighestCheckoutGame = ref(true);
const seenHighestCheckoutSet = ref(true);

const selectAll = () => {
  seenAveragePointsGame.value = true;
  seenAveragePointsSet.value = true;
  seenAveragePointsLeg.value = true;
  seenAverageFirstNineDartsGame.value = true;
  seenAverageFirstNineDartsSet.value = true;
  seenAveragePointsWinLegsGame.value = true;
  seenAveragePointsWinLegsSet.value = true;
  seenAveragePointsLoseLegsGame.value = true;
  seenAveragePointsLoseLegsSet.value = true;
  seenP180Game.value = true;
  seenP171Game.value = true;
  seenP131Game.value = true;
  seenP96Game.value = true;
  seenP180Set.value = true;
  seenP171Set.value = true;
  seenP131Set.value = true;
  seenP96Set.value = true;
  seenPercentDoubleGame.value = true;
  seenPercentDoubleSet.value = true;
  seenHighestCheckoutGame.value = true;
  seenHighestCheckoutSet.value = true;
};

const removeSelection = () => {
  seenAveragePointsGame.value = false;
  seenAveragePointsSet.value = false;
  seenAveragePointsLeg.value = false;
  seenAverageFirstNineDartsGame.value = false;
  seenAverageFirstNineDartsSet.value = false;
  seenAveragePointsWinLegsGame.value = false;
  seenAveragePointsWinLegsSet.value = false;
  seenAveragePointsLoseLegsGame.value = false;
  seenAveragePointsLoseLegsSet.value = false;
  seenP180Game.value = false;
  seenP171Game.value = false;
  seenP131Game.value = false;
  seenP96Game.value = false;
  seenP180Set.value = false;
  seenP171Set.value = false;
  seenP131Set.value = false;
  seenP96Set.value = false;
  seenPercentDoubleGame.value = false;
  seenPercentDoubleSet.value = false;
  seenHighestCheckoutGame.value = false;
  seenHighestCheckoutSet.value = false;
};

const seenAverageFirstNineDarts = computed(
  () =>
    seenAverageFirstNineDartsGame.value || seenAverageFirstNineDartsSet.value
);

const seenAveragePointsWinLegs = computed(
  () => seenAveragePointsWinLegsGame.value || seenAveragePointsWinLegsSet.value
);

const seenAveragePointsLoseLegs = computed(
  () =>
    seenAveragePointsLoseLegsGame.value || seenAveragePointsLoseLegsSet.value
);
const seenAveragePoints = computed(
  () =>
    seenAveragePointsGame.value ||
    seenAveragePointsSet.value ||
    seenAveragePointsLeg.value ||
    seenAverageFirstNineDarts.value ||
    seenAveragePointsWinLegs.value ||
    seenAveragePointsLoseLegs.value
);

const seenPointsGame = computed(
  () =>
    seenP180Game.value ||
    seenP171Game.value ||
    seenP131Game.value ||
    seenP96Game.value
);

const seenPointsSet = computed(
  () =>
    seenP180Set.value ||
    seenP171Set.value ||
    seenP131Set.value ||
    seenP96Set.value
);

const seenPoints = computed(() => seenPointsSet.value || seenPointsGame.value);

const seenDouble = computed(
  () => seenPercentDoubleGame.value || seenPercentDoubleSet.value
);

const seenHighest = computed(
  () => seenHighestCheckoutGame.value || seenHighestCheckoutSet.value
);

const seenClosing = computed(() => seenDouble.value || seenHighest.value);
</script>

<template>
  <div class="points-information__statistic statistic">
    <div class="statistic__player-statistic" v-show="!seenSetupVisisbility">
      <img
        class="statistic__setup-visibility"
        src="/src/assets/images/menu.svg"
        @click="seenSetupVisisbility = true"
        title="Настроить видимость параметров"
        alt="меню"
      />
      <div
        class="statistic__average statistic-average"
        v-if="seenAveragePoints"
      >
        <h4
          class="statistic__group-header statistic__group-header_margin-bottom"
        >
          Средний набор
        </h4>
        <div class="statistic-average__points">
          <div class="statistic__values" v-if="seenAveragePointsGame">
            матч<br />{{ props.gameStatistic.averagePoints.value.toFixed(2) }}
          </div>
          <div class="statistic__values" v-if="seenAveragePointsSet">
            сет<br />{{ props.setStatistic.averagePoints.value.toFixed(2) }}
          </div>
          <div class="statistic__values" v-if="seenAveragePointsLeg">
            лег<br />{{ props.averagePointsLeg.toFixed(2) }}
          </div>
        </div>
        <div
          class="statistic-average__nine-darts"
          v-if="seenAverageFirstNineDarts"
        >
          <h5 class="statistic__parameter-header">9 дротиков</h5>
          <div class="statistic__values" v-if="seenAverageFirstNineDartsGame">
            матч<br />
            {{ props.gameStatistic.averageFirstNineDarts.value.toFixed(2) }}
          </div>
          <div class="statistic__values" v-if="seenAverageFirstNineDartsSet">
            сет<br />
            {{ props.setStatistic.averageFirstNineDarts.value.toFixed(2) }}
          </div>
        </div>
        <div
          class="statistic-average__win-legs"
          v-if="seenAveragePointsWinLegs"
        >
          <h5 class="statistic__parameter-header">выигранные леги</h5>
          <div class="statistic__values" v-if="seenAveragePointsWinLegsGame">
            матч<br />
            {{ props.gameStatistic.averagePointsWinLegs.value.toFixed(2) }}
          </div>
          <div class="statistic__values" v-if="seenAveragePointsWinLegsSet">
            сет<br />
            {{ props.setStatistic.averagePointsWinLegs.value.toFixed(2) }}
          </div>
        </div>
        <div
          class="statistic-average__lose-legs"
          v-if="seenAveragePointsLoseLegs"
        >
          <h5 class="statistic__parameter-header">проигранные леги</h5>
          <div class="statistic__values" v-if="seenAveragePointsLoseLegsGame">
            матч<br />
            {{ props.gameStatistic.averagePointsLoseLegs.value.toFixed(2) }}
          </div>
          <div class="statistic__values" v-if="seenAveragePointsLoseLegsSet">
            сет<br />
            {{ props.setStatistic.averagePointsLoseLegs.value.toFixed(2) }}
          </div>
        </div>
      </div>
      <div class="statistic__points statistic-points" v-if="seenPoints">
        <h4 class="statistic__group-header">Очки</h4>
        <div class="statistic-points__game-points" v-if="seenPointsGame">
          <h5 class="statistic__parameter-header">матч</h5>
          <div class="statistic__values" v-if="seenP180Game">
            180<br />{{ props.gameStatistic.p180.value }}
          </div>
          <div class="statistic__values" v-if="seenP171Game">
            171+<br />{{ props.gameStatistic.p171.value }}
          </div>
          <div class="statistic__values" v-if="seenP131Game">
            131+<br />{{ props.gameStatistic.p131.value }}
          </div>
          <div class="statistic__values" v-if="seenP96Game">
            96+<br />{{ props.gameStatistic.p96.value }}
          </div>
        </div>
        <div class="statistic-points__set-points" v-if="seenPointsSet">
          <h5 class="statistic__parameter-header">сет</h5>
          <div class="statistic__values" v-if="seenP180Set">
            180<br />{{ props.setStatistic.p180.value }}
          </div>
          <div class="statistic__values" v-if="seenP171Set">
            171+<br />{{ props.setStatistic.p171.value }}
          </div>
          <div class="statistic__values" v-if="seenP131Set">
            131+<br />{{ props.setStatistic.p131.value }}
          </div>
          <div class="statistic__values" v-if="seenP96Set">
            96+<br />{{ props.setStatistic.p96.value }}
          </div>
        </div>
      </div>
      <div class="statistic__closing statistic-closing" v-if="seenClosing">
        <h4 class="statistic__group-header">Закрытия</h4>
        <div class="statistic-closing__double" v-if="seenDouble">
          <h5 class="statistic__parameter-header">% удвоений</h5>
          <div class="statistic__values" v-if="seenPercentDoubleGame">
            матч<br />
            {{ props.gameStatistic.percentDouble.value.toFixed(2) }} %
          </div>
          <div class="statistic__values" v-if="seenPercentDoubleSet">
            сет<br />
            {{ props.setStatistic.percentDouble.value.toFixed(2) }} %
          </div>
        </div>
        <div class="statistic-closing__highest" v-if="seenHighest">
          <h5 class="statistic__parameter-header">наибольшее</h5>
          <div class="statistic__values" v-if="seenHighestCheckoutGame">
            матч<br />
            {{ props.gameStatistic.highestCheckout.value }}
          </div>
          <div class="statistic__values" v-if="seenHighestCheckoutSet">
            сет<br />
            {{ props.setStatistic.highestCheckout.value }}
          </div>
        </div>
      </div>
    </div>
    <StatisticVisibility
      :seenSetupVisisbility="seenSetupVisisbility"
      @closeStatisticVisibility="seenSetupVisisbility = false"
      @selectAll="selectAll"
      @removeSelection="removeSelection"
      v-model:seenAveragePointsGame="seenAveragePointsGame"
      v-model:seenAveragePointsSet="seenAveragePointsSet"
      v-model:seenAveragePointsLeg="seenAveragePointsLeg"
      v-model:seenAverageFirstNineDartsGame="seenAverageFirstNineDartsGame"
      v-model:seenAverageFirstNineDartsSet="seenAverageFirstNineDartsSet"
      v-model:seenAveragePointsWinLegsGame="seenAveragePointsWinLegsGame"
      v-model:seenAveragePointsWinLegsSet="seenAveragePointsWinLegsSet"
      v-model:seenAveragePointsLoseLegsGame="seenAveragePointsLoseLegsGame"
      v-model:seenAveragePointsLoseLegsSet="seenAveragePointsLoseLegsSet"
      v-model:seenP180Game="seenP180Game"
      v-model:seenP171Game="seenP171Game"
      v-model:seenP131Game="seenP131Game"
      v-model:seenP96Game="seenP96Game"
      v-model:seenP180Set="seenP180Set"
      v-model:seenP171Set="seenP171Set"
      v-model:seenP131Set="seenP131Set"
      v-model:seenP96Set="seenP96Set"
      v-model:seenPercentDoubleGame="seenPercentDoubleGame"
      v-model:seenPercentDoubleSet="seenPercentDoubleSet"
      v-model:seenHighestCheckoutGame="seenHighestCheckoutGame"
      v-model:seenHighestCheckoutSet="seenHighestCheckoutSet"
    />
  </div>
</template>

<style lang="scss">
.points-information {
  &__statistic {
    flex-grow: 1;
    flex-basis: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
}
.statistic {
  &__player-statistic {
    position: sticky;
    top: 8px;
    display: flex;
    flex-direction: column;
    min-height: 200px;
    max-height: 80vh;
    margin-top: 8px;
    margin-left: 4px;
    margin-right: 4px;
    padding: 16px;
    padding-top: 0px;
    border-radius: 16px;
    overflow: auto;
    background-color: rgb(182, 195, 197);

    &::-webkit-scrollbar {
      display: none;
    }

    &::-webkit-scrollbar-track {
      display: none;
    }

    &::-webkit-scrollbar-thumb {
      display: none;
    }

    scrollbar-width: none;
  }

  &__setup-visibility {
    position: sticky;
    align-self: flex-end;
    top: 4px;
    margin-right: -12px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  &__visibility {
    min-height: 80vh;
  }

  &__average,
  &__points,
  &__closing {
    display: flex;
    flex-direction: column;
  }

  &__group-header {
    margin-top: 24px;
    font-size: 28px;
    font-weight: 700;
    color: white;
    text-align: center;
  }

  &__group-header_margin-bottom {
    margin-bottom: 8px;
  }

  &__parameter-header {
    width: 100%;
    margin-top: 16px;
    font-size: 24px;
    color: white;
    text-align: center;
  }

  &__values {
    font-size: 24px;
    text-align: center;
  }
}

.statistic-average__nine-darts,
.statistic-average__points,
.statistic-average__lose-legs,
.statistic-average__win-legs,
.statistic-points__game-points,
.statistic-points__set-points,
.statistic-closing__double,
.statistic-closing__highest {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
