<script setup>
import { ref } from 'vue';
import { usePassword } from './composables.js';

const emits = defineEmits(['updateParameter']);

const passwordInput = ref(null);
const { password, isCorrectPassword, updatePassword } = usePassword(
  passwordInput,
  emits
);
</script>

<template>
  <input
    type="password"
    class="auth__input"
    :class="{
      'auth__input_border-invalid': !isCorrectPassword && password,
      'auth__input_border-valid': isCorrectPassword
    }"
    placeholder="Пароль"
    maxlength="80"
    required
    ref="passwordInput"
    data-type="password"
    v-model="password"
    @input="updatePassword"
    autocomplete="off"
  />
</template>

<style>
/*стили в рожительском компоненте*/
</style>
