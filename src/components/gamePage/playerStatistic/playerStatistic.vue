<script setup>
import { ref, defineAsyncComponent } from 'vue';
import { SeenParameters, SeenGroups } from './seenClases.js';
import StatisticsVisibilitySettings from './components/statisticsVisibilitySettings.vue';
import LoadingAuth from '@/components/auth/components/loadingAuth.vue';
import AuthState from '@/components/auth/authState.vue';
import AuthActions from '@/components/auth/authActions/authActions.vue';

const AuthComp = defineAsyncComponent({
  loader: () => import('@/components/auth/authComp.vue'),
  loadingComponent: LoadingAuth,
  delay: 0
});
const StatisticAverage = defineAsyncComponent({
  loader: () => import('./components/statisticAverage.vue')
});
const StatisticPoints = defineAsyncComponent({
  loader: () => import('./components/statisticPoints.vue')
});
const StatisticClosing = defineAsyncComponent({
  loader: () => import('./components/statisticClosing.vue')
});

const props = defineProps({
  player: String,
  gameStatistic: Object,
  setStatistic: Object,
  averagePointsLeg: Number,
  areSetsInGame: Boolean,
  isPercentDoubleInStat: Boolean
});

let positionSetupVisibility = {
  'margin-right': '-12px',
  'align-self': 'flex-end'
};
if (props.player === 'P2')
  positionSetupVisibility = {
    'margin-left': '-12px',
    'align-self': 'flex-start'
  };

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
    <div class="player-statistic-wrapper">
      <AuthState backgroundColor="rgb(182, 195, 197)" :player="props.player" />
      <div
        class="statistic__player-statistic"
        v-show="!seenStatisticsVisisbilitySetting && !seenAuthComp"
      >
        <AuthActions
          :player="player"
          :isSingle="true"
          @openAuthComp="seenAuthComp = true"
        />
        <button
          class="statistic__setup-visibility"
          :style="positionSetupVisibility"
          @click="seenStatisticsVisisbilitySetting = true"
          title="Настроить видимость параметров"
        >
          <img
            class="statistic__icon"
            src="/src/assets/images/menu.svg"
            alt="меню"
          />
        </button>
        <StatisticAverage
          v-if="seenGroups.averagePoints.value"
          :seenGroups="seenGroups"
          :seenParametersGame="seenParametersGame"
          :seenParametersSet="seenParametersSet"
          :seenAveragePointsLeg="seenAveragePointsLeg"
          :gameStatistic="props.gameStatistic"
          :setStatistic="props.setStatistic"
          :averagePointsLeg="props.averagePointsLeg"
          :areSetsInGame="props.areSetsInGame"
        />
        <StatisticPoints
          v-if="seenGroups.points.value"
          :seenParametersGame="seenParametersGame"
          :seenParametersSet="seenParametersSet"
          :gameStatistic="props.gameStatistic"
          :setStatistic="props.setStatistic"
          :areSetsInGame="props.areSetsInGame"
        />
        <StatisticClosing
          v-if="seenGroups.closing.value"
          :seenGroups="seenGroups"
          :seenParametersGame="seenParametersGame"
          :seenParametersSet="seenParametersSet"
          :gameStatistic="props.gameStatistic"
          :setStatistic="props.setStatistic"
          :areSetsInGame="props.areSetsInGame"
          :isPercentDoubleInStat="props.isPercentDoubleInStat"
        />
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
      <AuthComp
        v-if="seenAuthComp"
        @closeAuthComp="seenAuthComp = false"
        :player="props.player"
      />
    </div>
    <!--обертка нужна так как блок имеет overflow и элементы с fixed и прочим скрываются-->
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

.player-statistic-wrapper {
  position: sticky;
  top: 8px;
  margin-top: 8px;
}

.statistic {
  &__player-statistic {
    display: flex;
    flex-direction: column;
    min-height: 200px;
    max-height: 80vh;
    min-width: 200px;
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
    top: 4px;
    z-index: 2;
    margin-top: -20px;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 4px;

    &:focus {
      outline: 1px solid black;
    }
  }

  &__icon {
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
