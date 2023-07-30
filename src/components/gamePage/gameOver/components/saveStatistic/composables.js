import { ref } from 'vue';

export const useSetStatisticInDB = () => {
  const isStatisticSave = ref(false);
  const showDone = ref(false);

  const setStatisticInDB = async (
    player,
    gameStatisticProp,
    isPercentDoubleInStat,
    legNumber,
    legsWonInGame,
    usersStore,
    emits
  ) => {
    isStatisticSave.value = true;
    const gameStatistic = {};
    for (const key in gameStatisticProp)
      gameStatistic[key] = gameStatisticProp[key].value;

    if (!isPercentDoubleInStat) {
      delete gameStatistic.percentDouble;
    }

    const URI = `${import.meta.env.VITE_BACKEND_URI}/statistic/set`;
    const fetchParams = {
      method: 'POST',
      body: JSON.stringify({
        refreshToken: usersStore.users[player]?.refreshToken || '',
        statistic: gameStatistic,
        legs: legNumber,
        legsWon: legsWonInGame,
        legsLose: legNumber - legsWonInGame,
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

  return { isStatisticSave, showDone, setStatisticInDB };
};
