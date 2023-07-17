<script setup>
import { ref } from 'vue';
import { useEmail } from './composables.js';

const emits = defineEmits(['updateParameter']);

const emailInput = ref(null);
const { email, isCorrectEmail, updateEmail } = useEmail(emailInput, emits);
</script>

<template>
  <input
    type="email"
    class="auth__input"
    :class="{
      'auth__input_border-invalid': !isCorrectEmail && email,
      'auth__input_border-valid': isCorrectEmail
    }"
    placeholder="Email"
    maxlength="320"
    required
    data-type="email"
    ref="emailInput"
    v-model="email"
    @input="updateEmail"
  />
</template>

<style>
/*стили в рожительском компоненте*/
</style>
