import { computed, unref } from 'vue';

export const useNavigation = (authType, authInformation) => {
  const lineWidth = computed(() => (unref(authType) === 'Вход' ? 120 : 40));
  const numberOfButtons = computed(() => (unref(authType) === 'Вход' ? 2 : 4));
  const isCompleted = computed(() => [
    (unref(authType) === 'Вход' && authInformation.email.value) ||
      (unref(authType) === 'Регистрация' && authInformation.name.value),
    (unref(authType) === 'Вход' && authInformation.password.value) ||
      (unref(authType) === 'Регистрация' && authInformation.email.value),
    authInformation.password.value,
    authInformation.repeatPassword.value
  ]);

  return { lineWidth, numberOfButtons, isCompleted };
};
