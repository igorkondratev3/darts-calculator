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
    <div
      class="chart-wrapper"
      :data-max="(maxValue % 1 === 0 ? maxValue : maxValue.toFixed(2)) || ''"
    >
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

.date-interval {
  display: flex;
  margin-top: calc(var(--base) * 0.04);

  &__value {
    width: calc(var(--base) * 1.2);
    height: calc(var(--base) * 0.24);
    font: inherit;
    font-size: calc(var(--base) * 0.18);
  }

  &__header {
    text-align: center;
  }

  &__from,
  &__to {
    display: flex;
    flex-direction: column;
  }

  &_margin-right {
    margin-right: calc(var(--base) * 0.16);
  }
}
</style>
