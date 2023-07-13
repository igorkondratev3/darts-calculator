import { ref, computed } from 'vue';
import { formattedDate, isDateInInterval } from '../helpers';

export const useChartDataInRange = (chartData) => {
  const correctStartDate = ref(formattedDate(chartData[0].date));
  const correctEndDate = ref(formattedDate(chartData.at(-1).date));
  const chartDataInInterval = computed(() =>
    chartData.filter((val) =>
      isDateInInterval(
        formattedDate(val.date),
        correctStartDate.value,
        correctEndDate.value
      )
    )
  );
  const chartDataInIntervalWithoutZero = computed(() =>
    chartDataInInterval.value.filter((val) => val.value > 0)
  );

  const updateDates = (newStartDate, newEndDate) => {
    correctStartDate.value = newStartDate;
    correctEndDate.value = newEndDate;
  };

  return { chartDataInInterval, chartDataInIntervalWithoutZero, updateDates };
};
