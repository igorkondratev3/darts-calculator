<script setup>
import { ref } from 'vue';
import GameSetup from '@/components/gamePage/gameSetup.vue';
import RoundInformation from '@/components/gamePage/roundInformation/roundInformation.vue';
import GameOver from '@/components/gamePage/gameOver.vue';
import NumberDartsModal from '@/components/gamePage/numberDartsModal.vue';
import PlayerStatistic from '@/components/gamePage/playerStatistic/playerStatistic.vue';
import PalyerScore from '@/components/gamePage/palyerScore.vue';
import {
  defineFocusForNewLeg,
  defineFocusForNextPlayer
} from '@/helpers/defineFocus.js';
import { getNumberDarts } from '@/helpers/getNumberDarts.js';
import { useNewGame } from '@/composables/newGame.js';

const numberDartsModal = ref(null);
const seenZeroInNumberDartsModal = ref(false);
const seenOneInNumberDartsModal = ref(true);
const seenThreeInNumberDartsModal = ref(true);
const messageNumberDartsModal = ref('');
const gameOverModal = ref(null);
const gameSetupModal = ref(null);
const isGameOver = ref(false);
const isStartedGame = ref(false);

let gameParameters;

const { Player, startRemainder, legNumber, setNumber, legNumberInSets } =
  useNewGame();

let playerOne;
let playerTwo;

const startGame = (parameters) => {
  gameParameters = parameters;
  startRemainder.value = gameParameters.startRemainder;
  playerOne = new Player(gameParameters[gameParameters.whoStarted]);
  playerTwo = new Player(
    gameParameters.whoStarted === 'nameOne'
      ? gameParameters.nameTwo
      : gameParameters.nameOne
  );
  isStartedGame.value = true;
  gameSetupModal.value.close();
  setTimeout(() => document.forms[0][document.forms[0].length - 2].focus(), 0);
};

const setPointsAndRemainder = async (point, remainder, player, roundNumber) => {
  let currentPlayer;
  if (player === 'playerOne') currentPlayer = playerOne;
  if (player === 'playerTwo') currentPlayer = playerTwo;

  if (roundNumber <= currentPlayer.legRemainders.value.length) {
    //блок для проверки внесения изменений - вынести в функцию
    const difference = currentPlayer.legPoints.value[roundNumber - 1] - point;
    currentPlayer.legPoints.value[roundNumber - 1] = point;
    for (
      let i = roundNumber - 1;
      i < currentPlayer.legRemainders.value.length;
      i++
    )
      currentPlayer.legRemainders.value[i] += difference;
    currentPlayer.pointsAndDartsLegs.value[legNumber.value - 1][0] -=
      difference;
    defineFocusForNextPlayer(player);
    return;
  }

  if (
    remainder <= 50 &&
    ((player === 'playerOne' && gameParameters.isPercentDoubleP1) ||
      (player === 'playerTwo' && gameParameters.isPercentDoubleP2))
  ) {
    seenZeroInNumberDartsModal.value = true;
    messageNumberDartsModal.value = 'Количество дротиков на удвоение';
    const endNumberDarts = await getNumberDarts(numberDartsModal.value);
    seenZeroInNumberDartsModal.value = false;
    currentPlayer.dartsForDoubleSets.value[setNumber.value - 1] ??= 0;
    currentPlayer.dartsForDoubleSets.value[setNumber.value - 1] +=
      endNumberDarts;
  }

  currentPlayer.checkAndSetHighPoints(point);
  currentPlayer.legPoints.value.push(point);
  currentPlayer.legRemainders.value.push(remainder);
  currentPlayer.setInPointsAndDartsLegs(point, 3, legNumber.value);
  if (currentPlayer.pointsAndDartsLegs.value[legNumber.value - 1][1] === 9)
    currentPlayer.setAveragePointsForFirstNineDarts();
  defineFocusForNextPlayer(player);
};

