<script setup>
import StatisticsVisibilitySettings from './components/statisticsVisibilitySettings.vue';
import { SeenParameters, SeenGroups } from './seenClases.js';
import AuthLink from '@/components/auth/authLink.vue';
import LoadingComponent from '@/components/loadingComponent.vue';
import { ref, defineAsyncComponent } from 'vue';
const props = defineProps({
  player: String,
  gameStatistic: Object,
  setStatistic: Object,
  averagePointsLeg: Number,
  areSetsInGame: Boolean,
  isPercentDoubleInStat: Boolean
});

const AuthComp = defineAsyncComponent({
  loader: () => import('@/components/auth/authComp.vue'),
  loadingComponent: LoadingComponent,
  delay: 0
});

const seenAuthComp = ref(false);

const seenStatisticsVisisbilitySetting = ref(false);
const seenAveragePointsLeg = ref(
  Boolean(
    JSON.parse(localStorage.getItem(`seenAveragePointsLeg${props.player}`)) ??
      true
  )
);
const seenParametersGame = new SeenParameters(
  true,
  props.isPercentDoubleInStat,
  JSON.parse(localStorage.getItem(`seenParametersGame${props.player}`))
);
const seenParametersSet = props.areSetsInGame
  ? new SeenParameters(
      true,
      props.isPercentDoubleInStat,
      JSON.parse(localStorage.getItem(`seenParametersSet${props.player}`))
    )
  : new SeenParameters(
      false,
      props.isPercentDoubleInStat,
      JSON.parse(localStorage.getItem(`seenParametersSet${props.player}`))
    );

const seenGroups = new SeenGroups(
  seenParametersGame,
  seenParametersSet,
  seenAveragePointsLeg
);

const selectAll = () => {
  seenParametersGame.selectAll();
  if (props.areSetsInGame) seenParametersSet.selectAll();
  seenAveragePointsLeg.value = true;
};

const removeSelection = () => {
  seenParametersGame.removeSelection();
  if (props.areSetsInGame) seenParametersSet.removeSelection();
  seenAveragePointsLeg.value = false;
};

const changeParameterSeen = (groupName, parameterName, value) => {
  if (groupName === 'game') seenParametersGame[parameterName].value = value;
  if (groupName === 'set') seenParametersSet[parameterName].value = value;
  if (groupName === 'leg') seenAveragePointsLeg.value = value;
};
</script>

