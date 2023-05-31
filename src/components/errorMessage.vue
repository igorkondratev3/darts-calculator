<script setup>
defineProps({
  message: String
});
</script>

<template>
  <div class="error">
    {{ message }}
  </div>
</template>

<style lang="scss">
.error {
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: calc(var(--base) * 0.74);
  transform: translateY(calc(100% + calc(var(--base) * 0.04)));
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: calc(var(--base) * 0.08);
  border-radius: calc(var(--base) * 0.08);
  background-color: rgb(235, 94, 94);
}
</style>
