<script setup>
import EmailInput from './components/inputs/emailInput.vue';
import LoadingInput from './components/inputs/loadingInput.vue';
import AuthButton from './components/authButton.vue';
import ParameterNavigation from './components/parameterNavigation.vue';
import { ref, computed, defineAsyncComponent } from 'vue';
const NameInput = defineAsyncComponent({
  loader: () => import('./components/inputs/nameInput.vue'),
  loadingComponent: LoadingInput,
  delay: 0
});
const RepeatPasswordInput = defineAsyncComponent({
  loader: () => import('./components/inputs/repeatPasswordInput.vue'),
  loadingComponent: LoadingInput,
  delay: 0
});
const ErrorMessage = defineAsyncComponent({
  loader: () => import('@/components/errorMessage.vue'),
  loadingComponent: LoadingInput,
  delay: 0
});
const PasswordInput = defineAsyncComponent({
  loader: () => import('./components/inputs/passwordInput.vue'),
  loadingComponent: LoadingInput,
  delay: 0
});

const props = defineProps({
  player: String
});
defineEmits(['closeAuthComp']);

const errorMessage = ref('');
const changeErrorMessage = (message) => (errorMessage.value = message);
const parameterNumber = ref(1);
const changeParameterNumber = (newValue) => (parameterNumber.value = newValue);
const header = ref('Вход');
const changeHeader = () => {
  if (header.value === 'Вход') header.value = 'Регистрация';
  else header.value = 'Вход';
  parameterNumber.value = 1;
  errorMessage.value = '';
};
const authInformation = {
  name: ref(''),
  email: ref(''),
  password: ref(''),
  repeatPassword: ref(''),
  updateParameter(parameterName, newValue) {
    this[parameterName].value = newValue;
  }
};
const updateParameter = (parameterName, newValue) => {
  authInformation.updateParameter(parameterName, newValue);
  if (authInformation[parameterName].value) clueSeen.value = false;
};

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

const clueSeen = ref(false);
const showClue = (event) => {
  clueSeen.value = true;
  event.currentTarget.previousSibling.focus();
};
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

const auth = ref(null);
const handleInputEnter = (event) => {
  if (!authInformation[event.currentTarget.dataset.type].value) {
    clueSeen.value = true;
    return;
  }
  if (header.value === 'Вход') {
    if (parameterNumber.value === 1) parameterNumber.value++;
    if (parameterNumber.value === 2)
      auth.value.children[auth.value.children.length - 1].focus();
  }
  if (header.value === 'Регистрация') {
    if (parameterNumber.value < 4) parameterNumber.value++;
    if (parameterNumber.value === 4)
      auth.value.children[auth.value.children.length - 1].focus();
  }
};
</script>

<template>
  <div class="auth-and-error">
    <div class="auth" ref="auth">
      <button class="auth__change-button" @click="changeHeader">
        {{ header === 'Вход' ? 'Регистрация' : 'Вход' }}
      </button>
      <button
        class="auth__close"
        title="Закрыть"
        @click="$emit('closeAuthComp')"
      >
        <img
          class="auth__icon"
          src="/src/assets/images/close.svg"
          alt="закрыть"
        />
      </button>
      <h3 class="auth__header">{{ header }}</h3>
      <!--keydown так как keyup отработает после переключения и захватит инпут-->
      <KeepAlive>
        <component
          :is="currentParameter"
          @keydown.enter.prevent="handleInputEnter"
          @updateParameter="updateParameter"
          @blur="clueSeen = false"
          :password="authInformation.password.value"
        />
      </KeepAlive>
      <button class="auth__clue-button" @click="showClue" :disabled="clueSeen">
        подсказка
      </button>
      <div class="auth__clue" v-show="clueSeen">
        {{ clueMessage }}
      </div>
      <ParameterNavigation
        :parameterNumber="parameterNumber"
        :authType="header"
        :authInformation="authInformation"
        @changeParameterNumber="changeParameterNumber"
      />
      <AuthButton
        :type="header"
        :player="props.player"
        :authInformation="authInformation"
        @changeErrorMessage="changeErrorMessage"
        @closeAuthComp="$emit('closeAuthComp')"
      />
    </div>
    <ErrorMessage v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.auth-and-error {
  display: flex;
  flex-direction: column;
  width: calc(var(--base) * 3.52);
  height: calc(var(--base) * 3.94);
  margin-left: calc(var(--base) * 0.04);
  margin-right: calc(var(--base) * 0.04);
}

