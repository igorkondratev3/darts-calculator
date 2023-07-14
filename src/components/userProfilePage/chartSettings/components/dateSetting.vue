<script setup>
import { ref } from 'vue';
import DateInterval from '../../dateInterval/dateInterval.vue';
import { formattedDate } from '../../helpers.js';

defineProps({
  minDate: String,
  maxDate: String
});
defineEmits(['updateDates']);
</script>

<template>
  <div class="settings__date">
    <h3 class="settings__header">Интервал дат</h3>
    <DateInterval
      :minDate="formattedDate(minDate)"
      :maxDate="formattedDate(maxDate)"
      :globalRangeDate="ref('Mock data')"
      @updateDates="
        (newStartDate, newEndDate) =>
          $emit('updateDates', newStartDate, newEndDate)
      "
    />
  </div>
</template>

<style>
/*settings__header в родителе*/

.settings__date {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
