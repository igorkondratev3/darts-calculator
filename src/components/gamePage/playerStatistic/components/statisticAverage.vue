<script setup>
defineProps({
  seenGroups: Object,
  seenParametersGame: Object,
  seenParametersSet: Object,
  seenAveragePointsLeg: Boolean,
  gameStatistic: Object,
  setStatistic: Object,
  averagePointsLeg: Number,
  areSetsInGame: Boolean
});
</script>

<template>
  <div
    class="statistic__average statistic-average"
    v-if="seenGroups.averagePoints.value"
  >
    <h4 class="statistic__group-header statistic__group-header_margin-bottom">
      Средний набор
    </h4>
    <div class="statistic-average__points">
      <div
        class="statistic__values"
        v-if="seenParametersGame.averagePoints.value"
      >
        <h6 class="statistic__value-header">матч</h6>
        {{ gameStatistic.averagePoints.value.toFixed(2) }}
      </div>
      <div
        class="statistic__values"
        v-if="seenParametersSet.averagePoints.value"
      >
        <h6 class="statistic__value-header">сет</h6>
        {{ setStatistic.averagePoints.value.toFixed(2) }}
      </div>
      <div class="statistic__values" v-if="seenAveragePointsLeg">
        <h6 class="statistic__value-header">лег</h6>
        {{ averagePointsLeg.toFixed(2) }}
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
        <h6 class="statistic__value-header" v-if="areSetsInGame">матч</h6>
        {{ gameStatistic.averageFirstNineDarts.value.toFixed(2) }}
      </div>
      <div
        class="statistic__values"
        v-if="seenParametersSet.averageFirstNineDarts.value"
      >
        <h6 class="statistic__value-header">сет</h6>
        {{ setStatistic.averageFirstNineDarts.value.toFixed(2) }}
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
        <h6 class="statistic__value-header" v-if="areSetsInGame">матч</h6>
        {{ gameStatistic.averagePointsWinLegs.value.toFixed(2) }}
      </div>
      <div
        class="statistic__values"
        v-if="seenParametersSet.averagePointsWinLegs.value"
      >
        <h6 class="statistic__value-header">сет</h6>
        {{ setStatistic.averagePointsWinLegs.value.toFixed(2) }}
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
        <h6 class="statistic__value-header" v-if="areSetsInGame">матч</h6>
        {{ gameStatistic.averagePointsLoseLegs.value.toFixed(2) }}
      </div>
      <div
        class="statistic__values"
        v-if="seenParametersSet.averagePointsLoseLegs.value"
      >
        <h6 class="statistic__value-header">сет</h6>
        {{ setStatistic.averagePointsLoseLegs.value.toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
