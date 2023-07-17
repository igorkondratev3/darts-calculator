<script setup>
import { ref, toRef } from 'vue';
import { useRepeatPassword } from './composables.js';

const props = defineProps({
  password: String
});
const emits = defineEmits(['updateParameter']);

const repeatPasswordInput = ref(null);
const { repeatPassword, isCorrectRepeatPassword, updateRepeatPassword } =
  useRepeatPassword(repeatPasswordInput, toRef(props, 'password'), emits);
</script>

<template>
  <input
    type="password"
    class="auth__input"
    :class="{
      'auth__input_border-invalid': !isCorrectRepeatPassword && repeatPassword,
      'auth__input_border-valid': isCorrectRepeatPassword
    }"
    placeholder="Повторите пароль"
    maxlength="80"
    required
    ref="repeatPasswordInput"
    data-type="repeatPassword"
    v-model="repeatPassword"
    @input="updateRepeatPassword"
    autocomplete="off"
  />
</template>

<style>
/*стили в рожительском компоненте*/
</style>
