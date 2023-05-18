<script setup>
defineProps({
  isPercentDoubleInStatP1: Boolean,
  isPercentDoubleInStatP2: Boolean
});
defineEmits([
  'update:isPercentDoubleInStatP1',
  'update:isPercentDoubleInStatP2'
]);
</script>

<template>
  <div class="game-setup__is-percent-double is-percent-double">
    <input
      class="is-percent-double__value"
      type="checkbox"
      :checked="isPercentDoubleInStatP1"
      @change="
        $emit('update:isPercentDoubleInStatP1', $event.currentTarget.checked)
      "
      @keyup.enter="
        $emit('update:isPercentDoubleInStatP1', !$event.currentTarget.checked)
      "
    />
    <h3
      class="game-setup__parameter-header game-setup__parameter-header_margin_zero"
    >
      Подсчитывать процент удвоений
    </h3>
    <input
      class="is-percent-double__value"
      type="checkbox"
      :checked="isPercentDoubleInStatP2"
      @change="
        $emit('update:isPercentDoubleInStatP2', $event.currentTarget.checked)
      "
      @keyup.enter="
        $emit('update:isPercentDoubleInStatP2', !$event.currentTarget.checked)
      "
    />
  </div>
</template>

<style lang="scss">
.is-percent-double {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
}
</style>
