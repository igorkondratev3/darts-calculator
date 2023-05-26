<script setup>
defineProps({
  seenParametersGame: Object,
  seenParametersSet: Object,
  gameStatistic: Object,
  setStatistic: Object,
  areSetsInGame: Boolean
});
</script>

<template>
  <div class="statistic__points statistic-points">
    <h4 class="statistic__group-header">Очки</h4>
    <div
      class="statistic-points__game-points"
      v-if="seenParametersGame.points.value"
    >
      <h5 class="statistic__parameter-header" v-if="areSetsInGame">матч</h5>
      <template
        v-for="(point, key) in seenParametersGame.pointsGroup"
        :key="key + 'game'"
      >
        <div class="statistic__values" v-if="point.value">
          <h6 class="statistic__value-header">
            {{ key.slice(1) }}{{ key !== 'p180' ? '+' : undefined }}
          </h6>
          {{ gameStatistic[key].value }}
        </div>
      </template>
    </div>
    <div
      class="statistic-points__set-points"
      v-if="seenParametersSet.points.value"
    >
      <h5 class="statistic__parameter-header">сет</h5>
      <template
        v-for="(point, key) in seenParametersSet.pointsGroup"
        :key="key + 'set'"
      >
        <div class="statistic__values" v-if="point.value">
          <h6 class="statistic__value-header">
            {{ key.slice(1) }}{{ key !== 'p180' ? '+' : undefined }}
          </h6>
          {{ setStatistic[key].value }}
        </div>
      </template>
    </div>
  </div>
</template>

<style></style>
