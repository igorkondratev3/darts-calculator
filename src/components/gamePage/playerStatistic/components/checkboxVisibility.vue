<script setup>
defineProps({
  parameterVisibility: Boolean, 
  parameterName: String
});
defineEmits(['update:parameterVisibility'])
</script>

<template>
  <label class="statistic__values statistic-values">
    {{ parameterName }}<br />
    <input
      type="checkbox"
      class="statistic-values__visibility"
      :checked="parameterVisibility"
      @change="$emit('update:parameterVisibility', $event.target.checked)"
    />
  </label>
</template>

<style lang="scss">
.statistic-values__visibility {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  outline: none;
  border: 1px solid black;
  border-radius: 4px;
  background: rgb(232, 238, 233);
  transition: background 0.3s linear, border 0.3s linear;

  &:checked {
    background: rgb(66, 63, 63) url('/src/assets/images/check.svg');
  }

  &:focus {
    border: 1px solid white;
  }
}
</style>
