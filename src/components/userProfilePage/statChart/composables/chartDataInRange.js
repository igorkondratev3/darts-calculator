import { ref, computed } from 'vue';
import { formattedDate } from '../../helpers.js';

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
  const maxValue = computed(() =>
  chartDataInInterval.value.length > 0
    ? Math.max(
        ...chartDataInInterval.value.map(
          (parameterValue) => parameterValue.value
        )
      )
    : 0
);

  const updateDates = (newStartDate, newEndDate) => {
    correctStartDate.value = newStartDate;
    correctEndDate.value = newEndDate;
  };

  return { chartDataInInterval, chartDataInIntervalWithoutZero, maxValue, updateDates };
};


const isDateInInterval = (date, startDate, endDate) => {
  const dateArr = date.split('-').map((value) => Number(value));
  const startDateArr = startDate.split('-').map((value) => Number(value));
  const endDateArr = endDate.split('-').map((value) => Number(value));

  if (dateArr[0] < startDateArr[0] || dateArr[0] > endDateArr[0]) return false;

  if (dateArr[0] === startDateArr[0] && dateArr[1] < startDateArr[1])
    return false;

  if (dateArr[0] === endDateArr[0] && dateArr[1] > endDateArr[1]) return false;

  if (
    dateArr[0] === startDateArr[0] &&
    dateArr[1] === startDateArr[1] &&
    dateArr[2] < startDateArr[2]
  )
    return false;

  if (
    dateArr[0] === endDateArr[0] &&
    dateArr[1] === endDateArr[1] &&
    dateArr[2] > endDateArr[2]
  )
    return false;

  return true;
};