<script setup>
defineProps({
  gameStatisticP1: Object,
  gameStatisticP2: Object
});
</script>

<template>
  <h3 class="game-statistic__header-group">Средний набор</h3>
  <div class="game-statistic__parameters statistic-parameters">
    <div class="statistic-parameters__values">
      {{ gameStatisticP1.averagePoints.value.toFixed(2) }}
    </div>
    <h5 class="statistic-parameters__header">матч</h5>
    <div class="statistic-parameters__values">
      {{ gameStatisticP2.averagePoints.value.toFixed(2) }}
    </div>
  </div>
  <div class="game-statistic__parameters statistic-parameters">
    <div class="statistic-parameters__values">
      {{ gameStatisticP1.averagePointsWinLegs.value.toFixed(2) }}
    </div>
    <h5 class="statistic-parameters__header">выигранные леги</h5>
    <div class="statistic-parameters__values">
      {{ gameStatisticP2.averagePointsWinLegs.value.toFixed(2) }}
    </div>
  </div>
  <div class="game-statistic__parameters statistic-parameters">
    <div class="statistic-parameters__values">
      {{ gameStatisticP1.averagePointsLoseLegs.value.toFixed(2) }}
    </div>
    <h5 class="statistic-parameters__header">проигранные леги</h5>
    <div class="statistic-parameters__values">
      {{ gameStatisticP2.averagePointsLoseLegs.value.toFixed(2) }}
    </div>
  </div>
  <div class="game-statistic__parameters statistic-parameters">
    <div class="statistic-parameters__values">
      {{ gameStatisticP1.averageFirstNineDarts.value.toFixed(2) }}
    </div>
    <h5 class="statistic-parameters__header">9 дротиков</h5>
    <div class="statistic-parameters__values">
      {{ gameStatisticP2.averageFirstNineDarts.value.toFixed(2) }}
    </div>
  </div>
</template>

<style></style>
