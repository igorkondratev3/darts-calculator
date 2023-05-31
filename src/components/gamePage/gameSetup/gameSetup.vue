<script setup>
import { ref, defineAsyncComponent } from 'vue';
import { GameParameters } from './gamePararmeters.js';
import { useUsersStore } from '@/stores/users.js';
import { swapPlayersInLS } from '@/helpers/swapPlayersInLS.js';
import LoadingAuth from '@/components/auth/components/loadingAuth.vue';
import AuthState from '@/components/auth/authState.vue';
import AuthActions from '@/components/auth/authActions/authActions.vue';
import SetsAndLegs from './components/setsAndLegs.vue';
import PlayerNames from './components/playerNames.vue';
import WhoStarts from './components/whoStarts.vue';
import IsPercentDoubleInStat from './components/isPercentDouble.vue';
import StartRemainder from './components/startRemainder.vue';

const emit = defineEmits(['startGame']);

const usersStore = useUsersStore();

const gameParameters = new GameParameters(
  JSON.parse(localStorage.getItem('gameParameters'))
);

const startGame = (gameParameters) => {
  const gameParametersForNewGame = gameParameters.normalize();
  if (gameParametersForNewGame.whoStarts === 'nameP2') {
    usersStore.swap();
    swapPlayersInLS();
  }
  localStorage.setItem(
    'gameParameters',
    JSON.stringify(gameParametersForNewGame)
  );
  emit('startGame', gameParametersForNewGame);
};

const seenAuthCompP1 = ref(false);
const seenAuthCompP2 = ref(false);
const AuthComp = defineAsyncComponent({
  loader: () => import('@/components/auth/authComp.vue'),
  loadingComponent: LoadingAuth,
  delay: 0
});
</script>

<template>
  <div class="dialog-content-wrapper">
    <AuthComp
      v-if="seenAuthCompP1"
      @closeAuthComp="seenAuthCompP1 = false"
      player="P1"
    />
    <AuthComp
      v-if="seenAuthCompP2"
      @closeAuthComp="seenAuthCompP2 = false"
      player="P2"
    />
    <div v-show="!seenAuthCompP1 && !seenAuthCompP2">
      <!--обертка нужна так как блок имеет overflow и элементы с fixed и прочим скрываются-->
      <AuthState player="P1" backgroundColor="rgb(177, 205, 223)" />
      <AuthState player="P2" backgroundColor="rgb(177, 205, 223)" />
      <div class="game-setup">
        <div class="auth-actions-wrapper">
          <AuthActions player="P1" @openAuthComp="seenAuthCompP1 = true" />
          <AuthActions player="P2" @openAuthComp="seenAuthCompP2 = true" />
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
          @click.prevent="startGame(gameParameters)"
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
</style>
