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
    <div class="player-score__legs-won">
      <!--можно еще реализовать через flex order-->
      {{ player === 'P1' ? 'Леги ' + legsWonInSet : legsWonInSet + ' Леги' }}
    </div>
    <div class="player-score__sets-won" v-if="areSetsInGame">
      {{ player === 'P1' ? 'Сеты ' + setsWon : setsWon + ' Сеты' }}
    </div>
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
    font-size: calc(var(--base) * 0.32);
    text-align: center;
  }
}
</style>
