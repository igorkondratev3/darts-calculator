<script setup>
import { useUsersStore } from '@/stores/users.js';
import { ref } from 'vue';

const props = defineProps({
  player: String,
  gameStatistic: Object,
  isPercentDoubleInStat: Boolean,
  legNumber: Number,
  legsWonInGame: Number
});
const emits = defineEmits(['showPopUp']);

const isStatisticSave = ref(false);

const showDone = ref(false);

const usersStore = useUsersStore();

const setstatisticInDB = async (player) => {
  isStatisticSave.value = true;
  const gameStatistic = {};
  for (const key in props.gameStatistic)
    gameStatistic[key] = props.gameStatistic[key].value;

  if (!props.isPercentDoubleInStat) {
    delete gameStatistic.percentDouble;
  }

  const URI = `${import.meta.env.VITE_BACKEND_URI}/statistic/set`;
  const fetchParams = {
    method: 'POST',
    body: JSON.stringify({
      refreshToken: usersStore.users[player]?.refreshToken || '',
      statistic: gameStatistic,
      legs: props.legNumber,
      legsWon: props.legsWonInGame,
      legsLose: props.legNumber - props.legsWonInGame,
      timeZone: new Date().getTimezoneOffset() / 60
    }),
    headers: {
      authorization: `Bearer ${usersStore.users[player]?.token}`,
      'Content-Type': 'application/json'
    }
  };
  let response;
  let json;
  try {
    response = await fetch(URI, fetchParams);
    json = await response.json();
  } catch (error) {
    console.error(error);
    emits('showPopUp', 'Ошибка доступа к серверу');
    isStatisticSave.value = false;
    return;
  }

  if (json && Object.hasOwn(json, 'newTokens')) {
    usersStore.updateTokens(
      player,
      json.newTokens.token,
      json.newTokens.refreshToken
    );
    const user = JSON.parse(localStorage.getItem(`user${player}`));
    user.token = json.newTokens.token;
    user.refreshToken = json.newTokens.refreshToken;
    localStorage.setItem(`user${player}`, JSON.stringify(user));
  }

  if (json && Object.hasOwn(json, 'error')) {
    console.error(json.error);
    emits('showPopUp', json.error);
    isStatisticSave.value = false;
    return;
  }

  if (!json || (!response.ok && !Object.hasOwn(json, 'error'))) {
    isStatisticSave.value = false;
    emits('showPopUp', 'Не удалось сохранить статистику');
    return;
  }
  showDone.value = true;
};
</script>

<template>
  <button
    class="game-statistic__save"
    :class="{
      'game-statistic__save_left': player === 'P1',
      'game-statistic__save_right': player === 'P2'
    }"
    @click="setstatisticInDB(player)"
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

  &:focus {
    outline: calc(var(--base) * 0.01) solid rgb(182, 195, 197);
    outline-offset: calc(var(--base) * 0.04);
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
