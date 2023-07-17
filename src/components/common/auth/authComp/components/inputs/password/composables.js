import { ref, onActivated } from 'vue';

export const usePassword = (passwordInput, emits) => {
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

  onActivated(() => {
    passwordInput.value.focus();
  });

  return { password, isCorrectPassword, updatePassword };
};
