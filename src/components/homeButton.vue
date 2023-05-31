<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <RouterLink class="base-button home-button home-button_right" to="/"
    >на главную</RouterLink
  >
</template>

<style lang="scss">
.home-button {
  font-size: calc(var(--base) * 0.16);
  width: calc(var(--base) * 1.05);

  &_right {
    position: absolute;
    top: calc(var(--base) * 0.04);
    right: calc(var(--base) * 0.04);
    z-index: 2;
  }
}
</style>
