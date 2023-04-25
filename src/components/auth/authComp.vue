<script setup>
import EmailInput from './components/inputs/emailInput.vue';
import PasswordInput from './components/inputs/passwordInput.vue';
import AuthButton from './components/authButton.vue';
import ParameterNavigation from './components/parameterNavigation.vue';
import { ref, computed, defineAsyncComponent } from 'vue';
const NameInput = defineAsyncComponent({
  loader: () => import('./components/inputs/nameInput.vue')
});
const RepeatPasswordInput = defineAsyncComponent({
  loader: () => import('./components/inputs/repeatPasswordInput.vue')
});
const ErrorMessage = defineAsyncComponent({
  loader: () => import('@/components/errorMessage.vue')
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
  position: sticky;
  top: 8px;
  width: 352px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  margin-left: 4px;
  margin-right: 4px;
}

.auth {
  display: flex;
  flex-direction: column;
  min-height: 200px;
  min-width: 200px;
  padding: 16px;
  padding-top: 0px;
  border-radius: 16px;
  overflow: auto;
  background-color: rgb(182, 195, 197);

  &__change-button {
    position: absolute;
    top: 4px;
    left: 4px;
    cursor: pointer;
    padding: 4px;
    border: 1px solid transparent;
    border-radius: 4px;
    @include fonts.Advent($size: 16px, $weight: 700);

    &:focus {
      outline: 1px solid black;
    }
  }

  &__close {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 4px;

    &:focus {
      outline: 1px solid black;
    }
  }

  &__icon {
    height: 24px;
    width: 24px;
  }

  &__header {
    font: inherit;
    font-weight: 700;
    font-size: 28px;
    text-align: center;
    margin-top: 64px;
    margin-bottom: 32px;
  }

  &__input {
    display: block;
    position: relative;
    height: 64px;
    width: 320px;
    padding: 16px 24px 24px 24px;
    align-self: center;
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.5);
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
    @include fonts.Advent($size: 16px);
    font-style: italic;
    align-self: flex-start;
    margin-top: 2px;
    padding: 2px;
    cursor: pointer;
    margin-left: 4px;

    &:focus {
      outline: 1px solid black;
    }
    &:disabled {
      visibility: hidden;
    }
  }

  &__clue {
    padding: 8px;
    background-color: rgb(232, 238, 233);
    opacity: 90%;
    font-size: 20px;
    width: 320px;
    position: absolute;
    left: calc(50% - 160px);
    top: calc(64px + 1px + 124px + 8px);
    z-index: 2;
  }
}
</style>
