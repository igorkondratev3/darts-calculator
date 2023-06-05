<script setup>
defineProps({
  setsWon: Number,
  legsWonInSet: Number,
  areSetsInGame: Boolean,
  player: String
});
</script>

<template>
  <div class="palyers-information__player-score player-score">
    <div
      class="player-score__legs-won"
      :class="{ 'player-score__align_end': player === 'P1' }"
    >
      <!--можно еще реализовать через flex order-->
      {{ player === 'P1' ? 'Леги ' + legsWonInSet : legsWonInSet + ' Леги' }}
    </div>
    <div
      class="player-score__sets-won"
      v-if="areSetsInGame"
      :class="{ 'player-score__align_end': player === 'P1' }"
    >
      {{ player === 'P1' ? 'Сеты ' + setsWon : setsWon + ' Сеты' }}
    </div>
  </div>
</template>

<style lang="scss">
.player-score {
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  &__sets-won,
  &__legs-won {
    font-size: calc(var(--base) * 0.32);
    width: calc(var(--base) * 1.08);
  }

  &__align_end {
    text-align: end;
  }
}
</style>
