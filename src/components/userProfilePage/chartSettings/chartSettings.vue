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
  <button
    class="charts__settings-button settings-button"
    @click="openChartSettings"
  >
    <img
      src="/src/assets/images/settings.svg"
      alt="settings"
      class="icon-32"
      title="настройка отображения графиков"
    />
  </button>
  <div
    v-if="chartsSettingsVisibility"
    class="charts__settings settings"
    @keyup.esc="closeChartSettings"
  >
    <button
      class="charts__settings-button settings-button"
      @click="closeChartSettings"
    >
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
  right: calc(var(--base) * 0.04);
  top: calc(var(--base) * 0.04);
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
  gap: calc(var(--base) * 0.48);
  max-width: 100%;
  padding: calc(var(--base) * 0.16) calc(var(--base) * 0.32);
  border-radius: calc(var(--base) * 0.16);
  opacity: 95%;
  background-color: #cfcece;
}

.settings__header {
  margin-bottom: calc(var(--base) * 0.16);
  font-size: calc(var(--base) * 0.24);
  text-align: center;
}
</style>
