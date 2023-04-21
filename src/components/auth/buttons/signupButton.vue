<script setup>
import { ref } from 'vue';
import { useUsersStore } from '@/stores/users';
const props = defineProps({
  isEnabled: Boolean,
  authInformation: Object,
  player: String
});
const usersStore = useUsersStore();
const emits = defineEmits(['changeErrorMessage'])
const startSignup = ref(false);
const signup = async () => {
  startSignup.value = true;
  emits('changeErrorMessage', '')
  let response;
  let json;
  try {
    response = await fetch(
      `${import.meta.env.VITE_BACKEND_URI}/user/signup`,
      {
        method: "POST",
        body: JSON.stringify({
          name: props.authInformation.name.value,
          email: props.authInformation.email.value,
          password: props.authInformation.password.value
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    json = await response.json();
  } catch (error) {
    console.log(error);
    emits("changeErrorMessage", "Ошибка доступа к серверу");
    startSignup.value = false;
    return;
  }
  if (response.ok) {
    usersStore.login(props.player, json);
    localStorage.setItem(`user${props.player}`, JSON.stringify(json));
    startSignup.value = false;
    emits('closeAuthComp');
  }

  if (!response.ok) {
    emits("changeErrorMessage", json.error);
    startSignup.value = false;
  }
};

</script>

<template>
  <button
    class="auth__button"
    :class="{
      'auth__button_disabled': !isEnabled || startSignup
    }"
    :disabled="!isEnabled || startSignup"
    @click="signup"
  >
    Регистрация
  </button>
</template>

<style lang="scss"></style>
