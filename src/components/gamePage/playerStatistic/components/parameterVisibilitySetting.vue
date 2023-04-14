<script setup>
defineProps({
  parameterVisibility: Boolean,
  parameterGroup: String,
  seenParametersHeader: Boolean
});
defineEmits(['update:parameterVisibility']);
</script>

<template>
  <label class="statistic__values statistic-values">
    <h6 class="statistic__value-header" v-if="seenParametersHeader">
      {{ parameterGroup
      }}{{
        parameterGroup === '171' ||
        parameterGroup === '131' ||
        parameterGroup === '96'
          ? '+'
          : undefined
      }}
    </h6>
    <input
      type="checkbox"
      class="statistic-values__visibility"
      :checked="parameterVisibility"
      @change="$emit('update:parameterVisibility', $event.target)"
      v-bind="$attrs"
    />
  </label>
</template>

<style></style>
