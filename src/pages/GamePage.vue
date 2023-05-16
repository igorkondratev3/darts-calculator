<script setup>
import { ref, onMounted } from 'vue';
import GameSetup from '@/components/gamePage/gameSetup/gameSetup.vue';
import RoundInformation from '@/components/gamePage/roundInformation/roundInformation.vue';
import GameOver from '@/components/gamePage/gameOver.vue';
import NumberDartsModal from '@/components/gamePage/numberDartsModal.vue';
import PlayerStatistic from '@/components/gamePage/playerStatistic/playerStatistic.vue';
import PalyerScore from '@/components/gamePage/palyerScore.vue';
import {
  defineFocusForNewLeg,
  defineFocusForNextPlayer
} from '@/helpers/defineFocus.js';
import { useUsersStore } from '@/stores/users.js';
import { getNumberDarts } from '@/helpers/getNumberDarts.js';
import { useNewGame } from '@/composables/newGame.js';
import { useSvgStore } from '@/stores/svg';
import { RouterLink } from 'vue-router';

const svgStore = useSvgStore();

const usersStore = useUsersStore();
const numberDartsModal = ref(null);
const seenZeroInNumberDartsModal = ref(false);
const seenOneInNumberDartsModal = ref(true);
const seenThreeInNumberDartsModal = ref(true);
const messageNumberDartsModal = ref('');
const gameOverModal = ref(null);
const gameSetupModal = ref(null);
const isGameOver = ref(false);
const isStartedGame = ref(false);

onMounted(() => {
  setTimeout(() => gameSetupModal.value.showModal(), 0);
  /*settimeout чтобы корректно работало,
  но всё равно ошибка при внесении изменении в код текущей страницы
  при обычной работе приложения всё работает нормально
  проблема отсутствует если задать атрибу open элементу,
  но тогда не блокируется задний фон  
  */
});

const { Player, startRemainder, legNumber, setNumber, legNumberInSets } =
  useNewGame();
let gameParameters;
let playerOne;
let playerTwo;

const startGame = (parameters) => {
  gameParameters = parameters;
  startRemainder.value = gameParameters.startRemainder;
  playerOne = new Player(gameParameters[gameParameters.whoStarts]);
  playerTwo = new Player(
    gameParameters.whoStarts === 'nameP1'
      ? gameParameters.nameP2
      : gameParameters.nameP1
  );
  isStartedGame.value = true;
  gameSetupModal.value.close();
  defineFocusForNewLeg(legNumber.value, setNumber.value, document.forms[0]);
};

const setPointsAndRemainder = async (point, remainder, player, roundNumber) => {
  const currentPlayer = player === 'playerOne' ? playerOne : playerTwo;

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
    defineFocusForNextPlayer(player, document.forms[0]);
    return;
  }

  if (
    remainder <= 50 &&
    ((player === 'playerOne' && gameParameters.isPercentDoubleInStatP1) ||
      (player === 'playerTwo' && gameParameters.isPercentDoubleInStatP2))
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
  defineFocusForNextPlayer(player, document.forms[0]);
};

