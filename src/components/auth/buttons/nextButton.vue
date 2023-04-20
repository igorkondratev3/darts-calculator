<script setup>
defineProps({
  isEnabled: Boolean
});
defineEmits(['goToNextParameter']);
</script>

<template>
  <button
    class="auth__next-button"
    :class="{
      'auth__next-button_disabled': !isEnabled
    }"
    :disabled="!isEnabled"
    @click="$emit('goToNextParameter')"
  >
    Далее
  </button>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';
.auth__next-button {
  width: 128px;
  height: 56px;
  margin-top: 32px;
  border: none;
  border-radius: 6px;
  @include fonts.Advent;
  cursor: pointer;
  background-color: #55b2f0;

  &_disabled {
    opacity: 40%;
  }
}
</style>
