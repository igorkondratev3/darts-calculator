<script setup>
import { ref } from 'vue';
import DateInterval from './dateInterval.vue';
import { translateName, formattedDate } from './helpers';

const props = defineProps({
  zeroSeen: Boolean,
  visibleCharts: Set,
  chartNames: Array,
  minDateCharts: String,
  maxDateCharts: String
});
defineEmits(['update:zeroSeen', 'update:visibleCharts', 'updateDates']);

const isSeenSettings = ref(false);
const openSettings = () => (isSeenSettings.value = true);
const closeSettings = () => (isSeenSettings.value = false);
</script>

<template>
  <button class="charts__settings-button" @click="openSettings">
    <img
      src="/src/assets/images/settings.svg"
      alt="settings"
      class="icon-32"
      title="настройка отображения графиков"
    />
  </button>
  <div v-if="isSeenSettings" class="charts__settings settings">
    <button class="charts__settings-button" @click="closeSettings">
      <img
        src="/src/assets/images/close.svg"
        alt="close"
        class="icon-32"
        title="закрыть настройку"
      />
    </button>
    <div class="settings__zero-seen">
      <h3 class="settings__header">Отображать нулевые<br />значения</h3>
      <input
        type="checkbox"
        :checked="zeroSeen"
        @change="$emit('update:zeroSeen', $event.currentTarget.checked)"
        @keyup.enter="$emit('update:zeroSeen', !$event.currentTarget.checked)"
      />
    </div>
    <div class="settings__date settings-date">
      <h3 class="settings__header">Интервал дат</h3>
      <DateInterval
        :minDate="formattedDate(props.minDateCharts)"
        :maxDate="formattedDate(props.maxDateCharts)"
        :globalRangeDate="ref('Mock data')"
        @updateDates="
          (newStartDate, newEndDate) =>
            $emit('updateDates', newStartDate, newEndDate)
        "
      />
    </div>
    <div class="settings__chart-visibility chart-visibility">
      <h3 class="settings__header">Видимость графиков</h3>
      <div class="chart-visibility__values">
        <div
          class="chart-visibility__box-value"
          v-for="chartName of chartNames"
          :key="chartName"
        >
          <label class="chart-visibility__value">
            <input
              type="checkbox"
              :checked="visibleCharts.has(chartName)"
              @change="$emit('update:visibleCharts', chartName)"
              @keyup.enter="$emit('update:visibleCharts', chartName)"
            />
            {{ translateName(chartName) }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.charts__settings-button {
  align-self: flex-start;
  position: absolute;
  right: 4px;
  top: 4px;
  border-radius: 50%;
  transition: background-color 0.2s linear;

  &:focus-visible {
    outline: calc(var(--base) * 0.01) solid black;
    outline-offset: calc(var(--base) * 0.02);
  }

  &:hover {
    background-color: #aca6a6;
  }

  &:active {
    box-shadow: 0px calc(var(--base) * 0.05) calc(var(--base) * 0.05) gray;
  }
}
.icon-32 {
  display: block;
  width: 32px;
  height: 32px;
}

.charts__settings {
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 48px;
  max-width: 100%;
  padding: 16px 32px;
  border-radius: 16px;
  opacity: 95%;
  background-color: #cfcece;
}

.settings__zero-seen {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.settings__header {
  font-size: 24px;
  margin-bottom: 16px;
  text-align: center;
}

.settings__chart-visibility {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-visibility__values {
  display: flex;
  flex-wrap: wrap;
  max-width: 548px;
  gap: 8px;
}

.chart-visibility__box-value {
  //связано с шириной блока родителя
  width: 270px;
}

.settings__date {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
