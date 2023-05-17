<script setup>
import { ref, onActivated } from 'vue';

const emit = defineEmits(['updateParameter']);

const emailInput = ref(null);
onActivated(() => {
  emailInput.value.focus();
});

const email = ref('');
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const isCorrectEmail = ref(false);
const emailValidation = () => {
  isCorrectEmail.value = false;
  if (regexEmail.test(email.value)) isCorrectEmail.value = true;
};
const updateEmail = () => {
  emailValidation();
  emit('updateParameter', 'email', isCorrectEmail.value ? email.value : '');
};
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
