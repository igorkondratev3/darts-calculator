<script setup>
import { ref } from 'vue';
import { useName } from './composables.js';

defineEmits(['updateParameter']);

const nameInput = ref(null);

const name = useName(nameInput);
</script>

<template>
  <input
    type="text"
    class="auth__input"
    :class="{
      'auth__input_border-valid': name
    }"
    placeholder="Имя"
    maxlength="15"
    required
    data-type="name"
    ref="nameInput"
    v-model="name"
    @input="$emit('updateParameter', 'name', name)"
  />
</template>

<style>
/*стили в рожительском компоненте*/
</style>
