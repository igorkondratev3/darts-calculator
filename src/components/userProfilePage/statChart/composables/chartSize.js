import { computed } from 'vue';

export const useChartSize = (chartDataInInterval) => {
  const chartWidth = computed(() =>
    chartDataInInterval.value.length * 7 +
      chartDataInInterval.value.length -
      1 >
    260
      ? chartDataInInterval.value.length * 7 +
        chartDataInInterval.value.length -
        1
      : 260
  );
  const chartHeight = 300;
  const lineWidth = computed(() =>
    calculateLineWidth(chartWidth.value, chartDataInInterval.value.length)
  );

  return { chartWidth, chartHeight, lineWidth };
};

const calculateLineWidth = (chartWidth, numberOfValues) => {
  const breakLength = numberOfValues - 1;
  let lineWidth = (chartWidth - breakLength) / numberOfValues;
  if (lineWidth > 25) lineWidth = 25;
  if (lineWidth < 7) lineWidth = 7;
  return lineWidth;
}; //не будет помещаться при маленьком значении подумать (когдп много параметров)
