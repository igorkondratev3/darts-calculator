<script setup>
defineProps({
  globalVisibilityOfZeroValues: Boolean
});
defineEmits(['update:globalVisibilityOfZeroValues']);
</script>

<template>
  <div class="settings__zero-seen">
    <h3 class="settings__header">Отображать нулевые<br />значения</h3>
    <input
      type="checkbox"
      :checked="globalVisibilityOfZeroValues"
      @change="
        $emit(
          'update:globalVisibilityOfZeroValues',
          $event.currentTarget.checked
        )
      "
      @keyup.enter="
        $emit(
          'update:globalVisibilityOfZeroValues',
          !$event.currentTarget.checked
        )
      "
    />
  </div>
</template>

<style>
/*settings__header в родителе*/

.settings__zero-seen {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
