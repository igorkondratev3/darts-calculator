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
  font-size: 16px;
  width: 105px;

  &_right {
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 2;
  }
}
</style>
