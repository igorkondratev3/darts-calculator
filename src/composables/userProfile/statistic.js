import { ref } from 'vue';

export const useStatistic = (player, usersStore) => {
  const statistic = ref(null);
  const messageError = ref('');
  const chartsSettings = {
    zeroSeen: ref(false),
    visible: ref(new Set()),
    minDate: '',
    maxDate: '',
    globalRangeDate: ref({
      start: '',
      end: '',
      updateGlobalDates(newStartDate, newEndDate) {
        chartsSettings.globalRangeDate.value.start = newStartDate;
        chartsSettings.globalRangeDate.value.end = newEndDate;
      }
    }),

    updateVisibleCharts(chartName) {
      if (!chartsSettings.visible.value.delete(chartName))
        chartsSettings.visible.value.add(chartName);
    }
  };

  getStatistic(player, usersStore);

  async function getStatistic(player, usersStore) {
    try {
      const { response, json } = await getData(player, usersStore);
      await updateTokens(player, usersStore, json);
      await checkCustomError(json, response);
      statistic.value = json.statistic;
      await checkEmptyStatistic(statistic.value);
      await fillChartsSettings(statistic.value, chartsSettings);
    } catch (error) {
      messageError.value = error.message;
    }
  }

  async function getData(player, usersStore) {
    const URI = `${import.meta.env.VITE_BACKEND_URI}/statistic/get`;
    const fetchParams = {
      method: 'POST',
      body: JSON.stringify({
        refreshToken: usersStore.users[player]?.refreshToken || ''
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
      return { response, json };
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка сервера при получении статистики');
    }
  }

  const updateTokens = async (player, usersStore, json) => {
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
  };

  const checkCustomError = async (json, response) => {
    if (json && Object.hasOwn(json, 'error')) {
      console.error(json.error);
      throw new Error(json.error);
    }

    if (!json || (!response.ok && !Object.hasOwn(json, 'error')))
      throw new Error('Не удалось получить статистику');
  };

  const checkEmptyStatistic = async (statistic) => {
    if (!Object.keys(statistic)[0]) throw new Error('Статистика отсутствует');
  };

  const fillChartsSettings = async (statistic, chartsSettings) => {
    chartsSettings.visible.value = new Set(getStatNamesWithValues(statistic));
    chartsSettings.minDate = statistic.averagePoints[0].date;
    chartsSettings.maxDate = statistic.averagePoints.at(-1).date;
  };

  const getStatNamesWithValues = (statistic) => {
    return Object.keys(statistic).filter((statName) =>
      Boolean(statistic[statName][0])
    );
  };

  return { statistic, messageError, chartsSettings, getStatNamesWithValues };
};
