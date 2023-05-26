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

  <img
    v-if="usersStore.users[player] && showDone && isStatisticSave"
    class="save-icon"
    :class="{
      'save-icon_left': player === 'P1',
      'save-icon_right': player === 'P2'
    }"
    src="/src/assets/images/done.svg"
    alt="done"
  />
</template>

<style lang="scss">
.game-statistic__save {
  position: absolute;
  top: 32px;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgb(182, 195, 197);

  &_left {
    left: 0;
    transform: translateX(calc(-100% - 8px));
  }

  &_right {
    right: 0;
    transform: translateX(calc(100% + 8px));
  }

  &:focus {
    outline: 1px solid white;
    outline-offset: 4px;
  }

  &:disabled {
    background-color: rgb(107, 107, 107);
  }
}

.save-icon {
  width: 32px;
  height: 32px;
  z-index: 2;
  display: block;
}

.save-icon_left {
  position: absolute;
  top: 36px;
  left: -36px;
}

.save-icon_right {
  position: absolute;
  top: 36px;
  right: -36px;
}
</style>
