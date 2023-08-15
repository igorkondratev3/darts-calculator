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
  font-size: calc(var(--base) * 0.16);
  width: calc(var(--base) * 1.05);

  &_right {
    position: absolute;
    top: calc(var(--base) * 0.04);
    right: calc(var(--base) * 0.04);
    z-index: 2;
    transform: translateY(calc(100% + calc(var(--base) * 0.08)));
  }
}
</style>
