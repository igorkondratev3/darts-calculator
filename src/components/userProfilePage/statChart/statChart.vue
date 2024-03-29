<script setup>
import { toRef } from 'vue';
import DateInterval from '../dateInterval/dateInterval.vue';
import { useChartDataInRange } from './composables/chartDataInRange.js';
import { useVisibilityOfZerosInChart } from './composables/visibilityOfZeroInChart.js';
import { useChartSize } from './composables/chartSize.js';
import { useChartParameterInfo } from './composables/chartParameterInfo.js';
import { translateName, formattedDate } from '../helpers.js';
import { calculateLineHeight, calculateX, calculateY } from './helpers.js';

const props = defineProps({
  chartName: String,
  chartData: Array,
  globalVisibilityOfZeroValues: Boolean,
  globalRangeDate: Object
});

const chartDataWithoutZero = props.chartData.filter((val) => val.value > 0);
const chartNameRU = translateName(props.chartName);
const {
  chartDataInInterval,
  chartDataInIntervalWithoutZero,
  maxValue,
  updateDates
} = useChartDataInRange(props.chartData);
const { hideZerosInChart, changeHideZerosInChart } =
  useVisibilityOfZerosInChart(toRef(props, 'globalVisibilityOfZeroValues'));
const { chartWidth, chartHeight, lineWidth } =
  useChartSize(chartDataInInterval);
const { chartWidth: chartWidthWithoutZero, lineWidth: lineWidthWithoutZero } =
  useChartSize(chartDataInIntervalWithoutZero);

const {
  parameterInfo,
  parameterInfoVisivility,
  showParameterInfo,
  hideParameterInfo
} = useChartParameterInfo(chartNameRU);
</script>

<template>
  <div class="chart-box">
    <h4 class="chart-box__head">{{ chartNameRU }}</h4>
    <div
      class="chart-wrapper"
      :data-max="(maxValue % 1 === 0 ? maxValue : maxValue.toFixed(2)) || ''"
    >
      <!--чтобы можно было сделать псевдоэлемент, overflow скрывает-->
      <button
        class="chart__show-zero"
        :class="{ 'chart__show-zero_border': !hideZerosInChart }"
        @click="changeHideZerosInChart"
        title="Изменить видимость нулевых результатов"
      >
        0
        <span class="cross-line" v-show="hideZerosInChart"></span>
      </button>
      <div class="chart" @pointerleave="hideParameterInfo">
        <svg
          :class="{
            chart__svg: !hideZerosInChart,
            'chart__svg-without-zero': hideZerosInChart
          }"
        >
          <rect
            class="chart__line"
            :class="{ 'chart__line_without-zero': hideZerosInChart }"
            v-for="(valueObj, index) of hideZerosInChart
              ? chartDataInIntervalWithoutZero
              : chartDataInInterval"
            :key="index + props.chartName + valueObj.date"
            :height="
              String(
                calculateLineHeight(chartHeight, maxValue, valueObj.value)
              ) + '%'
            "
            :x="
              hideZerosInChart
                ? String(
                    (calculateX(index, lineWidthWithoutZero) /
                      chartWidthWithoutZero) *
                      100
                  ) + '%'
                : String((calculateX(index, lineWidth) / chartWidth) * 100) +
                  '%'
            "
            :y="
              String(
                (calculateY(chartHeight, maxValue, valueObj.value) /
                  chartHeight) *
                  100
              ) + '%'
            "
            @pointerover="
              showParameterInfo(valueObj.date, valueObj.value, valueObj.count)
            "
            @pointerleave="parameterInfo.resetInfo()"
          ></rect>
        </svg>
      </div>
      <div class="chart-box__info" v-show="parameterInfoVisivility">
        <p>
          {{ parameterInfo.scoreParameterName }}:
          {{
            parameterInfo.score.value % 1 === 0
              ? parameterInfo.score.value
              : parameterInfo.score.value?.toFixed(2)
          }}
        </p>
        <p>
          {{ parameterInfo.countParameterName }}:
          {{ parameterInfo.count.value }}
        </p>
        <p>дата: {{ parameterInfo.date.value }}</p>
      </div>
    </div>
    <DateInterval
      :minDate="
        formattedDate(
          hideZerosInChart && chartDataWithoutZero[0]
            ? chartDataWithoutZero[0].date
            : props.chartData[0].date
        )
      "
      :maxDate="
        formattedDate(
          hideZerosInChart && chartDataWithoutZero[0]
            ? chartDataWithoutZero.at(-1).date
            : props.chartData.at(-1).date
        )
      "
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
      box-shadow: 0px calc(var(--base) * 0.05) calc(var(--base) * 0.05) gray;
    }
  }

  &__svg {
    width: calc(var(--base) * v-bind(chartWidth) / 100);
    height: calc(var(--base) * v-bind(chartHeight) / 100);
  }

  &__svg-without-zero {
    width: calc(var(--base) * v-bind(chartWidthWithoutZero) / 100);
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

    &_without-zero {
      width: calc(var(--base) * v-bind(lineWidthWithoutZero) / 100);
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
