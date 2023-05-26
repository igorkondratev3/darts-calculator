<script setup>
defineProps({
  gameStatisticP1: Object,
  gameStatisticP2: Object
});
</script>

<template>
  <h4 class="game-statistic__header-group">Очки</h4>
  <div class="game-statistic__parameters statistic-parameters">
    <div class="statistic-parameters__values">
      {{ gameStatisticP1.p180.value }}
    </div>
    <h5 class="statistic-parameters__header">180</h5>
    <div class="statistic-parameters__values">
      {{ gameStatisticP2.p180.value }}
    </div>
  </div>
  <div class="game-statistic__parameters statistic-parameters">
    <div class="statistic-parameters__values">
      {{ gameStatisticP1.p171.value }}
    </div>
    <h5 class="statistic-parameters__header">171+</h5>
    <div class="statistic-parameters__values">
      {{ gameStatisticP2.p171.value }}
    </div>
  </div>
  <div class="game-statistic__parameters statistic-parameters">
    <div class="statistic-parameters__values">
      {{ gameStatisticP1.p131.value }}
    </div>
    <h5 class="statistic-parameters__header">131+</h5>
    <div class="statistic-parameters__values">
      {{ gameStatisticP2.p131.value }}
    </div>
  </div>
  <div class="game-statistic__parameters statistic-parameters">
    <div class="statistic-parameters__values">
      {{ gameStatisticP1.p96.value }}
    </div>
    <h5 class="statistic-parameters__header">96+</h5>
    <div class="statistic-parameters__values">
      {{ gameStatisticP2.p96.value }}
    </div>
  </div>
</template>

<style></style>
