<script setup>
import { ref, defineAsyncComponent } from 'vue';
import LoadingInput from './components/inputs/loadingInput.vue';
import AuthButton from './components/authButton/authButton.vue';
import ParameterNavigation from './components/navigation/parameterNavigation.vue';
import { useError } from './composables/error.js';
import { useCurrentParameter } from './composables/currentParameter.js';
import { useClue } from './composables/clue.js';
import { useAuthInformation } from './composables/authInformation.js';
const ErrorMessage = defineAsyncComponent({
  loader: () => import('@/components/errorMessage.vue'),
  loadingComponent: LoadingInput,
  delay: 0
});

const props = defineProps({
  player: String
});
defineEmits(['closeAuthComp']);

const auth = ref(null);

const {
  header,
  parameterNumber,
  currentParameter,
  changeHeader,
  changeParameterNumber,
  checkParameter
} = useCurrentParameter(LoadingInput);

const { clueSeen, clueMessage, showClue, closeClue } = useClue(
  header,
  parameterNumber
);

const { errorMessage, changeErrorMessage } = useError(header);

const { authInformation, updateParameter } = useAuthInformation(closeClue);
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
          @keydown.enter.prevent="
            checkParameter($event, auth, authInformation, showClue)
          "
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
  width: var(--authWIdth);
  height: var(--authHeight);
  margin-left: calc(var(--base) * 0.04);
  margin-right: calc(var(--base) * 0.04);
}

.auth {
  display: flex;
  flex-direction: column;
  width: var(--authWIdth);
  height: var(--authHeight);
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

    &:focus-visible {
      outline: calc(var(--base) * 0.01) solid black;
    }

    &:active {
      text-shadow: calc(var(--base) * 0.08) calc(var(--base) * 0.03)
        calc(var(--base) * 0.05) gray;
    }
  }

  &__close {
    position: absolute;
    top: calc(var(--base) * 0.04);
    right: calc(var(--base) * 0.04);
    z-index: 2;
    cursor: pointer;
    border-radius: calc(var(--base) * 0.04);

    &:focus-visible {
      outline: calc(var(--base) * 0.01) solid black;
    }

    &:active {
      box-shadow: 0px calc(var(--base) * 0.05) calc(var(--base) * 0.05) gray;
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

    &:focus-visible {
      outline: calc(var(--base) * 0.01) solid black;
    }

    &:active {
      text-shadow: calc(var(--base) * 0.08) calc(var(--base) * 0.03)
        calc(var(--base) * 0.05) black;
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
