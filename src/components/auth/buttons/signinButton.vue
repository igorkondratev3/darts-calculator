<script setup>
import { ref } from 'vue';
import { useUsersStore } from '@/stores/users';
const props = defineProps({
  isEnabled: Boolean,
  authInformation: Object,
  player: String
});
const usersStore = useUsersStore();
const emits = defineEmits(['changeErrorMessage', 'closeAuthComp'])
const startSignin = ref(false);
const signin = async () => {
  startSignin.value = true;
  emits('changeErrorMessage', '')
  let response;
  let json;
  try {
    response = await fetch(
      `${import.meta.env.VITE_BACKEND_URI}/user/signin`,
      {
        method: "POST",
        body: JSON.stringify({
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
    startSignin.value = false;
    return;
  }
  if (response.ok) {
    usersStore.login(props.player, json);
    localStorage.setItem(`user${props.player}`, JSON.stringify(json));
    startSignin.value = false;
    emits('closeAuthComp');
  }

  if (!response.ok) {
    emits("changeErrorMessage", json.error);
    startSignin.value = false;
  }
};
</script>

<template>
  <button
    class="auth__button"
    :class="{
      'auth__button_disabled': !isEnabled || startSignin
    }"
    :disabled="!isEnabled || startSignin"
    @click="signin"
  >
    Вход
  </button>
</template>

<style lang="scss"></style>
