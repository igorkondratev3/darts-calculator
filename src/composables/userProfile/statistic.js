import { ref } from 'vue';
import { updateTokens } from '@/helpers/auth.js';
import { getData, checkCustomError } from '@/helpers/fetch.js';

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
