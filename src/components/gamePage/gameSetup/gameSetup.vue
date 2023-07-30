<script setup>
import { defineAsyncComponent } from 'vue';
import { GameParameters } from './gamePararmeters.js';
import { useUsersStore } from '@/stores/users.js';
import { swapPlayersInLS } from '@/helpers/swapPlayersInLS.js';
import { startGame } from './gamePararmeters.js';
import { useElementVisibility } from '@/composables/elementVisibility.js';
import LoadingAuth from '@/components/common/auth/authComp/components/loadingAuth.vue';
import AuthState from '@/components/common/auth/authState.vue';
import AuthActions from '@/components/common/auth/authActions/authActions.vue';
import SetsAndLegs from './components/setsAndLegs/setsAndLegs.vue';
import PlayerNames from './components/playerNames.vue';
import WhoStarts from './components/whoStarts.vue';
import IsPercentDoubleInStat from './components/isPercentDouble.vue';
import StartRemainder from './components/startRemainder/startRemainder.vue';
const AuthComp = defineAsyncComponent({
  loader: () => import('@/components/common/auth/authComp/authComp.vue'),
  loadingComponent: LoadingAuth,
  delay: 0
});

const emits = defineEmits(['startGame']);

const usersStore = useUsersStore();

const gameParameters = new GameParameters(
  JSON.parse(localStorage.getItem('gameParameters'))
);

const {
  visibility: authCompP1Visibility,
  showElement: showAuthCompP1,
  hideElement: hideAuthCompP1
} = useElementVisibility();

const {
  visibility: authCompP2Visibility,
  showElement: showAuthCompP2,
  hideElement: hideAuthCompP2
} = useElementVisibility();
</script>

<template>
  <div class="dialog-content-wrapper">
    <AuthComp
      class="game-setup__auth-comp_margin-top"
      v-if="authCompP1Visibility"
      @closeAuthComp="hideAuthCompP1"
      player="P1"
    />
    <AuthComp
      class="game-setup__auth-comp_margin-top"
      v-if="authCompP2Visibility"
      @closeAuthComp="hideAuthCompP2"
      player="P2"
    />
    <div
      class="game-setup-wrapper"
      v-show="!authCompP1Visibility && !authCompP2Visibility"
    >
      <!--обертка нужна так как блок имеет overflow и элементы с fixed и прочим скрываются-->
      <AuthState
        class="game-setup__auth-state_top-left"
        player="P1"
        backgroundColor="rgb(177, 205, 223)"
      />
      <AuthState
        class="game-setup__auth-state_top-right"
        player="P2"
        backgroundColor="rgb(177, 205, 223)"
      />
      <div class="game-setup">
        <div class="auth-actions-wrapper">
          <AuthActions player="P1" @openAuthComp="showAuthCompP1" />
          <AuthActions player="P2" @openAuthComp="showAuthCompP2" />
        </div>
        <h2 class="game-setup__header">Настройка параметров матча</h2>
        <StartRemainder
          :startRemainder="gameParameters.startRemainder.value"
          @updateStartRemainder="
            (remainder) => (gameParameters.startRemainder.value = remainder)
          "
        />
        <PlayerNames
          v-model:nameP1="gameParameters.nameP1.value.value"
          v-model:nameP2="gameParameters.nameP2.value.value"
        />
        <WhoStarts v-model:whoStarts="gameParameters.whoStarts.value" />
        <IsPercentDoubleInStat
          v-model:isPercentDoubleInStatP1="
            gameParameters.isPercentDoubleInStatP1.value
          "
          v-model:isPercentDoubleInStatP2="
            gameParameters.isPercentDoubleInStatP2.value
          "
        />
        <SetsAndLegs
          v-model:setsToWin="gameParameters.setsToWin.value"
          v-model:areSetsInGame="gameParameters.areSetsInGame.value"
          v-model:legsToWin="gameParameters.legsToWin.value"
        />
        <button
          class="base-button game-setup__start-game-button"
          @click.prevent="
            startGame(gameParameters, usersStore, swapPlayersInLS, emits)
          "
        >
          Начать матч
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
//dialog-content-wrapper на главной странице
@use '@/assets/css/mixins/fonts.scss';
.game-setup {
  display: flex;
  flex-direction: column;
  max-height: 95vh;
  max-width: 95vw;
  padding: calc(var(--base) * 0.16);
  padding-top: 0px;
  border-radius: calc(var(--base) * 0.16);
  margin-left: calc(var(--base) * 0.04);
  margin-right: calc(var(--base) * 0.04);
  margin-bottom: calc(var(--base) * 0.04);
  overflow: scroll;
  background-color: rgb(177, 205, 223);

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-track {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    display: none;
  }

  scrollbar-width: none;

  &__header {
    font-size: calc(var(--base) * 0.32);
    font-weight: 700;
    text-align: center;
  }

  &__parameter-header {
    margin-top: calc(var(--base) * 0.32);
    margin-bottom: calc(var(--base) * 0.16);
    font-weight: 700;
    text-align: center;
  }

  &__start-game-button {
    align-self: center;
    width: calc(var(--base) * 4.5);
    margin-top: calc(var(--base) * 0.64);
    border: none;
    background-color: rgb(221, 231, 231);
  }
}

.game-setup__parameter-header_margin_zero {
  margin: 0 calc(var(--base) * 0.16);
}

@media (max-width: 775px) {
  .game-setup__auth-state_top-left {
    top: calc(var(--base) * -0.32);
    left: calc(var(--base) * 0.34);
  }

  .game-setup__auth-state_top-right {
    top: calc(var(--base) * -0.32);
    right: calc(var(--base) * 0.34);
  }

  .game-setup-wrapper {
    margin-top: calc(var(--base) * 0.48);
  }
}

@media (max-width: 500px) {
  .game-setup__start-game-button {
    width: 90%;
  }
}

@media (max-height: 400px) {
  .game-setup__auth-comp_margin-top {
    margin-top: calc(var(--base) * 0.64);
  }
}
@media (max-height: 340px) {
  .game-setup__auth-comp_margin-top {
    margin-top: calc(var(--base) * 1.28);
  }
}

@media (max-height: 270px) {
  .game-setup__auth-comp_margin-top {
    margin-top: calc(var(--base) * 1.92);
  }
}
@media (max-height: 210px) {
  .game-setup__auth-comp_margin-top {
    margin-top: calc(var(--base) * 2.56);
  }
}

@media (max-height: 250px) {
  .game-setup-wrapper {
    margin-top: calc(var(--base) * 0.64);
  }
}
</style>
