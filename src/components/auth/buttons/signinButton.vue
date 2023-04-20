<script setup>
import { ref } from 'vue';
const props = defineProps({
  isEnabled: Boolean,
  authInformation: Object
});
const emit = defineEmits(['changeErrorMessage'])
const startnSignin = ref(false);
const signin = async () => {
  startnSignin.value = true;
  emit('changeErrorMessage', '')
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
    emit("changeErrorMessage", "Ошибка доступа к серверу");
    startnSignin.value = false;
    return;
  }
  if (response.ok) {
    console.log(json)
    /*AutorizatonStore.user.userName = json.firstName;
    AutorizatonStore.user.lastName = json.lastName;
    AutorizatonStore.user.city = json.city;
    AutorizatonStore.user.email = json.email;
    AutorizatonStore.autorization = true;
    router.push("/");*/
  }

  if (!response.ok) {
    emit("changeErrorMessage", json.error);
    startnSignin.value = true;
  }
};
</script>

<template>
  <button
    class="auth__button"
    :class="{
      'auth__button_disabled': !isEnabled || startnSignin
    }"
    :disabled="!isEnabled || startnSignin"
    @click="signin"
  >
    Вход
  </button>
</template>

<style lang="scss"></style>
