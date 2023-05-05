<script setup>
import { ref } from 'vue';
const props = defineProps({
  parameterName: String,
  chartData: Array
});
const chartWidth = 1000;
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
const dateValue = ref('');
const scoreValue = ref(0);

const showValue = (date, value) => {
  dateValue.value = date;
  scoreValue.value = value;
  seenValue.value = true;
};
const hideValue = () => {
  seenValue.value = false;
};

const formattedDate = (ddmmyyyy) => {
  const yyyymmdd = ddmmyyyy.split('-').reverse().join('-');
  return yyyymmdd;
};

const startDate = ref(formattedDate(props.chartData[0].date));
//const endDate = ref(formattedDate(props.chartData[0].date));

//будет одинаковая проверка для стартовой и конечной на интервал + нужна проверка на
//пересечение, разным будет еще присваевоемое значение в случае неудачной валидации
//выводить служеюные сообщения для пользователей
const startDateValidate = () => {
  const arrDate = startDate.value.split('-').map(value => Number(value));
  const arrMinDate = minDate.split('-').map(value => Number(value));
  const arrMaxDate = maxDate.split('-').map(value => Number(value));
  console.log(arrMaxDate)
if (
    Number(arrDate[0]) < Number(arrMinDate[0]) ||
    Number(arrDate[0]) > Number(arrMaxDate[0])
  ) {
    startDate.value = minDate;
    return;
  }
//продолжаем проверку даты
/*  if (Number(arrDate[1]) < Number(arrMinDate[1])) {
    if ()
    startDate.value = minDate;
    return;
  }*/
};

const minDate = formattedDate(props.chartData[0].date);
const maxDate = formattedDate(props.chartData.at(-1).date);
</script>

<template>
  <div class="chart-box">
    {{ startDate }}
    <h3 class="chart-box__head">{{ props.parameterName }}</h3>
    <div class="chart-wrap" :data-max="maxValue">
      <!--чтобы можно было сделать псевдоэлемент, overflow скрывает-->
      <div class="chart-box__chart chart">
        <svg class="chart__svg" :width="chartWidth" :height="chartHeight">
          <rect
            v-for="(valueObj, index) of props.chartData"
            :key="valueObj.date + props.parameterName"
            :width="lineWidth"
            :height="calculateLineHeight(chartHeight, maxValue, valueObj.value)"
            :x="calculateX(index, lineWidth)"
            :y="calculateY(chartHeight, maxValue, valueObj.value)"
            class="chart__line"
            @pointerover="showValue(valueObj.date, valueObj.value)"
            @pointerleave="hideValue"
          ></rect>
        </svg>
      </div>
      <div class="chart-box__info" v-show="seenValue">
        {{ dateValue }} {{ scoreValue }}
      </div>
    </div>
    <div class="date">
      <label>
        <h6>С</h6>
        <input
          type="date"
          v-model.lazy="startDate"
          :min="minDate"
          :max="maxDate"
          @blur="startDateValidate"
        />
        <!--по блюру и ентеру будем запускать изменения предварительно проверив
        корректность даты-->
      </label>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.chart-box {
  display: inline-flex;
  margin-left: 150px;
  margin-top: 50px;
  flex-direction: column;
  align-items: center;

  &__info {
    align-self: center;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);
  }
}

.chart {
  border-bottom: 3px solid black;
  border-left: 3px solid black;
  line-height: 0;
  padding-right: 32px;
  padding-top: 32px;
  background-color: #eef7f4;
  width: 300px;
  overflow-x: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-track {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    display: none;
  }

  &__line {
    fill: #f0b375;

    &:hover {
      fill: rgb(99, 161, 177);
    }
  }
}

.chart-wrap {
  &::before {
    content: attr(data-max) ' \2014';
    position: absolute;
    top: 32px;
    left: 0;
    transform: translate(-100%, calc(-50% + 2px));
    @include fonts.Advent($size: 16px);
  }

  &::after {
    content: '0';
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateX(calc(-100% - 4px));
    @include fonts.Advent($size: 16px);
  }
}

.date {
  margin-top: 32px;
  background-color: red;
}
</style>
