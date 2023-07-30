<script setup>
import { useUsersStore } from '@/stores/users.js';
import { useSetStatisticInDB } from './composables.js';

defineProps({
  player: String,
  gameStatistic: Object,
  isPercentDoubleInStat: Boolean,
  legNumber: Number,
  legsWonInGame: Number
});
defineEmits(['showPopUp']);

const usersStore = useUsersStore();

const { isStatisticSave, showDone, setStatisticInDB } = useSetStatisticInDB();
</script>

<template>
  <button
    class="game-statistic__save"
    :class="{
      'game-statistic__save_left': player === 'P1',
      'game-statistic__save_right': player === 'P2'
    }"
    @click="
      setStatisticInDB(
        player,
        gameStatistic,
        isPercentDoubleInStat,
        legNumber,
        legsWonInGame,
        usersStore,
        $emit
      )
    "
    title="сохранить статистику матча"
    v-if="usersStore.users[player] && !showDone"
    :disabled="isStatisticSave"
  >
    <img class="save-icon" src="/src/assets/images/add_circle.svg" alt="add" />
  </button>
  <div
    class="game-statistic__save game-statistic__save-done"
    :class="{
      'game-statistic__save_left': player === 'P1',
      'game-statistic__save_right': player === 'P2'
    }"
    v-if="usersStore.users[player] && showDone && isStatisticSave"
    title="статистика сохранена"
  >
    <img class="save-icon" src="/src/assets/images/done.svg" alt="done" />
  </div>
</template>

<style lang="scss">
.game-statistic__save {
  position: absolute;
  bottom: calc(var(--base) * 0.04);
  border-radius: calc(var(--base) * 0.08);
  cursor: pointer;
  background-color: rgb(182, 195, 197);

  &_left {
    left: 0;
    transform: translateX(-100%);
  }

  &_right {
    right: 0;
    transform: translateX(100%);
  }

  &:focus-visible {
    outline: calc(var(--base) * 0.01) solid rgb(182, 195, 197);
    outline-offset: calc(var(--base) * 0.04);
  }

  &:active {
    box-shadow: 0px calc(var(--base) * 0.05) calc(var(--base) * 0.05) gray;
  }

  &:disabled {
    background-color: rgb(107, 107, 107);
  }
}

.game-statistic__save-done {
  cursor: default;
}

.save-icon {
  width: calc(var(--base) * 0.32);
  height: calc(var(--base) * 0.32);
  z-index: 2;
  display: block;
}

@media (max-width: 750px) {
  .game-statistic__save {
    &_left {
      left: calc(var(--base) * 0.04);
      transform: translateY(calc(100% + calc(var(--base) * 0.08)));
    }

    &_right {
      right: calc(var(--base) * 0.04);
      transform: translateY(calc(100% + calc(var(--base) * 0.08)));
    }
  }
}
</style>
