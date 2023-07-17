import { ref, unref, computed } from 'vue';

export const useAuthButton = (
  type,
  player,
  authInformation,
  usersStore,
  emits
) => {
  const isEnabled = computed(() => {
    if (unref(type) === 'Вход')
      return Boolean(
        authInformation.email.value && authInformation.password.value
      );
    if (unref(type) === 'Регистрация')
      return Boolean(
        authInformation.name.value &&
          authInformation.email.value &&
          authInformation.password.value &&
          authInformation.repeatPassword.value
      );
    return false;
  });

  const startAuth = ref(false);

  const auth = async () => {
    startAuth.value = true;
    emits('changeErrorMessage', '');
    if (
      unref(type) === 'Вход' &&
      chechAuthAsAnotherPlayer(player, authInformation, usersStore)
    ) {
      emits(
        'changeErrorMessage',
        'Вход с данным адресом электронной почты уже произведен'
      );
      startAuth.value = false;
      return;
    }
    let user;
    try {
      user = await fetchAuth(unref(type), authInformation);
    } catch (error) {
      console.error(error);
      emits('changeErrorMessage', 'Ошибка доступа к серверу');
      startAuth.value = false;
      return;
    }

    if (!Object.hasOwn(user, 'error')) {
      usersStore.login(player, user);
      localStorage.setItem(`user${player}`, JSON.stringify(user));
      startAuth.value = false;
      emits('closeAuthComp');
    }

    if (Object.hasOwn(user, 'error')) {
      emits('changeErrorMessage', user.error);
      startAuth.value = false;
    }
  };

  return { isEnabled, startAuth, auth };
};

const fetchAuth = async (type, authInformation) => {
  const URI = `${import.meta.env.VITE_BACKEND_URI}/user/${
    type === 'Вход' ? 'signin' : 'signup'
  }`;
  const fetchParams = {
    method: 'POST',
    body: JSON.stringify({
      name: authInformation.name.value,
      email: authInformation.email.value,
      password: authInformation.password.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await fetch(URI, fetchParams);
  const json = await response.json();
  if (!response.ok && !Object.hasOwn(json, 'error'))
    return { error: 'Неизвестная ошибка' };
  return json;
};

const chechAuthAsAnotherPlayer = (player, authInformation, usersStore) => {
  let anotherPlayer = '';
  if (player === 'P2') anotherPlayer = 'P1';
  if (player === 'P1') anotherPlayer = 'P2';
  if (usersStore.users[anotherPlayer]?.email === authInformation.email.value)
    return true;
  if (
    JSON.parse(localStorage.getItem(`user${anotherPlayer}`))?.email ===
    authInformation.email.value
  )
    localStorage.removeItem(`user${anotherPlayer}`);
  return false;
};
