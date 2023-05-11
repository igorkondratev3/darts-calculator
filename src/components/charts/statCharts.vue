<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  parameterName: String,
  chartData: Array
});

const translateName = (name) => {
  switch (name) {
    case 'averagePoints':
      return 'Средний набор';
    case 'averagePointsWinLegs':
      return 'Выигранные леги';
    case 'averagePointsLoseLegs':
      return 'Проигранные леги';
    case 'averageFirstNineDarts':
      return '9 дротиков';
    case 'p180':
      return '180 очков';
    case 'p171':
      return '171+ очков';
    case 'p131':
      return '131+ очков';
    case 'p96':
      return '96+ очков';
    case 'percentDouble':
      return 'Процент удвоений';
    case 'highestCheckout':
      return 'Набольшие закрытия';
    default:
      return name;
  }
};

const name = translateName(props.parameterName);

const formattedDate = (ddmmyyyy) => {
  const yyyymmdd = ddmmyyyy.split('-').reverse().join('-');
  return yyyymmdd;
};
const minDate = formattedDate(props.chartData[0].date);
const maxDate = formattedDate(props.chartData.at(-1).date);

const startDate = ref(minDate);
const endDate = ref(maxDate);
const startDateForChart = ref(minDate);
const endDateForChart = ref(maxDate);

//использоваь функцию для проверки дат
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

const hideZero = ref(false);

const currentChartData = computed(() =>
  props.chartData.filter((val) =>
    isDateInInterval(
      formattedDate(val.date),
      startDateForChart.value,
      endDateForChart.value
    )
  )
);

const currentChartDataWithoutZero = computed(() =>
  currentChartData.value.filter((val) => val.value > 0)
);

const chartWidth = computed(() =>
  currentChartData.value.length * 7 + currentChartData.value.length - 1 > 260
    ? currentChartData.value.length * 7 + currentChartData.value.length - 1
    : 260
);

const chartHeight = 300;

const lineWidth = computed(() =>
  calculateLineWidth(chartWidth.value, currentChartData.value.length)
);
const maxValue = computed(() =>
  Math.max(
    ...currentChartData.value.map((parameterValue) => parameterValue.value)
  )
);

const calculateLineHeight = (chartHeight, maxValue, currentValue) =>
  (chartHeight / maxValue) * currentValue || 7;
//чтобы нулевые показатели были видны

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

const startDateValidate = () => {
  console.log('Начали валидацию');
  const arrDate = startDate.value.split('-').map((value) => Number(value));
  const arrMinDate = minDate.split('-').map((value) => Number(value));
  const arrMaxDate = maxDate.split('-').map((value) => Number(value));
  if (arrDate[0] < arrMinDate[0] || arrDate[0] > arrMaxDate[0]) {
    startDate.value = minDate;
    return;
  }

  if (arrDate[0] === arrMinDate[0] && arrDate[1] < arrMinDate[1]) {
    startDate.value = minDate;
    return;
  }

  if (arrDate[0] === arrMaxDate[0] && arrDate[1] > arrMaxDate[1]) {
    startDate.value = minDate;
    return;
  }

  if (
    arrDate[0] === arrMinDate[0] &&
    arrDate[1] === arrMinDate[1] &&
    arrDate[2] < arrMinDate[2]
  ) {
    startDate.value = minDate;
    return;
  }

  if (
    arrDate[0] === arrMaxDate[0] &&
    arrDate[1] === arrMaxDate[1] &&
    arrDate[2] > arrMaxDate[2]
  ) {
    startDate.value = minDate;
    return;
  }
};

