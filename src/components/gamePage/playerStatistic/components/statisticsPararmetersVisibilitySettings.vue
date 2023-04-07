<script setup>
import ParameterVisibilitySetting from './parameterVisibilitySetting.vue';

const props = defineProps({
  seenSetupVisisbility: Boolean,
  areSetsInGame: Boolean,
  isPercentDouble: Boolean,

  seenAveragePointsLeg: Boolean,

  seenAveragePointsGame: Boolean,
  seenAverageFirstNineDartsGame: Boolean,
  seenAveragePointsWinLegsGame: Boolean,
  seenAveragePointsLoseLegsGame: Boolean,
  seenP180Game: Boolean,
  seenP171Game: Boolean,
  seenP131Game: Boolean,
  seenP96Game: Boolean,
  seenPercentDoubleGame: Boolean,
  seenHighestCheckoutGame: Boolean,
  
  seenAveragePointsSet: Boolean,
  seenAverageFirstNineDartsSet: Boolean,
  seenAveragePointsWinLegsSet: Boolean,
  seenAveragePointsLoseLegsSet: Boolean,
  seenP180Set: Boolean,
  seenP171Set: Boolean,
  seenP131Set: Boolean,
  seenP96Set: Boolean,
  seenPercentDoubleSet: Boolean,
  seenHighestCheckoutSet: Boolean
});
const emits = defineEmits([
  'closeStatisticVisibility',
  'update:seenAveragePointsGame',
  'update:seenAveragePointsSet',
  'update:seenAveragePointsLeg',
  'update:seenAverageFirstNineDartsGame',
  'update:seenAverageFirstNineDartsSet',
  'update:seenAveragePointsWinLegsGame',
  'update:seenAveragePointsWinLegsSet',
  'update:seenAveragePointsLoseLegsGame',
  'update:seenAveragePointsLoseLegsSet',
  'update:seenP180Game',
  'update:seenP171Game',
  'update:seenP131Game',
  'update:seenP96Game',
  'update:seenP180Set',
  'update:seenP171Set',
  'update:seenP131Set',
  'update:seenP96Set',
  'update:seenPercentDoubleGame',
  'update:seenPercentDoubleSet',
  'update:seenHighestCheckoutGame',
  'update:seenHighestCheckoutSet',
  'selectAll',
  'removeSelection'
]);

const handleKeyup = (event) => {
  if (event.target.type === 'checkbox')
    emits(
      `update:${event.target.dataset.parameterName}`,
      !event.target.checked
    );
};
</script>

