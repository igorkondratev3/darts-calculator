<script setup>
import { ref, computed } from 'vue';
import GameSetup from '@/components/gamePage/gameSetup/gameSetup.vue';
import RoundInformation from '@/components/gamePage/roundInformation/roundInformation.vue';
import GameOver from '@/components/gamePage/gameOver/gameOver.vue';
import NumberDartsModal from '@/components/gamePage/numberDartsModal/numberDartsModal.vue';
import PlayerStatistic from '@/components/gamePage/playerStatistic/playerStatistic.vue';
import { defineFocusForNewLeg, defineFocusForNextPlayer } from '@/helpers/defineFocus.js';
import { getNumberDarts } from '@/helpers/getNumberDarts.js';

const numberDartsModal = ref(null);
const seenZeroInNumberDartsModal = ref(false);
const messageNumberDartsModal = ref('');
const gameOverModal = ref(null);
const gameSetupModal = ref(null);
const isGameOver = ref(false);
const isStartedGame = ref(false);

const gameParameters = ref({});
const startRemainder = ref(0);
const legNumber = ref(1);
const setNumber = ref(1);
const legNumberInSets = ref([]);

const legNumberBeforeCurrentSet = computed(() =>
  legNumberInSets.value.reduce((acc, legNumber) => acc + legNumber, 0)
);

//Вынести класс в сomposeble с переменными общего состояния
class Player {
  legRemainders = ref([]);
  legPoints = ref([]);
  pointsAndDartsLegs = ref([]);
  dartsForDoubleSets = ref([]);
  p180Sets = ref([]);
  p171Sets = ref([]);
  p131Sets = ref([]);
  p96Sets = ref([]);
  averagePointsForFirstNineDartsLegs = ref([]);
  highestCheckoutSets = ref([]);
  setsWon = ref(0);

  legsWonInGame = computed(() =>
    this.pointsAndDartsLegs.value.reduce(
      (acc, legStat) => (legStat[0] === 501 ? acc + 1 : acc),
      0
    )
  );
  legsWonInSet = computed(() =>
    this.pointsAndDartsLegs.value
      .slice(legNumberBeforeCurrentSet.value)
      .reduce((acc, legStat) => (legStat[0] === 501 ? acc + 1 : acc), 0)
  );

  averagePointsGame = computed(
    () =>
      Math.round(
        ((this.pointsAndDartsLegs.value.reduce(
          (acc, legStat) => acc + legStat[0],
          0
        ) /
          this.pointsAndDartsLegs.value.reduce(
            (acc, legStat) => acc + legStat[1],
            0
          )) *
          3 || 0) * 100
      ) / 100
  );

  averagePointsSet = computed(
    () =>
      Math.round(
        ((this.pointsAndDartsLegs.value
          .slice(legNumberBeforeCurrentSet.value)
          .reduce((acc, legStat) => acc + legStat[0], 0) /
          this.pointsAndDartsLegs.value
            .slice(legNumberBeforeCurrentSet.value)
            .reduce((acc, legStat) => acc + legStat[1], 0)) *
          3 || 0) * 100
      ) / 100
  );

  averagePointsLeg = computed(
    () =>
      Math.round(
        ((this.pointsAndDartsLegs.value[legNumber.value - 1]?.[0] /
          this.pointsAndDartsLegs.value[legNumber.value - 1]?.[1]) *
          3 || 0) * 100
      ) / 100
  );

  percentDoubleGame = computed(
    () =>
      Math.round(
        ((this.legsWonInGame.value /
          this.dartsForDoubleSets.value.reduce(
            (acc, doubleSet) => acc + doubleSet,
            0
          )) *
          100 || 0) * 100
      ) / 100
  );

  percentDoubleSet = computed(
    () =>
      Math.round(
        ((this.legsWonInSet.value /
          this.dartsForDoubleSets.value[setNumber.value - 1]) *
          100 || 0) * 100
      ) / 100
  );