const legCompleted = async (player) => {
  const currentPlayer = player === 'playerOne' ? playerOne : playerTwo;
  const otherPlayer = player === 'playerOne' ? playerTwo : playerOne;

  let endNumberDarts;

  if (
    currentPlayer.legRemainders.value.at(-1) > 100 &&
    currentPlayer.legRemainders.value.at(-1) !== 110
  )
    endNumberDarts = 3;

  if (!endNumberDarts) {
    messageNumberDartsModal.value = 'Количество дротиков в подходе';
    if (
      currentPlayer.legRemainders.value.at(-1) > 40 &&
      currentPlayer.legRemainders.value.at(-1) !== 50
    )
      seenOneInNumberDartsModal.value = false;
    endNumberDarts = await getNumberDarts(numberDartsModal.value);
    seenOneInNumberDartsModal.value = true;
  }

  let doubleNumberDarts;
  if (
    (player === 'playerOne' && gameParameters.isPercentDoubleP1) ||
    (player === 'playerTwo' && gameParameters.isPercentDoubleP2)
  ) {
    if (
      currentPlayer.legRemainders.value.at(-1) > 100 &&
      currentPlayer.legRemainders.value.at(-1) !== 110
    )
      doubleNumberDarts = 1;
    if (!doubleNumberDarts) {
      messageNumberDartsModal.value = 'Количество дротиков на удвоение';
      if (
        currentPlayer.legRemainders.value.at(-1) > 40 &&
        currentPlayer.legRemainders.value.at(-1) !== 50
      )
        seenThreeInNumberDartsModal.value = false;
      doubleNumberDarts = await getNumberDarts(numberDartsModal.value);
      seenThreeInNumberDartsModal.value = true;
    }
  }
  currentPlayer.setInPointsAndDartsLegs(
    currentPlayer.legRemainders.value.at(-1),
    endNumberDarts,
    legNumber.value
  );
  if (currentPlayer.pointsAndDartsLegs.value[legNumber.value - 1][1] === 9) {
    currentPlayer.setAveragePointsForFirstNineDarts();
    if (otherPlayer.pointsAndDartsLegs.value[legNumber.value - 1][1] === 6)
      otherPlayer.setAveragePointsForFirstNineDarts();
  }
  if (
    (player === 'playerOne' && gameParameters.isPercentDoubleP1) ||
    (player === 'playerTwo' && gameParameters.isPercentDoubleP2)
  ) {
    //объеденить если ничего не сломается с логическим блоком сверху
    currentPlayer.dartsForDoubleSets.value[setNumber.value - 1] ??= 0;
    currentPlayer.dartsForDoubleSets.value[setNumber.value - 1] +=
      doubleNumberDarts;
  }
  currentPlayer.checkAndSetHighestCheckout();
  currentPlayer.checkAndSetHighPoints(currentPlayer.legRemainders.value.at(-1));

  if (currentPlayer.legsWonInSet.value === gameParameters.legs) {
    legNumberInSets.value.push(
      playerOne.legsWonInSet.value + playerTwo.legsWonInSet.value
    );
    currentPlayer.setsWon.value++;
    setNumber.value++;
  }

  playerOne.clearPointsAndRemaindersLeg();
  playerTwo.clearPointsAndRemaindersLeg();

  if (currentPlayer.setsWon.value === gameParameters.sets) {
    isGameOver.value = true;
    gameOverModal.value.showModal();
    legNumber.value++; //для корректного расчет среднего значения в проигранных легах при завершении игры
    return;
  }

  legNumber.value++;
  defineFocusForNewLeg(legNumber.value, setNumber.value);
};

const startNewGame = () => {
  //сделать метод с обнулением в классе
  legNumber.value = 1;
  setNumber.value = 1;
  startRemainder.value = 0;
  legNumberInSets.value = [];
  gameOverModal.value.close();
  isGameOver.value = false;
  isStartedGame.value = false;
  gameSetupModal.value.showModal();
  playerOne = undefined;
  playerTwo = undefined;
};
</script>

