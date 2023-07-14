<script setup>
import ZeroVisibility from './components/zeroVisibility.vue';
import DateSetting from './components/dateSetting.vue';
import ChartVisibility from './components/chartVisibility.vue';
import { useChartSettingsVisibility } from './composables/chartSettingsVisibility.js';

defineProps({
  globalVisibilityOfZeroValues: Boolean,
  visibleCharts: Set,
  chartNames: Array,
  minChartDate: String,
  maxChartDate: String
});
defineEmits([
  'update:globalVisibilityOfZeroValues',
  'update:visibleCharts',
  'updateDates'
]);

const { chartsSettingsVisibility, openChartSettings, closeChartSettings } =
  useChartSettingsVisibility();
</script>

<template>
  <button class="charts__settings-button" @click="openChartSettings">
    <img
      src="/src/assets/images/settings.svg"
      alt="settings"
      class="icon-32"
      title="настройка отображения графиков"
    />
  </button>
  <div v-if="chartsSettingsVisibility" class="charts__settings settings">
    <button class="charts__settings-button" @click="closeChartSettings">
      <img
        src="/src/assets/images/close.svg"
        alt="close"
        class="icon-32"
        title="закрыть настройку"
      />
    </button>
    <ZeroVisibility
      :globalVisibilityOfZeroValues="globalVisibilityOfZeroValues"
      @update:globalVisibilityOfZeroValues="
        (checked) => $emit('update:globalVisibilityOfZeroValues', checked)
      "
    />
    <DateSetting
      :minDate="minChartDate"
      :maxDate="maxChartDate"
      @updateDates="
        (newStartDate, newEndDate) =>
          $emit('updateDates', newStartDate, newEndDate)
      "
    />
    <ChartVisibility
      :chartNames="chartNames"
      :visibleCharts="visibleCharts"
      @update:visibleCharts="
        (chartName) => $emit('update:visibleCharts', chartName)
      "
    />
  </div>
</template>

<style lang="scss">
.charts__settings-button {
  position: absolute;
  right: 4px;
  top: 4px;
  align-self: flex-start;
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

.settings__header {
  margin-bottom: 16px;
  font-size: 24px;
  text-align: center;
}
</style>
