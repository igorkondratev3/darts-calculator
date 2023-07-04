<script setup>
defineProps({
  isSeen: Boolean
});
</script>

<template>
  <img
    class="starter-flag"
    src="/src/assets/images/flag.svg"
    alt="flag"
    v-show="isSeen"
    title="начинал лег"
  />
</template>

<style>
.starter-flag {
  display: block;
  width: calc(var(--base) * 0.24);
  height: calc(var(--base) * 0.24);
  margin-top: calc(var(--base) * 0.05);
  align-self: center;
  /*исправить два последних свойства если буду где-то еще исопльзовать*/
}
</style>
