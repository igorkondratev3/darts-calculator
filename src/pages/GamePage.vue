<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import GameSetup from '@/components/gamePage/gameSetup/gameSetup.vue';
import RoundInformation from '@/components/gamePage/roundInformation/roundInformation.vue';
import NumberDartsModal from '@/components/gamePage/numberDartsModal.vue';
import LeavePageModal from '@/components/gamePage/leavePageModal.vue';
import PlayerStatistic from '@/components/gamePage/playerStatistic/playerStatistic.vue';
import PalyerScore from '@/components/gamePage/palyerScore.vue';
import LoadingDialog from '../components/gamePage/loadingDialog.vue';
import HomeButton from '../components/homeButton.vue';
import {
  defineFocusForNewLeg,
  defineFocusForNextPlayer,
  getNumberDarts,
  changeOldValues,
  saveGame
} from '@/helpers/gamePage.js';
import { useUsersStore } from '@/stores/users.js';
import { useNewGame } from '@/composables/newGame.js';
import { useSvgStore } from '@/stores/svg.js';
import { useSavedGame } from '@/stores/savedGame.js';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
const GameOver = defineAsyncComponent({
  loader: () => import('@/components/gamePage/gameOver/gameOver.vue'),
  loadingComponent: LoadingDialog,
  delay: 0
});

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

