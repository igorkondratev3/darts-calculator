<script setup>
import { ref, defineAsyncComponent } from 'vue';
import { GameParameters } from './gamePararmeters.js';
import { useUsersStore } from '@/stores/users.js';
import { changePlayersInLS } from '@/helpers/changePlayersInLS.js';
import LoadingComponent from '@/components/loadingComponent.vue';
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
    changePlayersInLS();
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
  loadingComponent: LoadingComponent,
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
        <AuthActions player="P1" @openAuthComp="seenAuthCompP1 = true" />
        <AuthActions player="P2" @openAuthComp="seenAuthCompP2 = true" />
        <h1 class="game-setup__header">Настройка параметров матча</h1>
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
          class="game-setup__start-game-button"
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
  padding: 16px;
  border-radius: 16px;
  margin-left: 4px;
  margin-right: 4px;
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
    font-size: 32px;
    font-weight: 700;
    text-align: center;
  }

  &__parameter-header {
    margin-top: 32px;
    margin-bottom: 16px;
    font-weight: 700;
    text-align: center;
  }

  &__start-game-button {
    align-self: center;
    width: 450px;
    margin-top: 64px;
    padding: 8px;
    border-radius: 8px;
    @include fonts.Advent;
    background-color: rgb(221, 231, 231);
    transition: background-color 0.5s linear, color 0.5s linear;
  }

  &__start-game-button:hover {
    background-color: black;
    color: white;
  }

  &__start-game-button:focus {
    background-color: black;
    color: white;
  }
}

.game-setup__parameter-header_margin_zero {
  margin: 0 16px;
}
</style>
