<script setup>
import { translateName } from '../../helpers.js';
defineProps({
  visibleCharts: Set,
  chartNames: Array
});
defineEmits(['update:visibleCharts']);
</script>

<template>
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
</template>

<style>
/*settings__header  родителе*/

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
  /*связано с шириной блока родителя*/
  width: 270px;
}
</style>
