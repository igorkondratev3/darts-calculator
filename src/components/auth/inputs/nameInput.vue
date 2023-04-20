<script setup>
import { ref, onActivated } from 'vue';
defineEmits(['updateParameter']);
const name = ref('');
const nameInput = ref(null);
onActivated(() => {
  nameInput.value.focus();
});
</script>

<template>
  <input
    type="text"
    class="auth__input"
    :class="{
      'auth__input_border-valid': name
    }"
    placeholder="Имя"
    maxlength="30"
    required
    data-type="name"
    ref="nameInput"
    v-model="name"
    @input="$emit('updateParameter', 'name', name)"
  />
</template>

<style lang="scss"></style>
