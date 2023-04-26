<script setup>
import { ref } from 'vue'
const props = defineProps({
  parameterName: String,
  chartData: Array
});
const chartWidth = 300;
const chartHeight = 300;
let lineWidth = calculateLineWidth(chartWidth, props.chartData.length);
const maxValue = Math.max(
  ...props.chartData.map((parameterValue) => parameterValue.value)
);

const calculateLineHeight = (chartHeight, maxValue, currentValue) =>
  (chartHeight / maxValue) * currentValue;

const calculateX = (indexLine, lineWidth) => indexLine * lineWidth + indexLine;
const calculateY = (chartHeight, maxValue, currentValue) =>
  chartHeight - calculateLineHeight(chartHeight, maxValue, currentValue);

  function calculateLineWidth(chartWidth, numberOfValues) {
  const breakLength = numberOfValues - 1;
  let lineWidth = (chartWidth - breakLength) / numberOfValues;
  if (lineWidth > 25) lineWidth = 25;
  if (lineWidth < 7) lineWidth = 7;
  return lineWidth;
} //не будет помещяться при маленьком значении подумать (когдп много параметров)


const seenValue = ref(false);
const dateValue = ref('')
const scoreValue = ref(0);

const showValue = (date, value) => {
  dateValue.value = date;
  scoreValue.value = value; 
  seenValue.value = true;
}
const hideValue = () => {
  seenValue.value = false;
}
</script>

<template>
  <div class="chart">
    <h3 class="chart__head">{{ props.parameterName }}</h3>
    <svg class="svg" :width="chartWidth" :height="chartHeight">
    <rect
      v-for="(valueObj, index) of props.chartData"
      :key="valueObj.date + props.parameterName"
      :width="lineWidth"
      :height="calculateLineHeight(chartHeight, maxValue, valueObj.value)"
      :x="calculateX(index, lineWidth)"
      :y="calculateY(chartHeight, maxValue, valueObj.value)"
      class="ddfd"
      @pointerover="showValue(valueObj.date, valueObj.value)"
      @pointerleave="hideValue"
    ></rect>
  </svg>
  <div v-show="seenValue">{{ dateValue }} {{ scoreValue }}</div>
  </div>
  

</template>

<style>
.ddfd {
  fill: #f0b375;
}

.ddfd:hover {
  fill: rgb(99, 161, 177);
}
.ddfd::after {
  position: absolute;
  top: 350px;
  content: 'dfdfdfdfdfdfd dfdfdfd';
  color: black;
  width: 50px;
  height: 50px;
}

.svg {
  background-color: #e0e6e4;
}
.svg::after {
  position: absolute;
  top: 350px;
  content: 'dfdfdfdfdfdfd dfdfdfd';
  color: black;
  width: 50px;
  height: 50px;
}
</style>
