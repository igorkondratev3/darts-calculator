import { ref, unref, watch } from 'vue';

export const useVisibilityOfZerosInChart = (globalVisibilityOfZeros) => {
  const hideZerosInChart = ref(true);
  const changeHideZerosInChart = () =>
    (hideZerosInChart.value = !hideZerosInChart.value);

  watch(globalVisibilityOfZeros, () => {
    hideZerosInChart.value = !unref(globalVisibilityOfZeros);
  });

  return { hideZerosInChart, changeHideZerosInChart };
};
