import { ref, computed } from 'vue';

export const useClue = (header, parameterNumber) => {
  const clueSeen = ref(false);
  const clueMessage = computed(() => {
    if (header.value === 'Вход') {
      if (parameterNumber.value === 1)
        return 'Email должен соответствовать следующему шаблону: example@example.com';
      if (parameterNumber.value === 2)
        return 'Пароль должен состоять из не менее чем 8 символов, содержащих латинские буквы в верхнем и нижнем регистре, цифры и спецсимволы';
    }
    if (header.value === 'Регистрация') {
      if (parameterNumber.value === 1) return 'Поле должно быть заполнено';
      if (parameterNumber.value === 2)
        return 'Email должен соответствовать следующему шаблону: example@example.com';
      if (parameterNumber.value === 3)
        return 'Пароль должен состоять из не менее чем 8 символов, содержащих латинские буквы в верхнем и нижнем регистре, цифры и спецсимволы';
      if (parameterNumber.value === 4)
        return 'Значение должно соответстовать значению, введенному в поле "Пароль"';
    }
    return 'Поле должно быть заполнено';
  });

  const showClue = (event) => {
    clueSeen.value = true;
    if (event) event.currentTarget.previousSibling.focus();
  };

  const closeClue = () => (clueSeen.value = false);

  return { clueSeen, clueMessage, showClue, closeClue };
};
