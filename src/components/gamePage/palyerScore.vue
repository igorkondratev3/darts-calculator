<script setup>
defineProps({
  seenPlayerScore: Boolean,
  setsWon: Number,
  legsWonInSet: Number,
  isSets: Boolean
});
</script>

<template>
  <div
    class="palyers-information__player-score player-score"
    v-if="seenPlayerScore"
  >
    <div class="player-score__legs-won">Леги: {{ legsWonInSet }}</div>
    <div class="player-score__sets-won" v-if="isSets">Сеты: {{ setsWon }}</div>
  </div>
</template>

<style lang="scss">
.player-score {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  &__sets-won,
  &__legs-won {
    font-size: 32px;
    text-align: center;
  }
}
</style>