const endDateValidate = () => {
  console.log('Начали валидацию');
  const arrDate = endDate.value.split('-').map((value) => Number(value));
  const arrMinDate = minDate.split('-').map((value) => Number(value));
  const arrMaxDate = maxDate.split('-').map((value) => Number(value));

  if (arrDate[0] < arrMinDate[0] || arrDate[0] > arrMaxDate[0]) {
    endDate.value = maxDate;
    return;
  }

  if (arrDate[0] === arrMinDate[0] && arrDate[1] < arrMinDate[1]) {
    endDate.value = maxDate;
    return;
  }

  if (arrDate[0] === arrMaxDate[0] && arrDate[1] > arrMaxDate[1]) {
    endDate.value = maxDate;
    return;
  }

  if (
    arrDate[0] === arrMinDate[0] &&
    arrDate[1] === arrMinDate[1] &&
    arrDate[2] < arrMinDate[2]
  ) {
    endDate.value = maxDate;
    return;
  }

  if (
    arrDate[0] === arrMaxDate[0] &&
    arrDate[1] === arrMaxDate[1] &&
    arrDate[2] > arrMaxDate[2]
  ) {
    endDate.value = maxDate;
    return;
  }
};

const dateIntervalValidate = () => {
  const arrStartDate = startDate.value.split('-').map((value) => Number(value));
  const arrEndDate = endDate.value.split('-').map((value) => Number(value));

  //потом обнулять в заивисмости от проверяемого значения
  if (arrStartDate[0] > arrEndDate[0]) {
    startDate.value = minDate;
    endDate.value = maxDate;
    return;
  }

  if (arrStartDate[0] === arrEndDate[0] && arrStartDate[1] > arrEndDate[1]) {
    startDate.value = minDate;
    endDate.value = maxDate;
    return;
  }

  if (
    arrStartDate[0] === arrEndDate[0] &&
    arrStartDate[1] === arrEndDate[1] &&
    arrStartDate[2] > arrEndDate[2]
  ) {
    startDate.value = minDate;
    endDate.value = maxDate;
    return;
  }
};

const dateValidate = () => {
  startDateValidate();
  endDateValidate();
  dateIntervalValidate();
};

const changeChart = () => {
  dateValidate();
  startDateForChart.value = startDate.value;
  endDateForChart.value = endDate.value;
};
</script>

<template>
  <div class="chart-box">
    <h3 class="chart-box__head">{{ name }}</h3>
    <div class="chart-wrap" :data-max="maxValue || ''">
      <!--чтобы можно было сделать псевдоэлемент, overflow скрывает-->
      <div class="chart-box__chart chart">
        <svg class="chart__svg" :width="chartWidth" :height="chartHeight">
          <rect
            v-for="(valueObj, index) of hideZero
              ? currentChartDataWithoutZero
              : currentChartData"
            :data-valy="calculateY(chartHeight, maxValue, valueObj.value)"
            :key="valueObj.date + props.parameterName + index"
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
        {{ dateValue }} {{ scoreValue.toFixed(2) }}
      </div>
    </div>
    <div class="date">
      <label class="date__from">
        <h6 class="date__header">с</h6>
        <input
          class="date__value"
          type="date"
          v-model="startDate"
          :min="minDate"
          :max="maxDate"
          @blur="changeChart"
          @keypress.enter="$event.currentTarget.blur()"
        />
      </label>
      <label class="date__to">
        <h6 class="date__header">по</h6>
        <input
          class="date__value"
          type="date"
          v-model="endDate"
          :min="minDate"
          :max="maxDate"
          @blur="changeChart"
          @keypress.enter="$event.currentTarget.blur()"
        />
      </label>
    </div>
    <label>
      <input type="checkbox" v-model="hideZero" />
      скрывать нули
    </label>
  </div>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.chart-box {
  display: inline-flex;
  margin-left: 112px;
  margin-top: 64px;
  flex-direction: column;
  align-items: center;

  &__info {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 50%;
    text-align: center;
    transform: translate(-50%, 100%);
  }
}

.chart {
  border-bottom: 3px solid black;
  border-left: 3px solid black;
  line-height: 0;
  padding-right: 32px;
  padding-top: 32px;
  background-color: #dadada;
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
    animation-duration: 2s;
    animation-name: line;

    @keyframes line {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }

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
  display: flex;
  margin-top: 32px;

  &__header {
    text-align: center;
  }

  &__from,
  &__to {
    margin-right: 16px;
    display: flex;
    flex-direction: column;
  }
}
</style>