<template>
  <dialog open class="dialog" ref="gameSetupModal" @cancel.prevent="">
    <GameSetup :isSeenSetup="!isStartedGame" @startGame="startGame" />
  </dialog>
  <main class="game-page game">
    <button class="game__new-game-button" @click="startNewGame">
      Новый матч
    </button>
    <div class="game__players-information players-information">
      <div class="players-information__name">{{ playerOne?.name }}</div>
      <PalyerScore
        :areSetsInGame="gameParameters?.areSetsInGame"
        :seenPlayerScore="Boolean(playerOne)"
        :setsWon="playerOne?.setsWon.value"
        :legsWonInSet="playerOne?.legsWonInSet.value"
      />
      <img class="darts-icon" src="/src/assets/images/darts.svg" alt="darts" />
      <PalyerScore
        :areSetsInGame="gameParameters?.areSetsInGame"
        :seenPlayerScore="Boolean(playerTwo)"
        :setsWon="playerTwo?.setsWon.value"
        :legsWonInSet="playerTwo?.legsWonInSet.value"
      />
      <div class="players-information__name">{{ playerTwo?.name }}</div>
    </div>
    <div class="game__points-information points-information">
      <PlayerStatistic
        v-if="Boolean(playerOne)"
        :gameStatistic="playerOne.gameStatistic"
        :setStatistic="playerOne.setStatistic"
        :averagePointsLeg="playerOne.averagePointsLeg.value"
        :areSetsInGame="gameParameters?.areSetsInGame"
        :isPercentDouble="gameParameters?.isPercentDoubleP1"
      />
      <form class="points-information__points points">
        <div class="points__round-information round-information">
          <div class="round-information__remainder" v-show="isStartedGame">
            {{ startRemainder }}
          </div>
          <div class="round-information__number-darts"></div>
          <div class="round-information__remainder" v-show="isStartedGame">
            {{ startRemainder }}
          </div>
        </div>
        <template v-if="playerOne && playerTwo">
          <template
            v-for="n in Math.max(
              playerOne.legRemainders.value.length,
              playerTwo.legRemainders.value.length
            ) + 1"
            :key="n + 'line'"
          >
            <RoundInformation
              v-if="
                (!(n - 1) ||
                  (playerOne.legRemainders.value[n - 2] &&
                    playerTwo.legRemainders.value[n - 2])) &&
                isStartedGame &&
                !isGameOver
              "
              :roundNumber="n"
              :remainderPlayerOne="
                n - 1 ? playerOne.legRemainders.value[n - 2] : startRemainder
              "
              :remainderPlayerTwo="
                n - 1 ? playerTwo.legRemainders.value[n - 2] : startRemainder
              "
              :newRemainderPlayerOne="playerOne.legRemainders.value[n - 1]"
              :newRemainderPlayerTwo="playerTwo.legRemainders.value[n - 1]"
              :roundPointsPlayerOne="playerOne.legPoints.value[n - 1]"
              :roundPointsPlayerTwo="playerTwo.legPoints.value[n - 1]"
              :legNumber="legNumber"
              :setNumber="setNumber"
              @setPointsAndRemainder="setPointsAndRemainder"
              @legCompleted="legCompleted"
            />
          </template>
        </template>
      </form>
      <PlayerStatistic
        v-if="Boolean(playerTwo)"
        :gameStatistic="playerTwo.gameStatistic"
        :setStatistic="playerTwo.setStatistic"
        :averagePointsLeg="playerTwo.averagePointsLeg.value"
        :areSetsInGame="gameParameters?.areSetsInGame"
        :isPercentDouble="gameParameters?.isPercentDoubleP2"
      />
    </div>
  </main>
  <dialog class="dialog" ref="numberDartsModal" @cancel.prevent="">
    <NumberDartsModal
      :message="messageNumberDartsModal"
      :seenZero="seenZeroInNumberDartsModal"
      :seenOne="seenOneInNumberDartsModal"
      :seenThree="seenThreeInNumberDartsModal"
    />
  </dialog>
  <dialog class="dialog" ref="gameOverModal" @cancel.prevent="">
    <GameOver
      v-if="isGameOver"
      @startNewGame="startNewGame"
      :nameP1="playerOne.name"
      :nameP2="playerTwo.name"
      :wonP1="
        gameParameters.areSetsInGame
          ? playerOne.setsWon.value
          : playerOne.legsWonInGame.value
      "
      :wonP2="
        gameParameters.areSetsInGame
          ? playerTwo.setsWon.value
          : playerTwo.legsWonInGame.value
      "
      :gameStatisticP1="playerOne.gameStatistic"
      :gameStatisticP2="playerTwo.gameStatistic"
      :isPercentDoubleP1="gameParameters.isPercentDoubleP1"
      :isPercentDoubleP2="gameParameters.isPercentDoubleP2"
    />
  </dialog>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.dialog {
  border: none;
}

.dialog-content-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  @include fonts.Advent;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.664);
  backdrop-filter: blur(10px);
  overflow: auto;

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
}

.game-page {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100vh;
  padding-top: 16px;
  @include fonts.Advent;
  background-color: rgb(232, 238, 233);
}

.game {
  &__new-game-button {
    position: absolute;
    left: 4px;
    top: 4px;
    z-index: 2;
    padding: 8px;
    border: 1px solid black;
    border-radius: 8px;
    @include fonts.Advent;
    font-size: 16px;
    transition: background-color 0.5s linear, color 0.5s linear;

    &:focus,
    &:hover {
      background-color: black;
      color: white;
    }
  }

  &__players-information {
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
    overflow-x: hidden;
  }

  &__points-information {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }
}

.players-information__name {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-basis: 0;
  font-size: 48px;
  white-space: nowrap;
  overflow-x: hidden;
}

.darts-icon {
  margin-left: 16px;
  margin-right: 16px;
  width: 96px;
  height: 96px;
}

.points-information__points {
  display: flex;
  flex-direction: column;
  font-size: 64px;
}

.points__round-information {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}

.round-information {
  &__remainder {
    width: 140px;
    font-size: 56px;
    text-align: center;
  }
  &__number-darts {
    width: 108px;
    margin-left: 32px;
    margin-right: 32px;
    font-size: 40px;
    font-weight: 700;
    text-align: center;
  }
}
</style>
