<script setup>
defineProps({
  seenGroups: Object,
  seenParametersGame: Object,
  seenParametersSet: Object,
  gameStatistic: Object,
  setStatistic: Object,
  areSetsInGame: Boolean,
  isPercentDoubleInStat: Boolean
});
</script>

<template>
  <div
    class="statistic__closing statistic-closing"
    v-if="seenGroups.closing.value"
  >
    <h4 class="statistic__group-header">Закрытия</h4>
    <div
      class="statistic-closing__double"
      v-if="seenGroups.double.value && isPercentDoubleInStat"
    >
      <h5 class="statistic__parameter-header">% удвоений</h5>
      <div
        class="statistic__values"
        v-if="seenParametersGame.percentDouble.value"
      >
        <h6 class="statistic__value-header" v-if="areSetsInGame">матч</h6>
        {{ gameStatistic.percentDouble.value.toFixed(2) }} %
      </div>
      <div
        class="statistic__values"
        v-if="seenParametersSet.percentDouble.value"
      >
        <h6 class="statistic__value-header">сет</h6>
        {{ setStatistic.percentDouble.value.toFixed(2) }} %
      </div>
    </div>
    <div class="statistic-closing__highest" v-if="seenGroups.highest.value">
      <h5 class="statistic__parameter-header">наибольшее</h5>
      <div
        class="statistic__values"
        v-if="seenParametersGame.highestCheckout.value"
      >
        <h6 class="statistic__value-header" v-if="areSetsInGame">матч</h6>
        {{ gameStatistic.highestCheckout.value }}
      </div>
      <div
        class="statistic__values"
        v-if="seenParametersSet.highestCheckout.value"
      >
        <h6 class="statistic__value-header">сет</h6>
        {{ setStatistic.highestCheckout.value }}
      </div>
    </div>
  </div>
</template>

<style></style>
