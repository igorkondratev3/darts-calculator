<script setup>
import { ref, onActivated } from 'vue';
const props = defineProps({
  password: String
})
const emits = defineEmits(['updateParameter']);
const repeatPassword = ref('');
const isCorrectRepeatPassword = ref(false);
const repeatPasswordValidation = () => {
  isCorrectRepeatPassword.value = false;
  if (repeatPassword.value && repeatPassword.value === props.password)
    isCorrectRepeatPassword.value = true;
};
const handleInput = () => {
  repeatPasswordValidation();
  emits(
    'updateParameter',
    'repeatPassword',
    isCorrectRepeatPassword.value ? repeatPassword.value : ''
  );
};

const repeatPasswordInput = ref(null);

onActivated(() => {
  repeatPasswordInput.value.focus();
});
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
    @input="handleInput"
    autocomplete="off"
  />
</template>

<style></style>