  p180Set = computed(() => this.p180Sets.value[setNumber.value - 1] || 0);
  p171Set = computed(() => this.p171Sets.value[setNumber.value - 1] || 0);
  p131Set = computed(() => this.p131Sets.value[setNumber.value - 1] || 0);
  p96Set = computed(() => this.p96Sets.value[setNumber.value - 1] || 0);

  p180Game = computed(() =>
    this.p180Sets.value.reduce((acc, p180) => acc + p180, 0)
  );
  p171Game = computed(() =>
    this.p171Sets.value.reduce((acc, p171) => acc + p171, 0)
  );
  p131Game = computed(() =>
    this.p131Sets.value.reduce((acc, p131) => acc + p131, 0)
  );
  p96Game = computed(() =>
    this.p96Sets.value.reduce((acc, p96) => acc + p96, 0)
  );

  averageFirstNineDartsGame = computed(
    () =>
      Math.round(
        (this.averagePointsForFirstNineDartsLegs.value.reduce(
          (acc, points) => acc + points,
          0
        ) / this.averagePointsForFirstNineDartsLegs.value.length || 0) * 100
      ) / 100
  );

  averageFirstNineDartsSet = computed(
    () =>
      Math.round(
        (this.averagePointsForFirstNineDartsLegs.value
          .slice(legNumberBeforeCurrentSet.value)
          .reduce((acc, firstNine) => acc + firstNine, 0) /
          this.averagePointsForFirstNineDartsLegs.value.slice(
            legNumberBeforeCurrentSet.value
          ).length || 0) * 100
      ) / 100
  );

  averagePointsWinLegsGame = computed(
    () =>
      Math.round(
        (((this.legsWonInGame.value * 501) /
          this.pointsAndDartsLegs.value.reduce(
            (acc, legStat) => (legStat[0] === 501 ? acc + legStat[1] : acc),
            0
          )) *
          3 || 0) * 100
      ) / 100
  );

  averagePointsWinLegsSet = computed(
    () =>
      Math.round(
        (((this.legsWonInSet.value * 501) /
          this.pointsAndDartsLegs.value
            .slice(legNumberBeforeCurrentSet.value)
            .reduce(
              (acc, legStat) => (legStat[0] === 501 ? acc + legStat[1] : acc),
              0
            )) *
          3 || 0) * 100
      ) / 100
  );
  averagePointsLoseLegsGame = computed(
    () =>
      Math.round(
        (((this.pointsAndDartsLegs.value.reduce(
          (acc, legStat) => (legStat[0] !== 501 ? acc + legStat[0] : acc),
          0
        ) -
          (this.pointsAndDartsLegs.value[legNumber.value - 1]?.[0] || 0)) /
          (this.pointsAndDartsLegs.value.reduce(
            (acc, legStat) => (legStat[0] !== 501 ? acc + legStat[1] : acc),
            0
          ) -
            (this.pointsAndDartsLegs.value[legNumber.value - 1]?.[1] || 0))) *
          3 || 0) * 100
      ) / 100
  );

  averagePointsLoseLegsSet = computed(
    () =>
      Math.round(
        (((this.pointsAndDartsLegs.value
          .slice(legNumberBeforeCurrentSet.value)
          .reduce(
            (acc, legStat) => (legStat[0] !== 501 ? acc + legStat[0] : acc),
            0
          ) -
          (this.pointsAndDartsLegs.value[legNumber.value - 1]?.[0] || 0)) /
          (this.pointsAndDartsLegs.value
            .slice(legNumberBeforeCurrentSet.value)
            .reduce(
              (acc, legStat) => (legStat[0] !== 501 ? acc + legStat[1] : acc),
              0
            ) -
            (this.pointsAndDartsLegs.value[legNumber.value - 1]?.[1] || 0))) *
          3 || 0) * 100
      ) / 100
  );

  highestCheckoutGame = computed(
    () =>
      Math.max(...JSON.parse(JSON.stringify(this.highestCheckoutSets.value)), 0)
    //в массиве появляется null если в каких-то сетах не было закрытий - почему без json не работало не знаю
    //обычный массив с null работал
  );

