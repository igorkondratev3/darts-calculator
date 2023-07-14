import { ref } from 'vue';

export const useChartSettingsVisibility = () => {
  const chartsSettingsVisibility = ref(false);
  const openChartSettings = () => (chartsSettingsVisibility.value = true);
  const closeChartSettings = () => (chartsSettingsVisibility.value = false);

  return { chartsSettingsVisibility, openChartSettings, closeChartSettings };
};
