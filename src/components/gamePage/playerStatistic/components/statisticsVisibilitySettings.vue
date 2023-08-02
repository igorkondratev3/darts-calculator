<script setup>
import ParameterVisibilitySetting from './parameterVisibilitySetting.vue';
import {
  changeParameterVisibility,
  updateParameterVisibility,
  closeStatisticsVisibilitySettings
} from './parameterVisibility.js';


const props = defineProps({
  player: String,
  seenStatisticsVisisbilitySetting: Boolean,
  areSetsInGame: Boolean,
  isPercentDoubleInStat: Boolean,
  seenAveragePointsLeg: Boolean,
  seenParametersGame: Object,
  seenParametersSet: Object
});
const emits = defineEmits([
  'closeStatisticsVisibilitySettings',
  'selectAll',
  'removeSelection',
  'update:seenAveragePointsLeg',
  'update:parameterVisibility'
]);

const updateParameterVisibilityWrapper = (elem) =>
  updateParameterVisibility(elem, emits);
</script>

<template>
  <div
    class="statistic__player-statistic statistic__visibility"
    v-show="seenStatisticsVisisbilitySetting"
    @keyup.enter="changeParameterVisibility($event, $emit)"
    @keyup.esc="
      closeStatisticsVisibilitySettings(
        player,
        seenParametersGame.unRef(),
        seenParametersSet.unRef(),
        seenAveragePointsLeg,
        $emit
      )
    "
  >
    <div
      class="control-seen-elements"
      :class="{
        'control-seen-elements_P1': props.player === 'P1',
        'control-seen-elements_P2': props.player === 'P2'
      }"
    >
      <button
        class="control-seen-elements__select-all"
        title="Выделить все"
        @click="$emit('selectAll')"
      >
        <img
          class="control-seen-elements__icon"
          src="/src/assets/images/done.svg"
          alt="выделить"
        />
      </button>
      <button
        class="control-seen-elements__select-all"
        title="Снять выделение"
        @click="$emit('removeSelection')"
      >
        <img
          class="control-seen-elements__icon"
          src="/src/assets/images/remove_done.svg"
          alt="снять"
        />
      </button>
    </div>
    <button
      class="statistic__setup-visibility"
      :class="{
        'statistic__setup-visibility_P1': props.player === 'P1',
        'statistic__setup-visibility_P2': props.player === 'P2'
      }"
      @click="closeStatisticsVisibilitySettings(
        player,
        seenParametersGame.unRef(),
        seenParametersSet.unRef(),
        seenAveragePointsLeg,
        $emit
      )"
      title="Закрыть настройку видимости параметров"
    >
      <img
        class="statistic__icon"
        src="/src/assets/images/close.svg"
        alt="закрыть"
      />
    </button>

    <div class="statistic__average statistic-average">
      <h4 class="statistic__group-header statistic__group-header_margin-bottom">
        Средний набор
      </h4>
      <div class="statistic-average__points">
        <ParameterVisibilitySetting
          parameterGroup="матч"
          :parameterVisibility="props.seenParametersGame.averagePoints.value"
          @update:parameterVisibility="updateParameterVisibilityWrapper"
          data-group-name="game"
          data-parameter-name="averagePoints"
          :areSetsInGame="props.areSetsInGame"
          :seenParametersHeader="true"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="props.seenParametersSet.averagePoints.value"
          @update:parameterVisibility="updateParameterVisibilityWrapper"
          data-group-name="set"
          data-parameter-name="averagePoints"
          v-if="props.areSetsInGame"
          :seenParametersHeader="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="лег"
          :parameterVisibility="seenAveragePointsLeg"
          @update:parameterVisibility="updateParameterVisibilityWrapper"
          data-group-name="leg"
          data-parameter-name="averagePoints"
          :seenParametersHeader="true"
        />
      </div>
      <div class="statistic-average__nine-darts">
        <h5 class="statistic__parameter-header">9 дротиков</h5>
        <ParameterVisibilitySetting
          parameterGroup="матч"
          :parameterVisibility="
            props.seenParametersGame.averageFirstNineDarts.value
          "
          @update:parameterVisibility="updateParameterVisibilityWrapper"
          data-group-name="game"
          data-parameter-name="averageFirstNineDarts"
          :seenParametersHeader="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="
            props.seenParametersSet.averageFirstNineDarts.value
          "
          @update:parameterVisibility="updateParameterVisibilityWrapper"
          data-group-name="set"
          data-parameter-name="averageFirstNineDarts"
          v-if="props.areSetsInGame"
          :seenParametersHeader="props.areSetsInGame"
        />
      </div>
      <div class="statistic-average__win-legs">
        <h5 class="statistic__parameter-header">выигранные леги</h5>
        <ParameterVisibilitySetting
          parameterGroup="матч"
          :parameterVisibility="
            props.seenParametersGame.averagePointsWinLegs.value
          "
          @update:parameterVisibility="updateParameterVisibilityWrapper"
          data-group-name="game"
          data-parameter-name="averagePointsWinLegs"
          :seenParametersHeader="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="
            props.seenParametersSet.averagePointsWinLegs.value
          "
          @update:parameterVisibility="updateParameterVisibilityWrapper"
          data-group-name="set"
          data-parameter-name="averagePointsWinLegs"
          v-if="props.areSetsInGame"
          :seenParametersHeader="props.areSetsInGame"
        />
      </div>
      <div class="statistic-average__lose-legs">
        <h5 class="statistic__parameter-header">проигранные леги</h5>
        <ParameterVisibilitySetting
          parameterGroup="матч"
          :parameterVisibility="
            props.seenParametersGame.averagePointsLoseLegs.value
          "
          @update:parameterVisibility="updateParameterVisibilityWrapper"
          data-group-name="game"
          data-parameter-name="averagePointsLoseLegs"
          :seenParametersHeader="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="
            props.seenParametersSet.averagePointsLoseLegs.value
          "
          @update:parameterVisibility="updateParameterVisibilityWrapper"
          data-group-name="set"
          data-parameter-name="averagePointsLoseLegs"
          v-if="props.areSetsInGame"
          :seenParametersHeader="props.areSetsInGame"
        />
      </div>
    </div>
    <div class="statistic__points statistic-points">
      <h4 class="statistic__group-header">Очки</h4>
      <div class="statistic-points__game-points">
        <h5 class="statistic__parameter-header" v-if="props.areSetsInGame">
          матч
        </h5>
        <ParameterVisibilitySetting
          v-for="(point, key) in props.seenParametersGame.pointsGroup"
          :key="key + 'game'"
          :parameterGroup="key.slice(1)"
          :parameterVisibility="point.value"
          @update:parameterVisibility="updateParameterVisibilityWrapper"
          data-group-name="game"
          :data-parameter-name="key"
          :seenParametersHeader="true"
        />
      </div>
      <div class="statistic-points__set-points" v-if="props.areSetsInGame">
        <h5 class="statistic__parameter-header">сет</h5>
        <ParameterVisibilitySetting
          v-for="(point, key) in props.seenParametersSet.pointsGroup"
          :key="key + 'set'"
          :parameterGroup="key.slice(1)"
          :parameterVisibility="point.value"
          @update:parameterVisibility="updateParameterVisibilityWrapper"
          data-group-name="set"
          :data-parameter-name="key"
          :seenParametersHeader="props.areSetsInGame"
        />
      </div>
    </div>
    <div class="statistic__closing statistic-closing">
      <h4 class="statistic__group-header">Закрытия</h4>
      <div class="statistic-closing__double" v-if="props.isPercentDoubleInStat">
        <h5 class="statistic__parameter-header">% удвоений</h5>
        <ParameterVisibilitySetting
          parameterGroup="матч"
          :parameterVisibility="props.seenParametersGame.percentDouble.value"
          @update:parameterVisibility="updateParameterVisibilityWrapper"
          data-group-name="game"
          data-parameter-name="percentDouble"
          :seenParametersHeader="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="props.seenParametersSet.percentDouble.value"
          @update:parameterVisibility="updateParameterVisibilityWrapper"
          data-group-name="set"
          data-parameter-name="percentDouble"
          v-if="props.areSetsInGame"
          :seenParametersHeader="props.areSetsInGame"
        />
      </div>
      <div class="statistic-closing__highest">
        <h5 class="statistic__parameter-header">наибольшее</h5>
        <ParameterVisibilitySetting
          parameterGroup="матч"
          :parameterVisibility="props.seenParametersGame.highestCheckout.value"
          @update:parameterVisibility="updateParameterVisibilityWrapper"
          data-group-name="game"
          data-parameter-name="highestCheckout"
          :seenParametersHeader="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="props.seenParametersSet.highestCheckout.value"
          @update:parameterVisibility="updateParameterVisibilityWrapper"
          data-group-name="set"
          data-parameter-name="highestCheckout"
          v-if="props.areSetsInGame"
          :seenParametersHeader="props.areSetsInGame"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.control-seen-elements {
  position: absolute;
  top: calc(var(--base) * 0.04);
  display: flex;

  &_P1 {
    left: calc(var(--base) * 0.04);
  }

  &_P2 {
    right: calc(var(--base) * 0.04);
  }

  &__select-all {
    display: block;
    z-index: 2;
    background-color: transparent;
    border: calc(var(--base) * 0.01) solid transparent;
    border-radius: calc(var(--base) * 0.04);
    outline: none;
    cursor: pointer;

    &:focus-visible {
      outline: calc(var(--base) * 0.01) solid black;
    }

    &:active {
      box-shadow: 0px calc(var(--base) * 0.05) calc(var(--base) * 0.05) gray;
    }
  }

  &__icon {
    width: calc(var(--base) * 0.24);
    height: calc(var(--base) * 0.24);
    display: block;
  }
}
</style>
