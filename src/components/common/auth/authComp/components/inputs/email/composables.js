import { ref, onActivated } from 'vue';

export const useEmail = (emailInput, emits) => {
  const email = ref('');
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isCorrectEmail = ref(false);

  const emailValidation = () => {
    isCorrectEmail.value = false;
    if (regexEmail.test(email.value)) isCorrectEmail.value = true;
  };

  const updateEmail = () => {
    emailValidation();
    emits('updateParameter', 'email', isCorrectEmail.value ? email.value : '');
  };

  onActivated(() => {
    emailInput.value.focus();
  });

  return { email, isCorrectEmail, updateEmail };
};
