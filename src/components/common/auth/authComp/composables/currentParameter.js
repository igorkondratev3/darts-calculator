import { ref, computed, defineAsyncComponent } from 'vue';

export const useCurrentParameter = (LoadingInput) => {
  const header = ref('Вход');
  const parameterNumber = ref(1);
  const currentParameter = computed(() => {
    if (header.value === 'Вход') {
      if (parameterNumber.value === 1) return EmailInput;
      if (parameterNumber.value === 2) return PasswordInput;
    }
    if (header.value === 'Регистрация') {
      if (parameterNumber.value === 1) return NameInput;
      if (parameterNumber.value === 2) return EmailInput;
      if (parameterNumber.value === 3) return PasswordInput;
      if (parameterNumber.value === 4) return RepeatPasswordInput;
    }
    return EmailInput;
  });

  const changeHeader = () => {
    if (header.value === 'Вход') header.value = 'Регистрация';
    else header.value = 'Вход';
    changeParameterNumber(1);
  };

  const changeParameterNumber = (newValue) =>
    (parameterNumber.value = newValue);

  const checkParameter = (event, auth, authInformation, showClue) => {
    if (!authInformation[event.currentTarget.dataset.type].value) {
      showClue();
      return;
    }
    if (header.value === 'Вход') {
      if (parameterNumber.value === 1) parameterNumber.value++;
      if (parameterNumber.value === 2)
        auth.children[auth.children.length - 1].focus();
    }
    if (header.value === 'Регистрация') {
      if (parameterNumber.value < 4) parameterNumber.value++;
      if (parameterNumber.value === 4)
        auth.children[auth.children.length - 1].focus();
    }
  };

  const EmailInput = defineAsyncComponent({
    loader: () => import('../components/inputs/email/emailInput.vue'),
    loadingComponent: LoadingInput,
    delay: 0
  });

  const NameInput = defineAsyncComponent({
    loader: () => import('../components/inputs/name/nameInput.vue'),
    loadingComponent: LoadingInput,
    delay: 0
  });
  const RepeatPasswordInput = defineAsyncComponent({
    loader: () =>
      import('../components/inputs/repeatPassword/repeatPasswordInput.vue'),
    loadingComponent: LoadingInput,
    delay: 0
  });

  const PasswordInput = defineAsyncComponent({
    loader: () => import('../components/inputs/password/passwordInput.vue'),
    loadingComponent: LoadingInput,
    delay: 0
  });

  return {
    header,
    parameterNumber,
    currentParameter,
    changeHeader,
    changeParameterNumber,
    checkParameter
  };
};
