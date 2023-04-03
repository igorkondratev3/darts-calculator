<script setup>
import CheckboxVisibility from './checkboxVisibility.vue';

const props = defineProps({
  seenSetupVisisbility: Boolean,
  isSets: Boolean,
  isPercentDouble: Boolean,
  seenAveragePointsGame: Boolean,
  seenAveragePointsSet: Boolean,
  seenAveragePointsLeg: Boolean,
  seenAverageFirstNineDartsGame: Boolean,
  seenAverageFirstNineDartsSet: Boolean,
  seenAveragePointsWinLegsGame: Boolean,
  seenAveragePointsWinLegsSet: Boolean,
  seenAveragePointsLoseLegsGame: Boolean,
  seenAveragePointsLoseLegsSet: Boolean,
  seenP180Game: Boolean,
  seenP171Game: Boolean,
  seenP131Game: Boolean,
  seenP96Game: Boolean,
  seenP180Set: Boolean,
  seenP171Set: Boolean,
  seenP131Set: Boolean,
  seenP96Set: Boolean,
  seenPercentDoubleGame: Boolean,
  seenPercentDoubleSet: Boolean,
  seenHighestCheckoutGame: Boolean,
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
      <img
        class="control-seen-elements__icon"
        src="/src/assets/images/done.svg"
        title="Выделить все"
        @click="$emit('selectAll')"
        alt="выделить"
      />
      <img
        class="control-seen-elements__icon"
        src="/src/assets/images/remove_done.svg"
        title="Снять выделение"
        @click="$emit('removeSelection')"
        alt="снять"
      />
    </div>
    <img
      class="statistic__setup-visibility"
      src="/src/assets/images/close.svg"
      @click="$emit('closeStatisticVisibility')"
      title="Закрыть настройку видимости параметров"
      alt="закрыть"
    />
    <div class="statistic__average statistic-average">
      <h4 class="statistic__group-header statistic__group-header_margin-bottom">
        Средний набор
      </h4>
      <div class="statistic-average__points">
        <CheckboxVisibility
          parameterName="матч"
          :parameterVisibility="seenAveragePointsGame"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAveragePointsGame', checked)
          "
          data-parameter-name="seenAveragePointsGame"
        />
        <CheckboxVisibility
          parameterName="сет"
          :parameterVisibility="seenAveragePointsSet"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAveragePointsSet', checked)
          "
          data-parameter-name="seenAveragePointsSet"
          v-if="props.isSets"
        />
        <CheckboxVisibility
          parameterName="лег"
          :parameterVisibility="seenAveragePointsLeg"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAveragePointsLeg', checked)
          "
          data-parameter-name="seenAveragePointsLeg"
        />
      </div>
      <div class="statistic-average__nine-darts">
        <h5 class="statistic__parameter-header">9 дротиков</h5>
        <CheckboxVisibility
          parameterName="матч"
          :parameterVisibility="seenAverageFirstNineDartsGame"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAverageFirstNineDartsGame', checked)
          "
          data-parameter-name="seenAverageFirstNineDartsGame"
        />
        <CheckboxVisibility
          parameterName="сет"
          :parameterVisibility="seenAverageFirstNineDartsSet"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAverageFirstNineDartsSet', checked)
          "
          data-parameter-name="seenAverageFirstNineDartsSet"
          v-if="props.isSets"
        />
      </div>
      <div class="statistic-average__win-legs">
        <h5 class="statistic__parameter-header">выигранные леги</h5>
        <CheckboxVisibility
          parameterName="матч"
          :parameterVisibility="seenAveragePointsWinLegsGame"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAveragePointsWinLegsGame', checked)
          "
          data-parameter-name="seenAveragePointsWinLegsGame"
        />
        <CheckboxVisibility
          parameterName="сет"
          :parameterVisibility="seenAveragePointsWinLegsSet"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAveragePointsWinLegsSet', checked)
          "
          data-parameter-name="seenAveragePointsWinLegsSet"
          v-if="props.isSets"
        />
      </div>
      <div class="statistic-average__lose-legs">
        <h5 class="statistic__parameter-header">проигранные леги</h5>
        <CheckboxVisibility
          parameterName="матч"
          :parameterVisibility="seenAveragePointsLoseLegsGame"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAveragePointsLoseLegsGame', checked)
          "
          data-parameter-name="seenAveragePointsLoseLegsGame"
        />
        <CheckboxVisibility
          parameterName="сет"
          :parameterVisibility="seenAveragePointsLoseLegsSet"
          @update:parameterVisibility="
            (checked) => $emit('update:seenAveragePointsLoseLegsSet', checked)
          "
          data-parameter-name="seenAveragePointsLoseLegsSet"
          v-if="props.isSets"
        />
      </div>
    </div>
    <div class="statistic__points statistic-points">
      <h4 class="statistic__group-header">Очки</h4>
      <div class="statistic-points__game-points">
        <h5 class="statistic__parameter-header">матч</h5>
        <CheckboxVisibility
          parameterName="180"
          :parameterVisibility="seenP180Game"
          @update:parameterVisibility="
            (checked) => $emit('update:seenP180Game', checked)
          "
          data-parameter-name="seenP180Game"
        />
        <CheckboxVisibility
          parameterName="171+"
          :parameterVisibility="seenP171Game"
          @update:parameterVisibility="
            (checked) => $emit('update:seenP171Game', checked)
          "
          data-parameter-name="seenP171Game"
        />
        <CheckboxVisibility
          parameterName="131+"
          :parameterVisibility="seenP131Game"
          @update:parameterVisibility="
            (checked) => $emit('update:seenP131Game', checked)
          "
          data-parameter-name="seenP131Game"
        />
        <CheckboxVisibility
          parameterName="96+"
          :parameterVisibility="seenP96Game"
          @update:parameterVisibility="
            (checked) => $emit('update:seenP96Game', checked)
          "
          data-parameter-name="seenP96Game"
        />
      </div>
      <div class="statistic-points__set-points" v-if="props.isSets">
        <h5 class="statistic__parameter-header">сет</h5>
        <CheckboxVisibility
          parameterName="180"
          :parameterVisibility="seenP180Set"
          @update:parameterVisibility="
            (checked) => $emit('update:seenP180Set', checked)
          "
          data-parameter-name="seenP180Set"
        />
        <CheckboxVisibility
          parameterName="171+"
          :parameterVisibility="seenP171Set"
          @update:parameterVisibility="
            (checked) => $emit('update:seenP171Set', checked)
          "
          data-parameter-name="seenP171Set"
        />
        <CheckboxVisibility
          parameterName="131+"
          :parameterVisibility="seenP131Set"
          @update:parameterVisibility="
            (checked) => $emit('update:seenP131Set', checked)
          "
          data-parameter-name="seenP131Set"
        />
        <CheckboxVisibility
          parameterName="96+"
          :parameterVisibility="seenP96Set"
          @update:parameterVisibility="
            (checked) => $emit('update:seenP96Set', checked)
          "
          data-parameter-name="seenP96Set"
        />
      </div>
    </div>
    <div class="statistic__closing statistic-closing">
      <h4 class="statistic__group-header">Закрытия</h4>
      <div class="statistic-closing__double" v-if="props.isPercentDouble">
        <h5 class="statistic__parameter-header">% удвоений</h5>
        <CheckboxVisibility
          parameterName="матч"
          :parameterVisibility="seenPercentDoubleGame"
          @update:parameterVisibility="
            (checked) => $emit('update:seenPercentDoubleGame', checked)
          "
          data-parameter-name="seenPercentDoubleGame"
        />
        <CheckboxVisibility
          parameterName="сет"
          :parameterVisibility="seenPercentDoubleSet"
          @update:parameterVisibility="
            (checked) => $emit('update:seenPercentDoubleSet', checked)
          "
          data-parameter-name="seenPercentDoubleSet"
          v-if="props.isSets"
        />
      </div>
      <div class="statistic-closing__highest">
        <h5 class="statistic__parameter-header">наибольшее</h5>
        <CheckboxVisibility
          parameterName="матч"
          :parameterVisibility="seenHighestCheckoutGame"
          @update:parameterVisibility="
            (checked) => $emit('update:seenHighestCheckoutGame', checked)
          "
          data-parameter-name="seenHighestCheckoutGame"
        />
        <CheckboxVisibility
          parameterName="сет"
          :parameterVisibility="seenHighestCheckoutSet"
          @update:parameterVisibility="
            (checked) => $emit('update:seenHighestCheckoutSet', checked)
          "
          data-parameter-name="seenHighestCheckoutSet"
          v-if="props.isSets"
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
  &__icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
</style>