<template>
  <div
    class="statistic__player-statistic statistic__visibility"
    v-show="seenSetupVisisbility"
    @keyup.enter="handleKeyup"
    @keyup.esc="$emit('closeStatisticVisibility')"
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
      @click="$emit('closeStatisticVisibility')"
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
          parameterName="матч"
          :parameterVisibility="seenAveragePointsGame"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAveragePointsGame', checked)
          "
          data-parameter-name="seenAveragePointsGame"
          :areSetsInGame="true"
        /><!--плохой вариант с true-->
        <ParameterVisibilitySetting
          parameterName="сет"
          :parameterVisibility="seenAveragePointsSet"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAveragePointsSet', checked)
          "
          data-parameter-name="seenAveragePointsSet"
          v-if="props.areSetsInGame"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterName="лег"
          :parameterVisibility="seenAveragePointsLeg"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAveragePointsLeg', checked)
          "
          data-parameter-name="seenAveragePointsLeg"
          :areSetsInGame="props.areSetsInGame"
        />
      </div>
      <div class="statistic-average__nine-darts">
        <h5 class="statistic__parameter-header">9 дротиков</h5>
        <ParameterVisibilitySetting
          parameterName="матч"
          :parameterVisibility="seenAverageFirstNineDartsGame"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAverageFirstNineDartsGame', checked)
          "
          data-parameter-name="seenAverageFirstNineDartsGame"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterName="сет"
          :parameterVisibility="seenAverageFirstNineDartsSet"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAverageFirstNineDartsSet', checked)
          "
          data-parameter-name="seenAverageFirstNineDartsSet"
          v-if="props.areSetsInGame"
          :areSetsInGame="props.areSetsInGame"
        />
      </div>
      <div class="statistic-average__win-legs">
        <h5 class="statistic__parameter-header">выигранные леги</h5>
        <ParameterVisibilitySetting
          parameterName="матч"
          :parameterVisibility="seenAveragePointsWinLegsGame"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAveragePointsWinLegsGame', checked)
          "
          data-parameter-name="seenAveragePointsWinLegsGame"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterName="сет"
          :parameterVisibility="seenAveragePointsWinLegsSet"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAveragePointsWinLegsSet', checked)
          "
          data-parameter-name="seenAveragePointsWinLegsSet"
          v-if="props.areSetsInGame"
          :areSetsInGame="props.areSetsInGame"
        />
      </div>
      <div class="statistic-average__lose-legs">
        <h5 class="statistic__parameter-header">проигранные леги</h5>
        <ParameterVisibilitySetting
          parameterName="матч"
          :parameterVisibility="seenAveragePointsLoseLegsGame"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAveragePointsLoseLegsGame', checked)
          "
          data-parameter-name="seenAveragePointsLoseLegsGame"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterName="сет"
          :parameterVisibility="seenAveragePointsLoseLegsSet"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAveragePointsLoseLegsSet', checked)
          "
          data-parameter-name="seenAveragePointsLoseLegsSet"
          v-if="props.areSetsInGame"
          :areSetsInGame="props.areSetsInGame"
        />
      </div>
    </div>
    <div class="statistic__points statistic-points">
      <h4 class="statistic__group-header">Очки</h4>
      <div class="statistic-points__game-points">
        <h5 class="statistic__parameter-header" v-if="props.areSetsInGame">матч</h5>
        <ParameterVisibilitySetting
          parameterName="180"
          :parameterVisibility="seenP180Game"
          @update:parameterVisibility="
            (checked) => $emit('update:seenP180Game', checked)
          "
          data-parameter-name="seenP180Game"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterName="171+"
          :parameterVisibility="seenP171Game"
          @update:parameterVisibility="
            (checked) => $emit('update:seenP171Game', checked)
          "
          data-parameter-name="seenP171Game"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterName="131+"
          :parameterVisibility="seenP131Game"
          @update:parameterVisibility="
            (checked) => $emit('update:seenP131Game', checked)
          "
          data-parameter-name="seenP131Game"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterName="96+"
          :parameterVisibility="seenP96Game"
          @update:parameterVisibility="
            (checked) => $emit('update:seenP96Game', checked)
          "
          data-parameter-name="seenP96Game"
          :areSetsInGame="props.areSetsInGame"
        />
      </div>
      <div class="statistic-points__set-points" v-if="props.areSetsInGame">
        <h5 class="statistic__parameter-header">сет</h5>
        <ParameterVisibilitySetting
          parameterName="180"
          :parameterVisibility="seenP180Set"
          @update:parameterVisibility="
            (checked) => $emit('update:seenP180Set', checked)
          "
          data-parameter-name="seenP180Set"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterName="171+"
          :parameterVisibility="seenP171Set"
          @update:parameterVisibility="
            (checked) => $emit('update:seenP171Set', checked)
          "
          data-parameter-name="seenP171Set"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterName="131+"
          :parameterVisibility="seenP131Set"
          @update:parameterVisibility="
            (checked) => $emit('update:seenP131Set', checked)
          "
          data-parameter-name="seenP131Set"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterName="96+"
          :parameterVisibility="seenP96Set"
          @update:parameterVisibility="
            (checked) => $emit('update:seenP96Set', checked)
          "
          data-parameter-name="seenP96Set"
          :areSetsInGame="props.areSetsInGame"
        />
      </div>
    </div>
    <div class="statistic__closing statistic-closing">
      <h4 class="statistic__group-header">Закрытия</h4>
      <div class="statistic-closing__double" v-if="props.isPercentDouble">
        <h5 class="statistic__parameter-header">% удвоений</h5>
        <ParameterVisibilitySetting
          parameterName="матч"
          :parameterVisibility="seenPercentDoubleGame"
          @update:parameterVisibility="
            (checked) => $emit('update:seenPercentDoubleGame', checked)
          "
          data-parameter-name="seenPercentDoubleGame"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterName="сет"
          :parameterVisibility="seenPercentDoubleSet"
          @update:parameterVisibility="
            (checked) => $emit('update:seenPercentDoubleSet', checked)
          "
          data-parameter-name="seenPercentDoubleSet"
          v-if="props.areSetsInGame"
          :areSetsInGame="props.areSetsInGame"
        />
      </div>
      <div class="statistic-closing__highest">
        <h5 class="statistic__parameter-header">наибольшее</h5>
        <ParameterVisibilitySetting
          parameterName="матч"
          :parameterVisibility="seenHighestCheckoutGame"
          @update:parameterVisibility="
            (checked) => $emit('update:seenHighestCheckoutGame', checked)
          "
          data-parameter-name="seenHighestCheckoutGame"
          :areSetsInGame="props.areSetsInGame"
        />
        <ParameterVisibilitySetting
          parameterName="сет"
          :parameterVisibility="seenHighestCheckoutSet"
          @update:parameterVisibility="
            (checked) => $emit('update:seenHighestCheckoutSet', checked)
          "
          data-parameter-name="seenHighestCheckoutSet"
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
