<script setup>
import ParameterVisibilitySetting from './parameterVisibilitySetting.vue';

const props = defineProps({
  seenStatisticsVisisbilitySetting: Boolean,
  areSetsInGame: Boolean,
  isPercentDoubleInStatInStat: Boolean,
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

const changeParameterVisibility = (event) => {
  if (event.target.type === 'checkbox')
    emits(
      'update:parameterVisibility',
      event.target.dataset.groupName,
      event.target.dataset.parameterName,
      !event.target.checked
    );
};

const updateParameterVisibility = (elem) => {
  if (elem.groupName === 'leg') {
    emits('update:seenAveragePointsLeg', elem.checked);
    return;
  }
  emits(
    'update:parameterVisibility',
    elem.dataset.groupName,
    elem.dataset.parameterName,
    elem.checked
  );
};
</script>

<template>
  <div
    class="statistic__player-statistic statistic__visibility"
    v-show="seenStatisticsVisisbilitySetting"
    @keyup.enter="changeParameterVisibility"
    @keyup.esc="$emit('closeStatisticsVisibilitySettings')"
  >
    <div class="control-seen-elements">
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
      @click="$emit('closeStatisticsVisibilitySettings')"
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
          @update:parameterVisibility="updateParameterVisibility"
          data-group-name="game"
          data-parameter-name="averagePoints"
          :areSetsInGame="props.areSetsInGame"
          :seenParametersHeader="true"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="props.seenParametersSet.averagePoints.value"
          @update:parameterVisibility="updateParameterVisibility"
          data-group-name="set"
          data-parameter-name="averagePoints"
          v-if="props.areSetsInGame"
          :seenParametersHeader="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="лег"
          :parameterVisibility="seenAveragePointsLeg"
          @update:parameterVisibility="updateParameterVisibility"
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
          @update:parameterVisibility="updateParameterVisibility"
          data-group-name="game"
          data-parameter-name="averageFirstNineDarts"
          :seenParametersHeader="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="
            props.seenParametersSet.averageFirstNineDarts.value
          "
          @update:parameterVisibility="updateParameterVisibility"
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
          @update:parameterVisibility="updateParameterVisibility"
          data-group-name="game"
          data-parameter-name="averagePointsWinLegs"
          :seenParametersHeader="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="
            props.seenParametersSet.averagePointsWinLegs.value
          "
          @update:parameterVisibility="updateParameterVisibility"
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
          @update:parameterVisibility="updateParameterVisibility"
          data-group-name="game"
          data-parameter-name="averagePointsLoseLegs"
          :seenParametersHeader="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="
            props.seenParametersSet.averagePointsLoseLegs.value
          "
          @update:parameterVisibility="updateParameterVisibility"
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
          @update:parameterVisibility="updateParameterVisibility"
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
          @update:parameterVisibility="updateParameterVisibility"
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
          @update:parameterVisibility="updateParameterVisibility"
          data-group-name="game"
          data-parameter-name="percentDouble"
          :seenParametersHeader="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="props.seenParametersSet.percentDouble.value"
          @update:parameterVisibility="updateParameterVisibility"
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
          @update:parameterVisibility="updateParameterVisibility"
          data-group-name="game"
          data-parameter-name="highestCheckout"
          :seenParametersHeader="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="props.seenParametersSet.highestCheckout.value"
          @update:parameterVisibility="updateParameterVisibility"
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
  left: 4px;
  top: 4px;
  display: flex;

  &__select-all {
    display: block;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    outline: none;
    cursor: pointer;

    &:focus {
      border: 1px solid black;
    }
  }

  &__icon {
    display: block;
    width: 24px;
    height: 24px;
  }
}
</style>