<template>
  <div class="points-information__statistic statistic">
    <div
      class="statistic__player-statistic"
      v-show="!seenStatisticsVisisbilitySetting && !seenAuthComp"
    >
      <AuthLink @openAuthComp="seenAuthComp = true" />
      <button
        class="statistic__setup-visibility"
        @click="seenStatisticsVisisbilitySetting = true"
        title="Настроить видимость параметров"
      >
        <img
          class="statistic__icon"
          src="/src/assets/images/menu.svg"
          alt="меню"
        />
      </button>
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
            <h6 class="statistic__value-header">матч</h6>
            {{ props.gameStatistic.averagePoints.value.toFixed(2) }}
          </div>
          <div
            class="statistic__values"
            v-if="seenParametersSet.averagePoints.value"
          >
            <h6 class="statistic__value-header">сет</h6>
            {{ props.setStatistic.averagePoints.value.toFixed(2) }}
          </div>
          <div class="statistic__values" v-if="seenAveragePointsLeg">
            <h6 class="statistic__value-header">лег</h6>
            {{ props.averagePointsLeg.toFixed(2) }}
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
            <h6 class="statistic__value-header" v-if="props.areSetsInGame">
              матч
            </h6>
            {{ props.gameStatistic.averageFirstNineDarts.value.toFixed(2) }}
          </div>
          <div
            class="statistic__values"
            v-if="seenParametersSet.averageFirstNineDarts.value"
          >
            <h6 class="statistic__value-header">сет</h6>
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
            <h6 class="statistic__value-header" v-if="props.areSetsInGame">
              матч
            </h6>
            {{ props.gameStatistic.averagePointsWinLegs.value.toFixed(2) }}
          </div>
          <div
            class="statistic__values"
            v-if="seenParametersSet.averagePointsWinLegs.value"
          >
            <h6 class="statistic__value-header">сет</h6>
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
            <h6 class="statistic__value-header" v-if="props.areSetsInGame">
              матч
            </h6>
            {{ props.gameStatistic.averagePointsLoseLegs.value.toFixed(2) }}
          </div>
          <div
            class="statistic__values"
            v-if="seenParametersSet.averagePointsLoseLegs.value"
          >
            <h6 class="statistic__value-header">сет</h6>
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
          <h5 class="statistic__parameter-header" v-if="props.areSetsInGame">
            матч
          </h5>
          <template
            v-for="(point, key) in seenParametersGame.pointsGroup"
            :key="key + 'game'"
          >
            <div class="statistic__values" v-if="point.value">
              <h6 class="statistic__value-header">
                {{ key.slice(1) }}{{ key !== 'p180' ? '+' : undefined }}
              </h6>
              {{ props.gameStatistic[key].value }}
            </div>
          </template>
        </div>
        <div
          class="statistic-points__set-points"
          v-if="seenParametersSet.points.value"
        >
          <h5 class="statistic__parameter-header">сет</h5>
          <template
            v-for="(point, key) in seenParametersSet.pointsGroup"
            :key="key + 'set'"
          >
            <div class="statistic__values" v-if="point.value">
              <h6 class="statistic__value-header">
                {{ key.slice(1) }}{{ key !== 'p180' ? '+' : undefined }}
              </h6>
              {{ props.setStatistic[key].value }}
            </div>
          </template>
        </div>
      </div>
      <div
        class="statistic__closing statistic-closing"
        v-if="seenGroups.closing.value"
      >
        <h4 class="statistic__group-header">Закрытия</h4>
        <div
          class="statistic-closing__double"
          v-if="seenGroups.double.value && props.isPercentDoubleInStat"
        >
          <h5 class="statistic__parameter-header">% удвоений</h5>
          <div
            class="statistic__values"
            v-if="seenParametersGame.percentDouble.value"
          >
            <h6 class="statistic__value-header" v-if="props.areSetsInGame">
              матч
            </h6>
            {{ props.gameStatistic.percentDouble.value.toFixed(2) }} %
          </div>
          <div
            class="statistic__values"
            v-if="seenParametersSet.percentDouble.value"
          >
            <h6 class="statistic__value-header">сет</h6>
            {{ props.setStatistic.percentDouble.value.toFixed(2) }} %
          </div>
        </div>
        <div class="statistic-closing__highest" v-if="seenGroups.highest.value">
          <h5 class="statistic__parameter-header">наибольшее</h5>
          <div
            class="statistic__values"
            v-if="seenParametersGame.highestCheckout.value"
          >
            <h6 class="statistic__value-header" v-if="props.areSetsInGame">
              матч
            </h6>
            {{ props.gameStatistic.highestCheckout.value }}
          </div>
          <div
            class="statistic__values"
            v-if="seenParametersSet.highestCheckout.value"
          >
            <h6 class="statistic__value-header">сет</h6>
            {{ props.setStatistic.highestCheckout.value }}
          </div>
        </div>
      </div>
    </div>
    <StatisticsVisibilitySettings
      :player="props.player"
      :seenStatisticsVisisbilitySetting="seenStatisticsVisisbilitySetting"
      :areSetsInGame="props.areSetsInGame"
      :isPercentDoubleInStat="props.isPercentDoubleInStat"
      @closeStatisticsVisibilitySettings="
        seenStatisticsVisisbilitySetting = false
      "
      @selectAll="selectAll"
      @removeSelection="removeSelection"
      :seenParametersGame="seenParametersGame"
      :seenParametersSet="seenParametersSet"
      @update:parameterVisibility="changeParameterSeen"
      v-model:seenAveragePointsLeg="seenAveragePointsLeg"
    />

    <AuthComp v-if="seenAuthComp" @closeAuthComp="seenAuthComp = false" />
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
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 4px;

    &:focus {
      outline: 1px solid black;
    }
  }

  &__icon {
    display: block;
    width: 24px;
    height: 24px;
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

  &__value-header {
    font: inherit;
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
