<script setup>
import { ref, onActivated } from 'vue';

const emits = defineEmits(['updateParameter']);

const passwordInput = ref(null);
onActivated(() => {
  passwordInput.value.focus();
});

const password = ref('');
const regexPassword =
  /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/;
const isCorrectPassword = ref(false);
const passwordValidation = () => {
  isCorrectPassword.value = false;
  if (regexPassword.test(password.value)) isCorrectPassword.value = true;
};
const updatePassword = () => {
  passwordValidation();
  emits(
    'updateParameter',
    'password',
    isCorrectPassword.value ? password.value : ''
  );
};
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
