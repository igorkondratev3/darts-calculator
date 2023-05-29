<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <RouterLink class="base-button game-button game-button_right" to="/game"
    >к матчу</RouterLink
  >
</template>

<style lang="scss">
.game-button {
  font-size: 16px;
  width: 105px;

  &_right {
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 2;
    transform: translateY(calc(100% + 4px));
  }
}
</style>
