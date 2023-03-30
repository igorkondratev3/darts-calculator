<script setup>
import CheckboxVisibility from './checkboxVisibility.vue';

defineProps({
  seenSetupVisisbility: Boolean,
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
defineEmits(['closeStatisticVisibility', 
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
</script>

<template>
  <div
    class="statistic__player-statistic statistic__visibility"
    v-show="seenSetupVisisbility"
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
      @click="checked => $emit('closeStatisticVisibility', checked)"
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
          @update:parameterVisibility="checked => $emit('update:seenAveragePointsGame' , checked)"
        />
        <CheckboxVisibility
          parameterName="сет"
          :parameterVisibility="seenAveragePointsSet"
          @update:parameterVisibility="checked => $emit('update:seenAveragePointsSet', checked)"
        />
        <CheckboxVisibility
          parameterName="лег"
          :parameterVisibility="seenAveragePointsLeg"
          @update:parameterVisibility="checked => $emit('update:seenAveragePointsLeg', checked)"
        />
      </div>
      <div class="statistic-average__nine-darts">
        <h5 class="statistic__parameter-header">9 дротиков</h5>
        <CheckboxVisibility
          parameterName="матч"
          :parameterVisibility="seenAverageFirstNineDartsGame"
          @update:parameterVisibility="checked => $emit('update:seenAverageFirstNineDartsGame', checked)"
        />
        <CheckboxVisibility
          parameterName="сет"
          :parameterVisibility="seenAverageFirstNineDartsSet"
          @update:parameterVisibility="checked => $emit('update:seenAverageFirstNineDartsSet', checked)"
        />
      </div>
      <div class="statistic-average__win-legs">
        <h5 class="statistic__parameter-header">выигранные леги</h5>
        <CheckboxVisibility
          parameterName="матч"
          :parameterVisibility="seenAveragePointsWinLegsGame"
          @update:parameterVisibility="checked => $emit('update:seenAveragePointsWinLegsGame', checked)"
        />
        <CheckboxVisibility
          parameterName="сет"
          :parameterVisibility="seenAveragePointsWinLegsSet"
          @update:parameterVisibility="checked => $emit('update:seenAveragePointsWinLegsSet', checked)"
        />
      </div>
      <div class="statistic-average__lose-legs">
        <h5 class="statistic__parameter-header">проигранные леги</h5>
        <CheckboxVisibility
          parameterName="матч"
          :parameterVisibility="seenAveragePointsLoseLegsGame"
          @update:parameterVisibility="checked => $emit('update:seenAveragePointsLoseLegsGame', checked)"
        />
        <CheckboxVisibility
          parameterName="сет"
          :parameterVisibility="seenAveragePointsLoseLegsSet"
          @update:parameterVisibility="checked => $emit('update:seenAveragePointsLoseLegsSet', checked)"
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
          @update:parameterVisibility="checked => $emit('update:seenP180Game', checked)"
        />
        <CheckboxVisibility
          parameterName="171+"
          :parameterVisibility="seenP171Game"
          @update:parameterVisibility="checked => $emit('update:seenP171Game', checked)"
        />
        <CheckboxVisibility
          parameterName="131+"
          :parameterVisibility="seenP131Game"
          @update:parameterVisibility="checked => $emit('update:seenP131Game', checked)"
        />
        <CheckboxVisibility
          parameterName="96+"
          :parameterVisibility="seenP96Game"
          @update:parameterVisibility="checked => $emit('update:seenP96Game', checked)"
        />
      </div>
      <div class="statistic-points__set-points">
        <h5 class="statistic__parameter-header">сет</h5>
        <CheckboxVisibility
          parameterName="180"
          :parameterVisibility="seenP180Set"
          @update:parameterVisibility="checked => $emit('update:seenP180Set', checked)"
        />
        <CheckboxVisibility
          parameterName="171+"
          :parameterVisibility="seenP171Set"
          @update:parameterVisibility="checked => $emit('update:seenP171Set', checked)"
        />
        <CheckboxVisibility
          parameterName="131+"
          :parameterVisibility="seenP131Set"
          @update:parameterVisibility="checked => $emit('update:seenP131Set', checked)"
        />
        <CheckboxVisibility
          parameterName="96+"
          :parameterVisibility="seenP96Set"
          @update:parameterVisibility="checked => $emit('update:seenP96Set', checked)"
        />
      </div>
    </div>
    <div class="statistic__closing statistic-closing">
      <h4 class="statistic__group-header">Закрытия</h4>
      <div class="statistic-closing__double">
        <h5 class="statistic__parameter-header">% удвоений</h5>
        <CheckboxVisibility
          parameterName="матч"
          :parameterVisibility="seenPercentDoubleGame"
          @update:parameterVisibility="checked => $emit('update:seenPercentDoubleGame', checked)"
        />
        <CheckboxVisibility
          parameterName="сет"
          :parameterVisibility="seenPercentDoubleSet"
          @update:parameterVisibility="checked => $emit('update:seenPercentDoubleSet', checked)"
        />
      </div>
      <div class="statistic-closing__highest">
        <h5 class="statistic__parameter-header">наибольшее</h5>
        <CheckboxVisibility
          parameterName="матч"
          :parameterVisibility="seenHighestCheckoutGame"
          @update:parameterVisibility="checked => $emit('update:seenHighestCheckoutGame', checked)"
        />
        <CheckboxVisibility
          parameterName="сет"
          :parameterVisibility="seenHighestCheckoutSet"
          @update:parameterVisibility="checked => $emit('update:seenHighestCheckoutSet', checked)"
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
