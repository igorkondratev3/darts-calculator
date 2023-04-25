<script setup>
import { ref, computed } from 'vue';
import { useUsersStore } from '@/stores/users';
const props = defineProps({
  type: String,
  player: String,
  authInformation: Object
});
const emits = defineEmits(['changeErrorMessage', 'closeAuthComp']);
const usersStore = useUsersStore();
const startAuth = ref(false);

const auth = async () => {
  startAuth.value = true;
  emits('changeErrorMessage', '');
  if (props.type === 'Вход' && chechAuthAsAnotherPlayer()) {
    emits(
      'changeErrorMessage',
      'Вход с данным адресом электронной почты уже произведен'
    );
    startAuth.value = false;
  }
  let user;
  try {
    user = await fetchAuth();
  } catch (error) {
    console.log(error);
    emits('changeErrorMessage', 'Ошибка доступа к серверу');
    startAuth.value = false;
    return;
  }
  if (!Object.hasOwn(user, 'error')) {
    usersStore.login(props.player, user);
    localStorage.setItem(`user${props.player}`, JSON.stringify(user));
    startAuth.value = false;
    emits('closeAuthComp');
  }

  if (Object.hasOwn(user, 'error')) {
    emits('changeErrorMessage', user.error);
    startAuth.value = false;
  }
};

const fetchAuth = async () => {
  const URI = `${import.meta.env.VITE_BACKEND_URI}/user/${
    props.type === 'Вход' ? 'signin' : 'signup'
  }`;
  const fetchParams = {
    method: 'POST',
    body: JSON.stringify({
      name: props.authInformation.name.value,
      email: props.authInformation.email.value,
      password: props.authInformation.password.value
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

const chechAuthAsAnotherPlayer = () => {
  let anotherPlayer = '';
  if (props.player === 'P2') anotherPlayer = 'P1';
  if (props.player === 'P1') anotherPlayer = 'P2';
  if (
    usersStore.users[anotherPlayer]?.email === props.authInformation.email.value
  )
    return true;
  if (
    JSON.parse(localStorage.getItem(`user${anotherPlayer}`))?.email ===
    props.authInformation.email.value
  )
    localStorage.removeItem(`user${anotherPlayer}`);
  return false;
};

const isEnabled = computed(() => {
  if (props.type === 'Вход')
    return Boolean(
      props.authInformation.email.value && props.authInformation.password.value
    );
  if (props.type === 'Регистрация')
    return Boolean(
      props.authInformation.name.value &&
        props.authInformation.email.value &&
        props.authInformation.password.value &&
        props.authInformation.repeatPassword.value
    );
  return false;
});
</script>

<template>
  <button
    class="auth__button"
    :class="{
      auth__button_disabled: !isEnabled || startAuth
    }"
    :disabled="!isEnabled || startAuth"
    @click="auth"
  >
    {{ props.type }}
  </button>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.auth__button {
  width: 160px;
  height: 56px;
  margin-top: 32px;
  border: none;
  border-radius: 6px;
  @include fonts.Advent;
  cursor: pointer;
  background-color: #55b2f0;

  &_disabled {
    opacity: 40%;
  }
  
  &:focus {
    outline: 1px solid black;
    outline-offset: 2px;
  }
}
</style>
