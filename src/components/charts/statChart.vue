<script setup>
import { ref, computed } from 'vue';
import {
  translateName,
  formattedDate,
  isDateInInterval,
  calculateLineHeight,
  calculateX,
  calculateY,
  calculateLineWidth,
  startDateValidate,
  endDateValidate,
  dateIntervalValidate,
  defineCountParameterName,
  defineScoreParameterName
} from './helpers';

const props = defineProps({
  parameterName: String,
  chartData: Array
});

const name = translateName(props.parameterName);
const minDate = formattedDate(props.chartData[0].date);
const maxDate = formattedDate(props.chartData.at(-1).date);
const startDate = ref(minDate);
const endDate = ref(maxDate);
const correctStartDate = ref(minDate);
const correctEndDate = ref(maxDate);
const chartDataInInterval = computed(() =>
  props.chartData.filter((val) =>
    isDateInInterval(
      formattedDate(val.date),
      correctStartDate.value,
      correctEndDate.value
    )
  )
);
const hideZerosInChart = ref(true);
const chartDataInIntervalWithoutZero = computed(() =>
  chartDataInInterval.value.filter((val) => val.value > 0)
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
  Math.max(
    ...chartDataInInterval.value.map((parameterValue) => parameterValue.value)
  )
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

const dateValidate = () => {
  startDateValidate(startDate, minDate, maxDate);
  endDateValidate(endDate, minDate, maxDate);
  dateIntervalValidate(startDate, endDate, minDate, maxDate);
};

const changeDateInterval = () => {
  dateValidate();
  correctStartDate.value = startDate.value;
  correctEndDate.value = endDate.value;
};
</script>

<template>
  <div class="chart-box">
    <h4 class="chart-box__head">{{ name }}</h4>
    <div class="chart-wrapper" :data-max="maxValue.toFixed(2) || ''">
      <!--чтобы можно было сделать псевдоэлемент, overflow скрывает-->
      <button
        class="chart__show-zero"
        :class="{ 'chart__show-zero_border': !hideZerosInChart }"
        @click="hideZerosInChart = !hideZerosInChart"
        title="Изменить видимость нулевых результатов"
      >
        0
        <span class="cross-line" v-show="hideZerosInChart"></span>
      </button>
      <div class="chart" @pointerleave="seenValue = false">
        <svg class="chart__svg" :width="chartWidth" :height="chartHeight">
          <rect
            class="chart__line"
            v-for="(valueObj, index) of hideZerosInChart
              ? chartDataInIntervalWithoutZero
              : chartDataInInterval"
            :key="index + props.parameterName + valueObj.date"
            :width="lineWidth"
            :height="calculateLineHeight(chartHeight, maxValue, valueObj.value)"
            :x="calculateX(index, lineWidth)"
            :y="calculateY(chartHeight, maxValue, valueObj.value)"
            @pointerover="
              showValue(valueObj.date, valueObj.value, valueObj.count)
            "
            @pointerleave="hideValues"
          ></rect>
        </svg>
      </div>
      <div class="chart-box__info" v-show="seenValue">
        <p>{{ scoreParameterName }}: {{ scoreValue?.toFixed(2) }}</p>
        <p>{{ countParameterName }}: {{ countValue }}</p>
        <p>дата: {{ dateValue }}</p>
      </div>
    </div>
    <div class="date-interval">
      <label class="date-interval__from date-interval_margin-right">
        <h6 class="date-interval__header">с</h6>
        <input
          class="date-interval__value"
          type="date"
          v-model="startDate"
          :min="minDate"
          :max="maxDate"
          @blur="changeDateInterval"
          @keypress.enter="$event.currentTarget.blur()"
        />
      </label>
      <label class="date-interval__to">
        <h6 class="date-interval__header">по</h6>
        <input
          class="date-interval__value"
          type="date"
          v-model="endDate"
          :min="minDate"
          :max="maxDate"
          @blur="changeDateInterval"
          @keypress.enter="$event.currentTarget.blur()"
        />
      </label>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.chart-box {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 64px 56px 32px 56px;

  &__info {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    padding: 8px;
    transform: translateY(calc(100% + 4px));
    background-color: #dadada;
  }
}

.chart-wrapper {
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

.chart {
  width: 300px;
  padding-right: 32px;
  padding-top: 32px;
  border-bottom: 3px solid black;
  border-left: 3px solid black;
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
    right: 4px;
    top: 4px;
    z-index: 2;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    border-radius: 50%;
    cursor: pointer;
    @include fonts.Advent($size: 16px);
    line-height: 16px;
    text-align: center;
    background-color: transparent;

    &_border {
      border-left-color: black;
      border-bottom-color: black;
    }
  
    &:focus {
      font-weight: 700;
    }
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

.cross-line {
  position: absolute;
  left: -2px;
  top: 46%;
  width: 17px;
  transform: rotate(-45deg);
  border-bottom: 1px solid black;
}

.date-interval {
  display: flex;
  margin-top: 4px;

  &__header {
    text-align: center;
  }

  &__from,
  &__to {
    display: flex;
    flex-direction: column;
  }

  &_margin-right {
    margin-right: 16px;
  }
}
</style>
