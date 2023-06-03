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
      class="game-setup__parameter-header game-setup__parameter-header_margin_zero is-percent-double__header"
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
.game-setup__is-percent-double {
  margin-top: calc(var(--base) * 0.32);
}

.is-percent-double {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

@media (max-width: 580px) {
  .is-percent-double {
    flex-direction: column;
    &__header {
      order: -1;
    }

    &__value {
      margin-top: calc(var(--base) * 0.08);
    }
  }
}
</style>