  highestCheckoutSet = computed(
    () => this.highestCheckoutSets.value[setNumber.value - 1] || 0
  );

  constructor(name) {
    this.name = name;
  }

  clearPointsAndRemaindersLeg() {
    this.legRemainders.value = [];
    this.legPoints.value = [];
  }

  setInPointsAndDartsLegs(points, darts, legNumber) {
    if (!this.pointsAndDartsLegs.value[legNumber - 1])
      this.pointsAndDartsLegs.value[legNumber - 1] = [0, 0];
    this.pointsAndDartsLegs.value[legNumber - 1][0] += points;
    this.pointsAndDartsLegs.value[legNumber - 1][1] += darts;
  }
  checkAndSetHighPoints(points) {
    if (points === 180) {
      this.p180Sets.value[setNumber.value - 1] ??= 0;
      this.p180Sets.value[setNumber.value - 1]++;
    }
    if (points >= 171 && points < 180) {
      this.p171Sets.value[setNumber.value - 1] ??= 0;
      this.p171Sets.value[setNumber.value - 1]++;
    }
    if (points >= 131 && points < 171) {
      this.p131Sets.value[setNumber.value - 1] ??= 0;
      this.p131Sets.value[setNumber.value - 1]++;
    }
    if (points >= 96 && points < 131) {
      this.p96Sets.value[setNumber.value - 1] ??= 0;
      this.p96Sets.value[setNumber.value - 1]++;
    }
  }

  checkAndSetHighestCheckout() {
    this.highestCheckoutSets.value[setNumber.value - 1] ??= 0;
    if (
      this.legRemainders.value.at(-1) >
      this.highestCheckoutSets.value[setNumber.value - 1]
    )
      this.highestCheckoutSets.value[setNumber.value - 1] =
        this.legRemainders.value.at(-1);
  }

  setAveragePointsForFirstNineDarts() {
    this.averagePointsForFirstNineDartsLegs.value[legNumber.value - 1] =
      Math.round(
        (this.pointsAndDartsLegs.value[legNumber.value - 1][0] /
          this.pointsAndDartsLegs.value[legNumber.value - 1][1]) *
          3 *
          100
      ) / 100;
  }
}

let playerOne;
let playerTwo;

const startGame = (parameters) => {
  gameParameters.value = parameters;
  startRemainder.value = gameParameters.value.startRemainder;
  playerOne = new Player(gameParameters.value[gameParameters.value.whoStarted]);
  playerTwo = new Player(
    gameParameters.value.whoStarted === 'nameOne'
      ? gameParameters.value.nameTwo
      : gameParameters.value.nameOne
  );
  isStartedGame.value = true;
  gameSetupModal.value.close();
  setTimeout(() => document.forms[0][document.forms[0].length - 2].focus(), 0);
};

