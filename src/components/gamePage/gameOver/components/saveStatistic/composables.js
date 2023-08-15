import { ref } from 'vue';
import { updateTokens } from '@/helpers/auth.js';
import { setData, checkCustomError } from '@/helpers/fetch.js';

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

    try {
      const { response, json } = await setData(player, usersStore, {
        statistic: gameStatistic,
        legs: legNumber,
        legsWon: legsWonInGame,
        legsLose: legNumber - legsWonInGame,
        timeZone: new Date().getTimezoneOffset() / 60
      });
      await updateTokens(player, usersStore, json);
      await checkCustomError(json, response);
      showDone.value = true;
    } catch (error) {
      emits('showPopUp', error.message);
      isStatisticSave.value = false;
    }
  };

  return { isStatisticSave, showDone, setStatisticInDB };
};
