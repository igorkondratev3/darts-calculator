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
  margin-top: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
  background-color: rgb(235, 94, 94);
}
</style>
