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
      <AuthState
        backgroundColor="rgb(182, 195, 197)"
        :player="props.player"
        :class="{
          'player-statistic__auth-state_top-left': props.player === 'P1',
          'player-statistic__auth-state_top-right': props.player === 'P2'
        }"
      />
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
          :class="{
            'statistic__setup-visibility_P1': props.player === 'P1',
            'statistic__setup-visibility_P2': props.player === 'P2'
          }"
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
  top: calc(var(--base) * 0.08 + var(--base) * 0.96);
  //96 - высота хедера + 24 если значок переносится
  margin-top: calc(var(--base) * 0.08);
}

.statistic {
  &__player-statistic {
    display: flex;
    flex-direction: column;
    min-height: calc(var(--base) * 2);
    max-height: 80vh;
    min-width: calc(var(--base) * 2);
    margin-left: calc(var(--base) * 0.04);
    margin-right: calc(var(--base) * 0.04);
    padding: calc(var(--base) * 0.16);
    padding-top: 0px;
    border-radius: calc(var(--base) * 0.16);
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
    top: calc(var(--base) * 0.04);
    z-index: 2;
    margin-top: calc(var(--base) * -0.2);
    cursor: pointer;
    border: calc(var(--base) * 0.01) solid transparent;
    border-radius: calc(var(--base) * 0.04);

    &:focus-visible {
      outline: calc(var(--base) * 0.01) solid black;
    }

    &:active {
      box-shadow: calc(var(--base) * 0.05) 5px calc(var(--base) * 0.05) gray;
    }

    &_P1 {
      align-self: flex-end;
      margin-right: calc(var(--base) * -0.12);
    }

    &_P2 {
      margin-left: calc(var(--base) * -0.12);
      align-self: flex-start;
    }
  }

  &__icon {
    width: calc(var(--base) * 0.24);
    height: calc(var(--base) * 0.24);
    display: block;
  }

  &__average,
  &__points,
  &__closing {
    display: flex;
    flex-direction: column;
  }

  &__group-header {
    margin-top: calc(var(--base) * 0.24);
    font-size: calc(var(--base) * 0.28);
    font-weight: 700;
    color: white;
    text-align: center;
  }

  &__group-header_margin-bottom {
    margin-bottom: calc(var(--base) * 0.08);
  }

  &__parameter-header {
    width: 100%;
    margin-top: calc(var(--base) * 0.16);
    font-size: calc(var(--base) * 0.24);
    color: white;
    text-align: center;
  }

  &__values {
    font-size: calc(var(--base) * 0.24);
    text-align: center;
    margin-left: calc(var(--base) * 0.04);
    margin-right: calc(var(--base) * 0.04);
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

@media (max-width: 1570px) {
  .player-statistic__auth-state_top-left {
    top: calc(var(--base) * -0.32);
    left: calc(var(--base) * 0.34);
  }

  .player-statistic__auth-state_top-right {
    top: calc(var(--base) * -0.32);
    right: calc(var(--base) * 0.34);
  }
  .player-statistic-wrapper {
    top: calc(var(--base) * 0.08 + var(--base) * 0.96 + var(--base) * 0.24);
    //96 - высота хедера + 24 если значок переносится
  }
}

@media (max-width: 1370px) {
  .points-information__statistic {
    margin-top: calc(var(--base) * 0.64);
  }
}
</style>