//let showGameSetupInStart = true; - для showmodal при hot reload
onMounted(() => {
  gameSetupModal.value.showModal();
  /*if (showGameSetupInStart)
    setTimeout(() => gameSetupModal.value.showModal(), 0);*/
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
const savedGame = useSavedGame();

if (savedGame.savedGame) {
  gameParameters = savedGame.savedGame.gameParameters;
  startRemainder.value = savedGame.savedGame.startRemainder;
  playerOne = new Player(
    savedGame.savedGame.playerOne.name,
    savedGame.savedGame.playerOne
  );
  playerTwo = new Player(
    savedGame.savedGame.playerTwo.name,
    savedGame.savedGame.playerTwo
  );
  legNumber.value = savedGame.savedGame.legNumber;
  setNumber.value = savedGame.savedGame.setNumber;
  legNumberInSets.value = savedGame.savedGame.legNumberInSets;
  savedGame.resetGame();
  //showGameSetupInStart = false; - для showmodal при hot reload
  isStartedGame.value = true;
  setTimeout(
    () =>
      defineFocusForNextPlayer(
        playerOne.legPoints.value.length === playerTwo.legPoints.value.length
          ? 'playerTwo'
          : 'playerOne',
        document.forms[0]
      ),
    0
  );
}

const startGame = (parameters) => {
  gameParameters = parameters;
  startRemainder.value = gameParameters.startRemainder;
  playerOne = new Player(gameParameters.nameP1);
  playerTwo = new Player(gameParameters.nameP2);
  isStartedGame.value = true;
  gameSetupModal.value.close();
  defineFocusForNewLeg(legNumber.value, setNumber.value, document.forms[0]);
};

const setPointsAndRemainder = async (point, remainder, player, roundNumber) => {
  const currentPlayer = player === 'playerOne' ? playerOne : playerTwo;

  if (roundNumber <= currentPlayer.legRemainders.value.length) {
    changeOldValues(currentPlayer, point, roundNumber, legNumber.value);
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

const router = useRouter();
let canLeavePage = false;
const beforeLeavePage = ref(null);
onBeforeRouteLeave((to) => {
  const showModalBeforeLeavePage = async () => {
    const leavePage = await saveGame(beforeLeavePage.value, {
      gameParameters,
      startRemainder,
      playerOne,
      playerTwo,
      legNumber,
      setNumber,
      legNumberInSets
    });
    if (leavePage) {
      canLeavePage = true;
      router.push(to.fullPath);
    } else
      defineFocusForNextPlayer(
        playerOne.legPoints.value.length === playerTwo.legPoints.value.length
          ? 'playerTwo'
          : 'playerOne',
        document.forms[0]
      );
  };

  if (
    (legNumber.value > 1 ||
      playerOne?.legPoints.value[0] !== undefined ||
      playerTwo?.legPoints.value[0] !== undefined) &&
    isStartedGame.value &&
    !isGameOver.value &&
    !canLeavePage
  ) {
    showModalBeforeLeavePage();
    return false;
  }
});
</script>

<template>
  <dialog class="dialog" ref="gameSetupModal" @cancel.prevent="">
    <GameSetup v-if="!isStartedGame" @startGame="startGame" />
    <!--v-if чтобы параметры заново считывались из локал сторедж чтобы при начале новой
    игры всё было адекватно, может лучше менять сам объект с параметрами игры - подумать
    -->
  </dialog>
  <main class="page game-page game">
    <button class="game__new-game-button" @click="startNewGame">
      Новый матч
    </button>
    <HomeButton />
    <div class="game__players-information players-information">
      <div
        class="players-information__name players-information__name_position-left"
      >
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
      <div
        class="players-information__name players-information__name_position-right"
      >
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
          <div
            class="round-information__points-area round-information__points-area_margin-right"
          ></div>
          <div class="round-information__remainder" v-show="isStartedGame">
            {{ startRemainder }}
          </div>
          <div class="round-information__number-darts"></div>
          <div class="round-information__remainder" v-show="isStartedGame">
            {{ startRemainder }}
          </div>
          <div
            class="round-information__points-area round-information__points-area_margin-right"
          ></div>
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
  <dialog class="dialog" ref="beforeLeavePage" @cancel.prevent="">
    <LeavePageModal />
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
  height: 100%;
  width: 100%;
  @include fonts.Advent;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.664);
  backdrop-filter: blur(calc(var(--base) * 0.1));
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

.game {
  &__new-game-button {
    position: absolute;
    left: calc(var(--base) * 0.04);
    top: calc(var(--base) * 0.04);
    z-index: 2;
    padding: calc(var(--base) * 0.08);
    border: calc(var(--base) * 0.01) solid black;
    border-radius: calc(var(--base) * 0.08);
    @include fonts.Advent;
    font-size: calc(var(--base) * 0.16);
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
    margin-bottom: calc(var(--base) * 0.32);
  }

  &__points-information {
    display: flex;
    flex-wrap: wrap;
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
  font-size: calc(var(--base) * 0.48);
  white-space: nowrap;
  overflow-x: hidden;
}

.darts-icon-wrapper {
  margin-left: calc(var(--base) * 0.16);
  margin-right: calc(var(--base) * 0.16);
  width: calc(var(--base) * 0.96);
  height: calc(var(--base) * 0.96);
}

.darts-icon {
  width: calc(var(--base) * 0.96);
  height: calc(var(--base) * 0.96);
  display: block;
}

.points-information__points {
  display: flex;
  flex-direction: column;
  font-size: calc(var(--base) * 0.64);
}

.points__round-information {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: calc(var(--base) * 0.16);
}

.round-information {
  &__remainder {
    width: calc(var(--base) * 1.4);
    font-size: calc(var(--base) * 0.56);
    text-align: center;
  }
  &__number-darts {
    width: calc(var(--base) * 1.08);
    margin-left: calc(var(--base) * 0.32);
    margin-right: calc(var(--base) * 0.32);
    font-size: calc(var(--base) * 0.4);
    font-weight: 700;
    text-align: center;
  }
}

@media (max-width: 1400px) {
  .game__players-information {
    margin-top: calc(var(--base) * 0.48);
  }
}

@media (max-width: 1370px) {
  .points-information__points {
    width: 100%;
    order: -1;
  }

  .game__players-information {
    margin-top: calc(var(--base) * 0.96);
  }

  .players-information__name_position-left {
    position: absolute;
    top: calc(var(--base) * -0.48);
    left: 0;
  }
  .players-information__name_position-right {
    position: absolute;
    top: calc(var(--base) * -0.48);
    right: 0;
  }
}

@media (max-width: 800px) {
  .points__round-information {
    justify-content: flex-start;
  }

  .points-information__points {
    width: auto;
  }

  .players-information__name {
    font-size: calc(var(--base) * 0.24);
  }
}

@media (max-width: 700px) {
  .points-information__points {
    width: 100%;
  }
}

@media (max-width: 550px) {
  .points-information__points {
    width: auto;
  }
}

@media (max-width: 550px) {
  .round-information {
    &__remainder {
      width: calc(var(--base) * 0.7);
      font-size: calc(var(--base) * 0.38);
    }
    &__number-darts {
      width: calc(var(--base) * 0.5);
      font-size: calc(var(--base) * 0.28);
    }
  }
}

@media (max-width: 480px) {
  .points-information__points {
    width: 100%;
  }
}

@media (max-width: 450px) {
  .round-information__number-darts {
    margin-left: calc(var(--base) * 0.04);
    margin-right: calc(var(--base) * 0.04);
  }

  .players-information__name {
    font-size: calc(var(--base) * 0.16);
  }
}
</style>
