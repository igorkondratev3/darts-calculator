<script setup>
import { ref, watch } from 'vue';
import {
  startDateValidate,
  endDateValidate,
  dateIntervalValidate
} from './helpers';

const props = defineProps({
  minDate: String,
  maxDate: String,
  globalRangeDate: Object
});

const emits = defineEmits(['updateDates']);

const startDate = ref(props.minDate);
const endDate = ref(props.maxDate);
const correctStartDate = ref(props.minDate);
const correctEndDate = ref(props.maxDate);

const dateValidate = () => {
  startDateValidate(startDate, props.minDate, props.maxDate);
  endDateValidate(endDate, props.minDate, props.maxDate);
  dateIntervalValidate(startDate, endDate, props.minDate, props.maxDate);
};

const changeDateInterval = () => {
  dateValidate();
  correctStartDate.value = startDate.value;
  correctEndDate.value = endDate.value;
  emits('updateDates', correctStartDate.value, correctEndDate.value);
};

watch(props.globalRangeDate, () => {
  startDate.value = props.globalRangeDate.start;
  endDate.value = props.globalRangeDate.end;
  changeDateInterval();
});
</script>

<template>
  <div class="date-interval">
    <label class="date-interval__from date-interval_margin-right">
      <h6 class="date-interval__header">с</h6>
      <input
        class="date-interval__value"
        type="date"
        v-model="startDate"
        :min="props.minDate"
        :max="props.maxDate"
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
        :min="props.minDate"
        :max="props.maxDate"
        @blur="changeDateInterval"
        @keypress.enter="$event.currentTarget.blur()"
      />
    </label>
  </div>
</template>

<style lang="scss">
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
