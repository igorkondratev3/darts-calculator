<script setup>
import StatisticVisibility from './components/statisticVisibility.vue';
import { SeenParameters, SeenGroups } from './seenClases.js'
import { ref } from 'vue';
const props = defineProps({
  gameStatistic: Object,
  setStatistic: Object,
  averagePointsLeg: Number,
  isSets: Boolean,
  isPercentDouble: Boolean
});

const seenSetupVisisbility = ref(false);
const seenAveragePointsLeg = ref(true);
const seenParametersGame = new SeenParameters(true, props.isPercentDouble);
const seenParametersSet = props.isSets ? new SeenParameters(true, props.isPercentDouble) : new SeenParameters(false, props.isPercentDouble);
const seenGroups = new SeenGroups(
  seenParametersGame,
  seenParametersSet,
  seenAveragePointsLeg
);

const selectAll = () => {
  seenParametersGame.selectAll();
  if (props.isSets)
    seenParametersSet.selectAll();
  seenAveragePointsLeg.value = true;
};

const removeSelection = () => {
  seenParametersGame.removeSelection();
  if (props.isSets)
    seenParametersSet.removeSelection();
  seenAveragePointsLeg.value = false;
};
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
        v-if="seenGroups.averagePoints.value"
      >
        <h4
          class="statistic__group-header statistic__group-header_margin-bottom"
        >
          Средний набор
        </h4>
        <div class="statistic-average__points">
          <div
            class="statistic__values"
            v-if="seenParametersGame.averagePoints.value"
          >
            матч<br />{{ props.gameStatistic.averagePoints.value.toFixed(2) }}
          </div>
          <div
            class="statistic__values"
            v-if="seenParametersSet.averagePoints.value"
          >
            сет<br />{{ props.setStatistic.averagePoints.value.toFixed(2) }}
          </div>
          <div class="statistic__values" v-if="seenAveragePointsLeg">
            лег<br />{{ props.averagePointsLeg.toFixed(2) }}
          </div>
        </div>
        <div
          class="statistic-average__nine-darts"
          v-if="seenGroups.averageFirstNineDarts.value"
        >
          <h5 class="statistic__parameter-header">9 дротиков</h5>
          <div
            class="statistic__values"
            v-if="seenParametersGame.averageFirstNineDarts.value"
          >
            матч<br />
            {{ props.gameStatistic.averageFirstNineDarts.value.toFixed(2) }}
          </div>
          <div
            class="statistic__values"
            v-if="seenParametersSet.averageFirstNineDarts.value"
          >
            сет<br />
            {{ props.setStatistic.averageFirstNineDarts.value.toFixed(2) }}
          </div>
        </div>
        <div
          class="statistic-average__win-legs"
          v-if="seenGroups.averagePointsWinLegs.value"
        >
          <h5 class="statistic__parameter-header">выигранные леги</h5>
          <div
            class="statistic__values"
            v-if="seenParametersGame.averagePointsWinLegs.value"
          >
            матч<br />
            {{ props.gameStatistic.averagePointsWinLegs.value.toFixed(2) }}
          </div>
          <div
            class="statistic__values"
            v-if="seenParametersSet.averagePointsWinLegs.value"
          >
            сет<br />
            {{ props.setStatistic.averagePointsWinLegs.value.toFixed(2) }}
          </div>
        </div>
        <div
          class="statistic-average__lose-legs"
          v-if="seenGroups.averagePointsLoseLegs.value"
        >
          <h5 class="statistic__parameter-header">проигранные леги</h5>
          <div
            class="statistic__values"
            v-if="seenParametersGame.averagePointsLoseLegs.value"
          >
            матч<br />
            {{ props.gameStatistic.averagePointsLoseLegs.value.toFixed(2) }}
          </div>
          <div
            class="statistic__values"
            v-if="seenParametersSet.averagePointsLoseLegs.value"
          >
            сет<br />
            {{ props.setStatistic.averagePointsLoseLegs.value.toFixed(2) }}
          </div>
        </div>
      </div>
      <div
        class="statistic__points statistic-points"
        v-if="seenGroups.points.value"
      >
        <h4 class="statistic__group-header">Очки</h4>
        <div
          class="statistic-points__game-points"
          v-if="seenParametersGame.points.value"
        >
          <h5 class="statistic__parameter-header">матч</h5>
          <div class="statistic__values" v-if="seenParametersGame.p180.value">
            180<br />{{ props.gameStatistic.p180.value }}
          </div>
          <div class="statistic__values" v-if="seenParametersGame.p171.value">
            171+<br />{{ props.gameStatistic.p171.value }}
          </div>
          <div class="statistic__values" v-if="seenParametersGame.p131.value">
            131+<br />{{ props.gameStatistic.p131.value }}
          </div>
          <div class="statistic__values" v-if="seenParametersGame.p96.value">
            96+<br />{{ props.gameStatistic.p96.value }}
          </div>
        </div>
        <div
          class="statistic-points__set-points"
          v-if="seenParametersSet.points.value"
        >
          <h5 class="statistic__parameter-header">сет</h5>
          <div class="statistic__values" v-if="seenParametersSet.p180.value">
            180<br />{{ props.setStatistic.p180.value }}
          </div>
          <div class="statistic__values" v-if="seenParametersSet.p171.value">
            171+<br />{{ props.setStatistic.p171.value }}
          </div>
          <div class="statistic__values" v-if="seenParametersSet.p131.value">
            131+<br />{{ props.setStatistic.p131.value }}
          </div>
          <div class="statistic__values" v-if="seenParametersSet.p96.value">
            96+<br />{{ props.setStatistic.p96.value }}
          </div>
        </div>
      </div>
      <div
        class="statistic__closing statistic-closing"
        v-if="seenGroups.closing.value"
      >
        <h4 class="statistic__group-header">Закрытия</h4>
        <div class="statistic-closing__double" v-if="seenGroups.double.value && props.isPercentDouble">
          <h5 class="statistic__parameter-header">% удвоений</h5>
          <div
            class="statistic__values"
            v-if="seenParametersGame.percentDouble.value"
          >
            матч<br />
            {{ props.gameStatistic.percentDouble.value.toFixed(2) }} %
          </div>
          <div
            class="statistic__values"
            v-if="seenParametersSet.percentDouble.value"
          >
            сет<br />
            {{ props.setStatistic.percentDouble.value.toFixed(2) }} %
          </div>
        </div>
        <div class="statistic-closing__highest" v-if="seenGroups.highest.value">
          <h5 class="statistic__parameter-header">наибольшее</h5>
          <div
            class="statistic__values"
            v-if="seenParametersGame.highestCheckout.value"
          >
            матч<br />
            {{ props.gameStatistic.highestCheckout.value }}
          </div>
          <div
            class="statistic__values"
            v-if="seenParametersSet.highestCheckout.value"
          >
            сет<br />
            {{ props.setStatistic.highestCheckout.value }}
          </div>
        </div>
      </div>
    </div>
    <StatisticVisibility
      :seenSetupVisisbility="seenSetupVisisbility"
      :isSets="props.isSets"
      :isPercentDouble="props.isPercentDouble"
      @closeStatisticVisibility="seenSetupVisisbility = false"
      @selectAll="selectAll"
      @removeSelection="removeSelection"
      v-model:seenAveragePointsLeg="seenAveragePointsLeg"
      v-model:seenAveragePointsGame="seenParametersGame.averagePoints.value"
      v-model:seenAverageFirstNineDartsGame="
        seenParametersGame.averageFirstNineDarts.value
      "
      v-model:seenAveragePointsWinLegsGame="
        seenParametersGame.averagePointsWinLegs.value
      "
      v-model:seenAveragePointsLoseLegsGame="
        seenParametersGame.averagePointsLoseLegs.value
      "
      v-model:seenP180Game="seenParametersGame.p180.value"
      v-model:seenP171Game="seenParametersGame.p171.value"
      v-model:seenP131Game="seenParametersGame.p131.value"
      v-model:seenP96Game="seenParametersGame.p96.value"
      v-model:seenPercentDoubleGame="seenParametersGame.percentDouble.value"
      v-model:seenHighestCheckoutGame="seenParametersGame.highestCheckout.value"
      v-model:seenAveragePointsSet="seenParametersSet.averagePoints.value"
      v-model:seenAverageFirstNineDartsSet="
        seenParametersSet.averageFirstNineDarts.value
      "
      v-model:seenAveragePointsWinLegsSet="
        seenParametersSet.averagePointsWinLegs.value
      "
      v-model:seenAveragePointsLoseLegsSet="
        seenParametersSet.averagePointsLoseLegs.value
      "
      v-model:seenP180Set="seenParametersSet.p180.value"
      v-model:seenP171Set="seenParametersSet.p171.value"
      v-model:seenP131Set="seenParametersSet.p131.value"
      v-model:seenP96Set="seenParametersSet.p96.value"
      v-model:seenPercentDoubleSet="seenParametersSet.percentDouble.value"
      v-model:seenHighestCheckoutSet="seenParametersSet.highestCheckout.value"
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
    min-width: 200px;
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