const legCompleted = async (player) => {
  const currentPlayer = player === 'playerOne' ? playerOne : playerTwo;
  const anotherPlayer = player === 'playerOne' ? playerTwo : playerOne;

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
    (player === 'playerOne' && gameParameters.isPercentDoubleInStatP1) ||
    (player === 'playerTwo' && gameParameters.isPercentDoubleInStatP2)
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
    //если закроется за 9, а у другого 6 чтобы не потерять статистику для 9 жротиков
    currentPlayer.setAveragePointsForFirstNineDarts();
    if (anotherPlayer.pointsAndDartsLegs.value[legNumber.value - 1][1] === 6)
      anotherPlayer.setAveragePointsForFirstNineDarts();
  }
  if (
    (player === 'playerOne' && gameParameters.isPercentDoubleInStatP1) ||
    (player === 'playerTwo' && gameParameters.isPercentDoubleInStatP2)
  ) {
    //объеденить если ничего не сломается с логическим блоком сверху
    currentPlayer.dartsForDoubleSets.value[setNumber.value - 1] ??= 0;
    currentPlayer.dartsForDoubleSets.value[setNumber.value - 1] +=
      doubleNumberDarts;
  }
  currentPlayer.checkAndSetHighestCheckout();
  currentPlayer.checkAndSetHighPoints(currentPlayer.legRemainders.value.at(-1));

  if (currentPlayer.legsWonInSet.value === gameParameters.legsToWin) {
    legNumberInSets.value.push(
      playerOne.legsWonInSet.value + playerTwo.legsWonInSet.value
    );
    currentPlayer.setsWon.value++;
    setNumber.value++;
  }

  playerOne.clearPointsAndRemaindersLeg();
  playerTwo.clearPointsAndRemaindersLeg();

  if (currentPlayer.setsWon.value === gameParameters.setsToWin) {
    isGameOver.value = true;
    gameOverModal.value.showModal();
    legNumber.value++; //для корректного расчет среднего значения в проигранных легах при завершении игры
    return;
  }

  legNumber.value++;
  defineFocusForNewLeg(legNumber.value, setNumber.value, document.forms[0]);
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
  <dialog class="dialog" ref="gameSetupModal" @cancel.prevent="">
    <GameSetup :seenSetup="!isStartedGame" @startGame="startGame" />
  </dialog>
  <main class="game-page game">
    <button class="game__new-game-button" @click="startNewGame">
      Новый матч
    </button>
    <RouterLink class="home-button" to="/">на главную</RouterLink>
    <div class="game__players-information players-information">
      <div class="players-information__name">
        {{ usersStore.users.P1?.name || playerOne?.name }}
      </div>
      <PalyerScore
        v-if="Boolean(playerOne)"
        :areSetsInGame="gameParameters?.areSetsInGame"
        :setsWon="playerOne?.setsWon.value"
        :legsWonInSet="playerOne?.legsWonInSet.value"
        player="P1"
      />
      <div class="darts-icon-wrapper">
        <img
        v-if="svgStore.svg.darts"
        class="darts-icon"
        :src="svgStore.svg.darts"
        alt="darts"
      />
      </div>

      <PalyerScore
        v-if="Boolean(playerTwo)"
        :areSetsInGame="gameParameters?.areSetsInGame"
        :setsWon="playerTwo?.setsWon.value"
        :legsWonInSet="playerTwo?.legsWonInSet.value"
        player="P2"
      />
      <div class="players-information__name">
        {{ usersStore.users.P2?.name || playerTwo?.name }}
      </div>
    </div>
    <div class="game__points-information points-information">
      <PlayerStatistic
        v-if="Boolean(playerOne)"
        player="P1"
        :gameStatistic="playerOne.gameStatistic"
        :setStatistic="playerOne.setStatistic"
        :averagePointsLeg="playerOne.averagePointsLeg.value"
        :areSetsInGame="gameParameters?.areSetsInGame"
        :isPercentDoubleInStat="gameParameters?.isPercentDoubleInStatP1"
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
              :remainderBeforeGetPointsP1="
                n - 1 ? playerOne.legRemainders.value[n - 2] : startRemainder
              "
              :remainderBeforeGetPointsP2="
                n - 1 ? playerTwo.legRemainders.value[n - 2] : startRemainder
              "
              :remainderAfterGetPointsP1="playerOne.legRemainders.value[n - 1]"
              :remainderAfterGetPointsP2="playerTwo.legRemainders.value[n - 1]"
              :roundPointsP1="playerOne.legPoints.value[n - 1]"
              :roundPointsP2="playerTwo.legPoints.value[n - 1]"
              :roundNumber="n"
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
        player="P2"
        :gameStatistic="playerTwo.gameStatistic"
        :setStatistic="playerTwo.setStatistic"
        :averagePointsLeg="playerTwo.averagePointsLeg.value"
        :areSetsInGame="gameParameters?.areSetsInGame"
        :isPercentDoubleInStat="gameParameters?.isPercentDoubleInStatP2"
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
      :legsWonInGameP1="playerOne.legsWonInGame.value"
      :legsWonInGameP2="playerTwo.legsWonInGame.value"
      :gameStatisticP1="playerOne.gameStatistic"
      :gameStatisticP2="playerTwo.gameStatistic"
      :isPercentDoubleInStatP1="gameParameters.isPercentDoubleInStatP1"
      :isPercentDoubleInStatP2="gameParameters.isPercentDoubleInStatP2"
      :legNumber="legNumber - 1"
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

.home-button {
  position: absolute;
  top: 4px;
  right: 4px;
  padding: 8px;
  z-index: 2;
  border: 1px solid black;
  border-radius: 8px;
  @include fonts.Advent;
  font-size: 16px;
  text-decoration: none;
  cursor: default;
  transition: background-color 0.5s linear, color 0.5s linear;

  &:focus,
  &:hover {
    background-color: black;
    color: white;
  }
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

.darts-icon-wrapper {
  margin-left: 16px;
  margin-right: 16px;
  width: 96px;
  height: 96px;
}

.darts-icon {
  width: 96px;
  height: 96px;
  display: block;
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