.auth {
  display: flex;
  flex-direction: column;
  width: calc(var(--base) * 3.52);
  height: calc(var(--base) * 3.94);
  padding: calc(var(--base) * 0.16);
  padding-top: 0px;
  border-radius: calc(var(--base) * 0.16);
  overflow: auto;
  scrollbar-width: none;
  background-color: rgb(182, 195, 197);

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-track {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    display: none;
  }

  &__change-button {
    position: absolute;
    top: calc(var(--base) * 0.04);
    left: calc(var(--base) * 0.04);
    cursor: pointer;
    padding: calc(var(--base) * 0.04);
    border-radius: calc(var(--base) * 0.04);
    @include fonts.Advent($size: calc(var(--base) * 0.16), $weight: 700);

    &:focus {
      outline: calc(var(--base) * 0.01) solid black;
    }
  }

  &__close {
    position: absolute;
    top: calc(var(--base) * 0.04);
    right: calc(var(--base) * 0.04);
    z-index: 2;
    cursor: pointer;
    border-radius: calc(var(--base) * 0.04);

    &:focus {
      outline: calc(var(--base) * 0.01) solid black;
    }
  }

  &__icon {
    height: calc(var(--base) * 0.24);
    width: calc(var(--base) * 0.24);
    display: block;
  }

  &__header {
    margin-top: calc(var(--base) * 0.64);
    margin-bottom: calc(var(--base) * 0.32);
    font: inherit;
    font-weight: 700;
    font-size: calc(var(--base) * 0.28);
    text-align: center;
  }

  &__input {
    display: block;
    align-self: center;
    height: calc(var(--base) * 0.64);
    width: calc(var(--base) * 3.2);
    padding: calc(var(--base) * 0.16) calc(var(--base) * 0.24)
      calc(var(--base) * 0.24) calc(var(--base) * 0.24);
    outline: none;
    border: calc(var(--base) * 0.01) solid rgba(0, 0, 0, 0.5);
    background-color: white;
    @include fonts.Advent;
  }
  &__input::placeholder {
    @include fonts.Advent($color: rgba(0, 0, 0, 0.8));
  }
  &__input_border-invalid {
    border-color: rgb(235, 94, 94);
  }

  &__input_border-valid {
    border-color: #55b2f0;
  }

  &__clue-button {
    align-self: flex-start;
    margin-top: calc(var(--base) * 0.02);
    margin-left: calc(var(--base) * 0.04);
    padding: calc(var(--base) * 0.02);
    cursor: pointer;
    @include fonts.Advent($size: calc(var(--base) * 0.16));
    font-style: italic;

    &:focus {
      outline: calc(var(--base) * 0.01) solid black;
    }

    &:disabled {
      visibility: hidden;
    }
  }

  &__clue {
    position: absolute;
    left: calc(50% - calc(var(--base) * 1.6));
    top: calc(
      calc(var(--base) * 0.64) + calc(var(--base) * 0.01) +
        calc(var(--base) * 1.24) + calc(var(--base) * 0.08)
    );
    z-index: 2;
    width: calc(var(--base) * 3.2);
    padding: calc(var(--base) * 0.08);
    opacity: 90%;
    font-size: calc(var(--base) * 0.2);
    background-color: rgb(232, 238, 233);
  }
}
</style>
