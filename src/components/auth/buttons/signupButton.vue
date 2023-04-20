<script setup>
import { ref } from 'vue';
const props = defineProps({
  isEnabled: Boolean,
  authInformation: Object
});
const emit = defineEmits(['changeErrorMessage'])
const startnSignup = ref(false);
const signup = async () => {
  startnSignup.value = true;
  emit('changeErrorMessage', '')
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
    emit("changeErrorMessage", "Ошибка доступа к серверу");
    startnSignup.value = false;
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
    startnSignup.value = true;
  }
};

</script>

<template>
  <button
    class="auth__button"
    :class="{
      'auth__button_disabled': !isEnabled || startnSignup
    }"
    :disabled="!isEnabled || startnSignup"
    @click="signup"
  >
    Регистрация
  </button>
</template>

<style lang="scss"></style>