const setPointsAndRemainder = async (point, remainder, player, roundNumber) => {
  let currentPlayer;
  if (player === 'playerOne') currentPlayer = playerOne;
  if (player === 'playerTwo') currentPlayer = playerTwo;

  if (roundNumber <= currentPlayer.legRemainders.value.length) { //блок для проверки внесения изменений - вынести в функцию
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

  if (remainder <= 50) {
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

  messageNumberDartsModal.value = 'Количество дротиков в подходе';
  const endNumberDarts = await getNumberDarts(numberDartsModal.value);
  messageNumberDartsModal.value = 'Количество дротиков на удвоение';
  const doubleNumberDarts = await getNumberDarts(numberDartsModal.value);

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

  currentPlayer.dartsForDoubleSets.value[setNumber.value - 1] ??= 0;
  currentPlayer.dartsForDoubleSets.value[setNumber.value - 1] +=
    doubleNumberDarts;
  currentPlayer.checkAndSetHighestCheckout();
  currentPlayer.checkAndSetHighPoints(currentPlayer.legRemainders.value.at(-1));

  if (currentPlayer.legsWonInSet.value === gameParameters.value.legs) {
    legNumberInSets.value.push(
      playerOne.legsWonInSet.value + playerTwo.legsWonInSet.value
    );
    currentPlayer.setsWon.value++;
    setNumber.value++;
  }

  playerOne.clearPointsAndRemaindersLeg();
  playerTwo.clearPointsAndRemaindersLeg();

  if (currentPlayer.setsWon.value === gameParameters.value.sets) {
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
    <GameSetup v-if="!isStartedGame" @startGame="startGame" />
  </dialog>
  <main class="game-page game">
    <button class="game__new-game-button" @click="startNewGame">
      Новый матч
    </button>
    <div class="game__players-information players-information">
      <div class="players-information__name">{{ playerOne?.name }}</div>
      <div class="players-information__legs-won" v-if="playerOne">
        L: {{ playerOne.legsWonInSet.value }}
      </div>
      <div class="players-information__sets-won" v-if="playerTwo">
        S: {{ playerOne.setsWon.value }}
      </div>
      <img class="darts-icon" src="/src/assets/images/darts.svg" alt="darts" />
      <div class="players-information__sets-won" v-if="playerTwo">
        S: {{ playerTwo.setsWon.value }}
      </div>
      <div class="players-information__legs-won" v-if="playerTwo">
        L: {{ playerTwo.legsWonInSet.value }}
      </div>
      <div class="players-information__name">{{ playerTwo?.name }}</div>
    </div>
    <div class="game__points-information points-information">
      <PlayerStatistic
        v-if="playerOne"
        :averagePointsGame="playerOne.averagePointsGame.value"
        :averagePointsSet="playerOne.averagePointsSet.value"
        :averagePointsLeg="playerOne.averagePointsLeg.value"
        :percentDoubleGame="playerOne.percentDoubleGame.value"
        :percentDoubleSet="playerOne.percentDoubleSet.value"
        :p180Set="playerOne.p180Set.value"
        :p171Set="playerOne.p171Set.value"
        :p131Set="playerOne.p131Set.value"
        :p96Set="playerOne.p96Set.value"
        :p180Game="playerOne.p180Game.value"
        :p171Game="playerOne.p171Game.value"
        :p131Game="playerOne.p131Game.value"
        :p96Game="playerOne.p96Game.value"
        :averageFirstNineDartsGame="playerOne.averageFirstNineDartsGame.value"
        :averageFirstNineDartsSet="playerOne.averageFirstNineDartsSet.value"
        :averagePointsWinLegsGame="playerOne.averagePointsWinLegsGame.value"
        :averagePointsWinLegsSet="playerOne.averagePointsWinLegsSet.value"
        :averagePointsLoseLegsGame="playerOne.averagePointsLoseLegsGame.value"
        :averagePointsLoseLegsSet="playerOne.averagePointsLoseLegsSet.value"
        :highestCheckoutGame="playerOne.highestCheckoutGame.value"
        :highestCheckoutSet="playerOne.highestCheckoutSet.value"
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
        v-if="playerTwo"
        :averagePointsGame="playerTwo.averagePointsGame.value"
        :averagePointsSet="playerTwo.averagePointsSet.value"
        :averagePointsLeg="playerTwo.averagePointsLeg.value"
        :percentDoubleGame="playerTwo.percentDoubleGame.value"
        :percentDoubleSet="playerTwo.percentDoubleSet.value"
        :p180Set="playerTwo.p180Set.value"
        :p171Set="playerTwo.p171Set.value"
        :p131Set="playerTwo.p131Set.value"
        :p96Set="playerTwo.p96Set.value"
        :p180Game="playerTwo.p180Game.value"
        :p171Game="playerTwo.p171Game.value"
        :p131Game="playerTwo.p131Game.value"
        :p96Game="playerTwo.p96Game.value"
        :averageFirstNineDartsGame="playerTwo.averageFirstNineDartsGame.value"
        :averageFirstNineDartsSet="playerTwo.averageFirstNineDartsSet.value"
        :averagePointsWinLegsGame="playerTwo.averagePointsWinLegsGame.value"
        :averagePointsWinLegsSet="playerTwo.averagePointsWinLegsSet.value"
        :averagePointsLoseLegsGame="playerTwo.averagePointsLoseLegsGame.value"
        :averagePointsLoseLegsSet="playerTwo.averagePointsLoseLegsSet.value"
        :highestCheckoutGame="playerTwo.highestCheckoutGame.value"
        :highestCheckoutSet="playerTwo.highestCheckoutSet.value"
      />
    </div>
  </main>
  <dialog class="dialog" ref="numberDartsModal" @cancel.prevent="">
    <NumberDartsModal
      :message="messageNumberDartsModal"
      :seenZero="seenZeroInNumberDartsModal"
    />
  </dialog>
  <dialog class="dialog" ref="gameOverModal" @cancel.prevent="">
    <GameOver
      v-if="isGameOver"
      @startNewGame="startNewGame"
      :nameP1="playerOne.name"
      :nameP2="playerTwo.name"
      :wonP1="playerOne.setsWon.value"
      :wonP2="playerTwo.setsWon.value"
      :averagePointsGameP2="playerTwo.averagePointsGame.value"
      :averagePointsWinLegsGameP2="playerTwo.averagePointsWinLegsGame.value"
      :averagePointsLoseLegsGameP2="playerTwo.averagePointsLoseLegsGame.value"
      :averageFirstNineDartsGameP2="playerTwo.averageFirstNineDartsGame.value"
      :p180GameP2="playerTwo.p180Game.value"
      :p171GameP2="playerTwo.p171Game.value"
      :p131GameP2="playerTwo.p131Game.value"
      :p96GameP2="playerTwo.p96Game.value"
      :percentDoubleGameP2="playerTwo.percentDoubleGame.value"
      :highestCheckoutGameP2="playerTwo.highestCheckoutGame.value"
      :averagePointsGameP1="playerOne.averagePointsGame.value"
      :averagePointsWinLegsGameP1="playerOne.averagePointsWinLegsGame.value"
      :averagePointsLoseLegsGameP1="playerOne.averagePointsLoseLegsGame.value"
      :averageFirstNineDartsGameP1="playerOne.averageFirstNineDartsGame.value"
      :p180GameP1="playerOne.p180Game.value"
      :p171GameP1="playerOne.p171Game.value"
      :p131GameP1="playerOne.p131Game.value"
      :p96GameP1="playerOne.p96Game.value"
      :percentDoubleGameP1="playerOne.percentDoubleGame.value"
      :highestCheckoutGameP1="playerOne.highestCheckoutGame.value"
    />
  </dialog>
</template>

<style lang="scss">
@use '@/assets/fonts';

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
    outline: none;
    border: 1px solid black;
    border-radius: 8px;
    font: inherit;
    font-size: 16px;
    background-color: transparent;
    transition: all 0.5s linear;

    &:focus,
    &:hover {
      background-color: black;
      color: white;
    }
  }

  &__players-information {
    display: flex;
    justify-content: center;
    overflow-x: hidden;
  }

  &__points-information {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }
}

.players-information {
  &__name {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
    font-size: 48px;
    white-space: nowrap;
    overflow-x: hidden;
  }
  &__sets-won,
  &__legs-won {
    width: 80px;
    align-self: center;
    font-size: 32px;
    text-align: center;
  }
}

.darts-icon {
  width: 96px;
  height: 96px;
  margin-left: 16px;
  margin-right: 16px;
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
  margin-top: 8px;
}

.round-information {
  &__remainder {
    width: 140px;
    font-size: 48px;
    text-align: center;
  }
  &__number-darts {
    width: 108px;
    margin-left: 32px;
    margin-right: 32px;
    font-size: 48px;
    font-weight: 700;
    text-align: center;
  }
}
</style>
