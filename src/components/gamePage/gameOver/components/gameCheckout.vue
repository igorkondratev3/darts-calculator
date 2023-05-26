<script setup>
defineProps({
  gameStatisticP1: Object,
  gameStatisticP2: Object,
  isPercentDoubleInStatP1: Boolean,
  isPercentDoubleInStatP2: Boolean
});
</script>

<template>
  <h4 class="game-statistic__header-group">Закрытия</h4>
  <div
    class="game-statistic__parameters statistic-parameters"
    v-if="isPercentDoubleInStatP1 || isPercentDoubleInStatP2"
  >
    <div class="statistic-parameters__values">
      <span v-if="isPercentDoubleInStatP1">
        {{ gameStatisticP1.percentDouble.value.toFixed(2) }} %
      </span>
    </div>
    <h5 class="statistic-parameters__header">%</h5>
    <div class="statistic-parameters__values">
      <span v-if="isPercentDoubleInStatP2">
        {{ gameStatisticP2.percentDouble.value.toFixed(2) }} %
      </span>
    </div>
  </div>
  <div class="game-statistic__parameters statistic-parameters">
    <div class="statistic-parameters__values">
      {{ gameStatisticP1.highestCheckout.value }}
    </div>
    <h5 class="statistic-parameters__header">наибольшее</h5>
    <div class="statistic-parameters__values">
      {{ gameStatisticP2.highestCheckout.value }}
    </div>
  </div>
</template>

<style></style>
