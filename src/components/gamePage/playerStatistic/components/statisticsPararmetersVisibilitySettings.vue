<script setup>
import ParameterVisibilitySetting from './parameterVisibilitySetting.vue';

const props = defineProps({
  seenSetupVisisbility: Boolean,
  areSetsInGame: Boolean,
  isPercentDouble: Boolean,
  seenAveragePointsLeg: Boolean,
  seenParametersGame: Object,
  seenParametersSet: Object
});
const emits = defineEmits([
  'closeStatisticsPararmetersVisibilitySettings',
  'selectAll',
  'removeSelection',
  'update:seenAveragePointsLeg',
  'update:parameterVisibility'
]);

const handleKeyup = (event) => {
  if (event.target.type === 'checkbox')
    emits(
      'update:parameterVisibility',
      event.target.dataset.groupName,
      event.target.dataset.parameterName,
      !event.target.checked
    );
};
</script>

<template>
  <div
    class="statistic__player-statistic statistic__visibility"
    v-show="seenSetupVisisbility"
    @keyup.enter="handleKeyup"
    @keyup.esc="$emit('closeStatisticsPararmetersVisibilitySettings')"
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
      @click="$emit('closeStatisticsPararmetersVisibilitySettings')"
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
          @update:parameterVisibility="
            (checked) =>
              $emit(
                'update:parameterVisibility',
                'game',
                'averagePoints',
                checked
              )
          "
          data-group-name="game"
          data-parameter-name="averagePoints"
          :areSetsInGame="true"
        /><!--плохой вариант с true-->
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="props.seenParametersSet.averagePoints.value"
          @update:parameterVisibility="
            (checked) =>
              $emit(
                'update:parameterVisibility',
                'set',
                'averagePoints',
                checked
              )
          "
          data-group-name="set"
          data-parameter-name="averagePoints"
          v-if="props.areSetsInGame"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="лег"
          :parameterVisibility="seenAveragePointsLeg"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAveragePointsLeg', checked)
          "
          data-group-name="leg"
          data-parameter-name="averagePoints"
          :areSetsInGame="props.areSetsInGame"
        />
      </div>
      <div class="statistic-average__nine-darts">
        <h5 class="statistic__parameter-header">9 дротиков</h5>
        <ParameterVisibilitySetting
          parameterGroup="матч"
          :parameterVisibility="
            props.seenParametersGame.averageFirstNineDarts.value
          "
          @update:parameterVisibility="
            (checked) =>
              $emit(
                'update:parameterVisibility',
                'game',
                'averageFirstNineDarts',
                checked
              )
          "
          data-group-name="game"
          data-parameter-name="averageFirstNineDarts"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="
            props.seenParametersSet.averageFirstNineDarts.value
          "
          @update:parameterVisibility="
            (checked) =>
              $emit(
                'update:parameterVisibility',
                'set',
                'averageFirstNineDarts',
                checked
              )
          "
          data-group-name="set"
          data-parameter-name="averageFirstNineDarts"
          v-if="props.areSetsInGame"
          :areSetsInGame="props.areSetsInGame"
        />
      </div>
      <div class="statistic-average__win-legs">
        <h5 class="statistic__parameter-header">выигранные леги</h5>
        <ParameterVisibilitySetting
          parameterGroup="матч"
          :parameterVisibility="
            props.seenParametersGame.averagePointsWinLegs.value
          "
          @update:parameterVisibility="
            (checked) =>
              $emit(
                'update:parameterVisibility',
                'game',
                'averagePointsWinLegs',
                checked
              )
          "
          data-group-name="game"
          data-parameter-name="averagePointsWinLegs"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="
            props.seenParametersSet.averagePointsWinLegs.value
          "
          @update:parameterVisibility="
            (checked) =>
              $emit(
                'update:parameterVisibility',
                'set',
                'averagePointsWinLegs',
                checked
              )
          "
          data-group-name="set"
          data-parameter-name="averagePointsWinLegs"
          v-if="props.areSetsInGame"
          :areSetsInGame="props.areSetsInGame"
        />
      </div>
      <div class="statistic-average__lose-legs">
        <h5 class="statistic__parameter-header">проигранные леги</h5>
        <ParameterVisibilitySetting
          parameterGroup="матч"
          :parameterVisibility="
            props.seenParametersGame.averagePointsLoseLegs.value
          "
          @update:parameterVisibility="
            (checked) =>
              $emit(
                'update:parameterVisibility',
                'game',
                'averagePointsLoseLegs',
                checked
              )
          "
          data-group-name="game"
          data-parameter-name="averagePointsLoseLegs"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="
            props.seenParametersSet.averagePointsLoseLegs.value
          "
          @update:parameterVisibility="
            (checked) =>
              $emit(
                'update:parameterVisibility',
                'set',
                'averagePointsLoseLegs',
                checked
              )
          "
          data-group-name="set"
          data-parameter-name="averagePointsLoseLegs"
          v-if="props.areSetsInGame"
          :areSetsInGame="props.areSetsInGame"
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
          parameterGroup="180"
          :parameterVisibility="props.seenParametersGame.p180.value"
          @update:parameterVisibility="
            (checked) =>
              $emit('update:parameterVisibility', 'game', 'p180', checked)
          "
          data-group-name="game"
          data-parameter-name="p180"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="171+"
          :parameterVisibility="props.seenParametersGame.p171.value"
          @update:parameterVisibility="
            (checked) =>
              $emit('update:parameterVisibility', 'game', 'p171', checked)
          "
          data-group-name="game"
          data-parameter-name="p171"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="131+"
          :parameterVisibility="props.seenParametersGame.p131.value"
          @update:parameterVisibility="
            (checked) =>
              $emit('update:parameterVisibility', 'game', 'p131', checked)
          "
          data-group-name="game"
          data-parameter-name="p131"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="96+"
          :parameterVisibility="props.seenParametersGame.p96.value"
          @update:parameterVisibility="
            (checked) =>
              $emit('update:parameterVisibility', 'game', 'p96', checked)
          "
          data-group-name="game"
          data-parameter-name="p96"
          :areSetsInGame="props.areSetsInGame"
        />
      </div>
      <div class="statistic-points__set-points" v-if="props.areSetsInGame">
        <h5 class="statistic__parameter-header">сет</h5>
        <ParameterVisibilitySetting
          parameterGroup="180"
          :parameterVisibility="props.seenParametersSet.p180.value"
          @update:parameterVisibility="
            (checked) =>
              $emit('update:parameterVisibility', 'set', 'p180', checked)
          "
          data-group-name="set"
          data-parameter-name="p180"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="171+"
          :parameterVisibility="props.seenParametersSet.p171.value"
          @update:parameterVisibility="
            (checked) =>
              $emit('update:parameterVisibility', 'set', 'p171', checked)
          "
          data-group-name="set"
          data-parameter-name="p171"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="131+"
          :parameterVisibility="props.seenParametersSet.p131.value"
          @update:parameterVisibility="
            (checked) =>
              $emit('update:parameterVisibility', 'set', 'p131', checked)
          "
          data-group-name="set"
          data-parameter-name="p131"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="96+"
          :parameterVisibility="props.seenParametersSet.p96.value"
          @update:parameterVisibility="
            (checked) =>
              $emit('update:parameterVisibility', 'set', 'p96', checked)
          "
          data-group-name="set"
          data-parameter-name="p96"
          :areSetsInGame="props.areSetsInGame"
        />
      </div>
    </div>
    <div class="statistic__closing statistic-closing">
      <h4 class="statistic__group-header">Закрытия</h4>
      <div class="statistic-closing__double" v-if="props.isPercentDouble">
        <h5 class="statistic__parameter-header">% удвоений</h5>
        <ParameterVisibilitySetting
          parameterGroup="матч"
          :parameterVisibility="props.seenParametersGame.percentDouble.value"
          @update:parameterVisibility="
            (checked) =>
              $emit(
                'update:parameterVisibility',
                'game',
                'percentDouble',
                checked
              )
          "
          data-group-name="game"
          data-parameter-name="percentDouble"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="props.seenParametersSet.percentDouble.value"
          @update:parameterVisibility="
            (checked) =>
              $emit(
                'update:parameterVisibility',
                'set',
                'percentDouble',
                checked
              )
          "
          data-group-name="set"
          data-parameter-name="percentDouble"
          v-if="props.areSetsInGame"
          :areSetsInGame="props.areSetsInGame"
        />
      </div>
      <div class="statistic-closing__highest">
        <h5 class="statistic__parameter-header">наибольшее</h5>
        <ParameterVisibilitySetting
          parameterGroup="матч"
          :parameterVisibility="props.seenParametersGame.highestCheckout.value"
          @update:parameterVisibility="
            (checked) =>
              $emit(
                'update:parameterVisibility',
                'game',
                'highestCheckout',
                checked
              )
          "
          data-group-name="game"
          data-parameter-name="highestCheckout"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterGroup="сет"
          :parameterVisibility="props.seenParametersSet.highestCheckout.value"
          @update:parameterVisibility="
            (checked) =>
              $emit(
                'update:parameterVisibility',
                'set',
                'highestCheckout',
                checked
              )
          "
          data-group-name="set"
          data-parameter-name="highestCheckout"
          v-if="props.areSetsInGame"
          :areSetsInGame="props.areSetsInGame"
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
