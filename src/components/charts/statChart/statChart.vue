<script setup>
import { ref, computed, toRef } from 'vue';
import DateInterval from '../dateInterval.vue';
import {
  translateName,
  formattedDate,
  calculateLineHeight,
  calculateX,
  calculateY,
  calculateLineWidth,
  defineCountParameterName,
  defineScoreParameterName
} from '../helpers.js';
import { useChartDataInRange } from './chartDataInRange.js';
import { useVisibilityOfZerosInChart } from './visibilityOfZeroInChart.js';

const props = defineProps({
  parameterName: String,
  chartData: Array,
  zeroSeenGlobal: Boolean,
  globalRangeDate: Object
});

const name = translateName(props.parameterName);
const { chartDataInInterval, chartDataInIntervalWithoutZero, updateDates } =
  useChartDataInRange(props.chartData);
const { hideZerosInChart, changeHideZeroInChart } = useVisibilityOfZerosInChart(
  toRef(props, 'zeroSeenGlobal')
);

const chartWidth = computed(() =>
  chartDataInInterval.value.length * 7 + chartDataInInterval.value.length - 1 >
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
const maxValue = computed(() =>
  chartDataInInterval.value.length > 0
    ? Math.max(
        ...chartDataInInterval.value.map(
          (parameterValue) => parameterValue.value
        )
      )
    : 0
);

const seenValue = ref(false);
const dateValue = ref('');
const scoreValue = ref(0);
const countValue = ref(0);
const countParameterName = defineCountParameterName(name);
const scoreParameterName = defineScoreParameterName(name);
const showValue = (date, value, count) => {
  dateValue.value = date;
  scoreValue.value = value;
  countValue.value = count;
  seenValue.value = true;
};
const hideValues = () => {
  dateValue.value = '';
  scoreValue.value = null;
  countValue.value = null;
};
</script>

<template>
  <div class="chart-box">
    <h4 class="chart-box__head">{{ name }}</h4>
    <div
      class="chart-wrapper"
      :data-max="(maxValue % 1 === 0 ? maxValue : maxValue.toFixed(2)) || ''"
    >
      <!--чтобы можно было сделать псевдоэлемент, overflow скрывает-->
      <button
        class="chart__show-zero"
        :class="{ 'chart__show-zero_border': !hideZerosInChart }"
        @click="changeHideZeroInChart"
        title="Изменить видимость нулевых результатов"
      >
        0
        <span class="cross-line" v-show="hideZerosInChart"></span>
      </button>
      <div class="chart" @pointerleave="seenValue = false">
        <svg class="chart__svg">
          <rect
            class="chart__line"
            v-for="(valueObj, index) of hideZerosInChart
              ? chartDataInIntervalWithoutZero
              : chartDataInInterval"
            :key="index + props.parameterName + valueObj.date"
            :height="
              String(
                calculateLineHeight(chartHeight, maxValue, valueObj.value)
              ) + '%'
            "
            :x="String((calculateX(index, lineWidth) / chartWidth) * 100) + '%'"
            :y="
              String(
                (calculateY(chartHeight, maxValue, valueObj.value) /
                  chartHeight) *
                  100
              ) + '%'
            "
            @pointerover="
              showValue(valueObj.date, valueObj.value, valueObj.count)
            "
            @pointerleave="hideValues"
          ></rect>
        </svg>
      </div>
      <div class="chart-box__info" v-show="seenValue">
        <p>
          {{ scoreParameterName }}:
          {{ scoreValue % 1 === 0 ? scoreValue : scoreValue?.toFixed(2) }}
        </p>
        <p>{{ countParameterName }}: {{ countValue }}</p>
        <p>дата: {{ dateValue }}</p>
      </div>
    </div>
    <DateInterval
      :minDate="formattedDate(props.chartData[0].date)"
      :maxDate="formattedDate(props.chartData.at(-1).date)"
      :globalRangeDate="props.globalRangeDate"
      @updateDates="updateDates"
    />
  </div>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.chart-box {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: calc(var(--base) * 0.64) calc(var(--base) * 0.56)
    calc(var(--base) * 0.32) calc(var(--base) * 0.56);

  &__info {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    padding: calc(var(--base) * 0.08);
    transform: translateY(calc(100% + calc(var(--base) * 0.04)));
    background-color: #dadada;
  }
}

.chart-wrapper {
  &::before {
    content: attr(data-max) ' \2014';
    position: absolute;
    top: calc(var(--base) * 0.32);
    left: 0;
    transform: translate(-100%, calc(-50% + calc(var(--base) * 0.02)));
    @include fonts.Advent($size: calc(var(--base) * 0.16));
  }

  &::after {
    content: '0';
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateX(calc(-100% - calc(var(--base) * 0.04)));
    @include fonts.Advent($size: calc(var(--base) * 0.16));
  }
}

.chart {
  width: calc(var(--base) * 3);
  padding-right: calc(var(--base) * 0.32);
  padding-top: calc(var(--base) * 0.32);
  border-bottom: 0.15em solid black;
  border-left: 0.15em solid black;
  overflow-x: scroll;
  line-height: 0;
  background-color: #dadada;
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

  &__show-zero {
    position: absolute;
    right: calc(var(--base) * 0.04);
    top: calc(var(--base) * 0.04);
    z-index: 2;
    width: calc(var(--base) * 0.16);
    height: calc(var(--base) * 0.16);
    display: flex;
    align-items: center;
    justify-content: center;
    border: calc(var(--base) * 0.01) solid transparent;
    border-radius: 50%;
    cursor: pointer;
    @include fonts.Advent($size: calc(var(--base) * 0.16));
    line-height: calc(var(--base) * 0.16);
    text-align: center;
    background-color: transparent;

    &_border {
      border-left-color: black;
      border-bottom-color: black;
    }

    &:focus-visible {
      font-weight: 700;
    }

    &:active {
      box-shadow: 0px 5px 5px gray;
    }
  }

  &__svg {
    width: calc(var(--base) * v-bind(chartWidth) / 100);
    height: calc(var(--base) * v-bind(chartHeight) / 100);
  }

  &__line {
    width: calc(var(--base) * v-bind(lineWidth) / 100);
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

.cross-line {
  position: absolute;
  left: calc(var(--base) * -0.02);
  top: 46%;
  width: calc(var(--base) * 0.17);
  transform: rotate(-45deg);
  border-bottom: calc(var(--base) * 0.01) solid black;
}
</style>
