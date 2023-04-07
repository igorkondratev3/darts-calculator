<script setup>
defineProps({
  parameterVisibility: Boolean,
  parameterGroup: String,
  areSetsInGame: Boolean
});
defineEmits(['update:parameterVisibility']);
</script>

<template>
  <label class="statistic__values statistic-values">
    <h6
      class="statistic__value-header"
      v-if="areSetsInGame || parameterName !== 'матч'"
    >
      {{ parameterGroup }}
    </h6>
    <input
      type="checkbox"
      class="statistic-values__visibility"
      :checked="parameterVisibility"
      @change="$emit('update:parameterVisibility', $event.target.checked)"
      v-bind="$attrs"
    />
  </label>
</template>

<style></style>
