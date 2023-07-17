import { ref, unref, onActivated } from 'vue';

export const useRepeatPassword = (repeatPasswordInput, password, emits) => {
  const repeatPassword = ref('');
  const isCorrectRepeatPassword = ref(false);

  const repeatPasswordValidation = () => {
    isCorrectRepeatPassword.value = false;
    if (repeatPassword.value && repeatPassword.value === unref(password))
      isCorrectRepeatPassword.value = true;
  };

  const updateRepeatPassword = () => {
    repeatPasswordValidation();
    emits(
      'updateParameter',
      'repeatPassword',
      isCorrectRepeatPassword.value ? repeatPassword.value : ''
    );
  };

  onActivated(() => {
    repeatPasswordInput.value.focus();
  });

  return { repeatPassword, isCorrectRepeatPassword, updateRepeatPassword };
};
