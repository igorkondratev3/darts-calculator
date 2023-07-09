import { computed, ref } from 'vue';

export const useNewGame = () => {
  const startRemainder = ref(0);
  const legNumber = ref(1);
  const setNumber = ref(1);
  const legNumberInSets = ref([]);

  const legNumberBeforeCurrentSet = computed(() =>
    legNumberInSets.value.reduce((acc, legNumber) => acc + legNumber, 0)
  );

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

    constructor(name, player) {
      this.name = name;
      if (player) {
        this.legRemainders.value = player.legRemainders;
        this.legPoints.value = player.legPoints;
        this.pointsAndDartsLegs.value = player.pointsAndDartsLegs;
        this.dartsForDoubleSets.value = player.dartsForDoubleSets;
        this.p180Sets.value = player.p180Sets;
        this.p171Sets.value = player.p171Sets;
        this.p131Sets.value = player.p131Sets;
        this.p96Sets.value = player.p96Sets;
        this.averagePointsForFirstNineDartsLegs.value =
          player.averagePointsForFirstNineDartsLegs;
        this.highestCheckoutSets.value = player.highestCheckoutSets;
        this.setsWon.value = player.setsWon;
      }

      this.legStatForEndGame = {
        dartsForDouble: 0,
        p180: 0,
        p171: 0,
        p131: 0,
        p96: 0
      };
      Object.defineProperty(this.legStatForEndGame, 'reset', {
        value: function () {
          for (const key in this) this[key] = 0;
        },
        writable: false,
        enumerable: false,
        configurable: false
      });
    }

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

    averagePointsLeg = computed(
      () =>
        Math.round(
          ((this.pointsAndDartsLegs.value[legNumber.value - 1]?.[0] /
            this.pointsAndDartsLegs.value[legNumber.value - 1]?.[1]) *
            3 || 0) * 100
        ) / 100
    );

    gameStatistic = {
      averagePoints: computed(
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
      ),
      percentDouble: computed(
        () =>
          Math.round(
            ((this.legsWonInGame.value /
              this.dartsForDoubleSets.value.reduce(
                (acc, doubleSet) => acc + doubleSet,
                0
              )) *
              100 || 0) * 100
          ) / 100
      ),
      p180: computed(() =>
        this.p180Sets.value.reduce((acc, p180) => acc + p180, 0)
      ),
      p171: computed(() =>
        this.p171Sets.value.reduce((acc, p171) => acc + p171, 0)
      ),
      p131: computed(() =>
        this.p131Sets.value.reduce((acc, p131) => acc + p131, 0)
      ),
      p96: computed(() =>
        this.p96Sets.value.reduce((acc, p96) => acc + p96, 0)
      ),
      averageFirstNineDarts: computed(
        () =>
          Math.round(
            (this.averagePointsForFirstNineDartsLegs.value.reduce(
              (acc, points) => acc + points,
              0
            ) / this.averagePointsForFirstNineDartsLegs.value.length || 0) * 100
          ) / 100
      ),
      averagePointsWinLegs: computed(
        () =>
          Math.round(
            (((this.legsWonInGame.value * 501) /
              this.pointsAndDartsLegs.value.reduce(
                (acc, legStat) => (legStat[0] === 501 ? acc + legStat[1] : acc),
                0
              )) *
              3 || 0) * 100
          ) / 100
      ),

      averagePointsLoseLegs: computed(
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
                (this.pointsAndDartsLegs.value[legNumber.value - 1]?.[1] ||
                  0))) *
              3 || 0) * 100
          ) / 100
      ),
      highestCheckout: computed(
        () =>
          Math.max(
            ...JSON.parse(JSON.stringify(this.highestCheckoutSets.value)),
            0
          )
        //в массиве появляется null если в каких-то сетах не было закрытий - почему без json не работало не знаю
        //обычный массив с null работал
      )
    };

    setStatistic = {
      averagePoints: computed(
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
      ),
      percentDouble: computed(
        () =>
          Math.round(
            ((this.legsWonInSet.value /
              this.dartsForDoubleSets.value[setNumber.value - 1]) *
              100 || 0) * 100
          ) / 100
      ),
      p180: computed(() => this.p180Sets.value[setNumber.value - 1] || 0),
      p171: computed(() => this.p171Sets.value[setNumber.value - 1] || 0),
      p131: computed(() => this.p131Sets.value[setNumber.value - 1] || 0),
      p96: computed(() => this.p96Sets.value[setNumber.value - 1] || 0),
      averageFirstNineDarts: computed(
        () =>
          Math.round(
            (this.averagePointsForFirstNineDartsLegs.value
              .slice(legNumberBeforeCurrentSet.value)
              .reduce((acc, firstNine) => acc + firstNine, 0) /
              this.averagePointsForFirstNineDartsLegs.value.slice(
                legNumberBeforeCurrentSet.value
              ).length || 0) * 100
          ) / 100
      ),
      averagePointsWinLegs: computed(
        () =>
          Math.round(
            (((this.legsWonInSet.value * 501) /
              this.pointsAndDartsLegs.value
                .slice(legNumberBeforeCurrentSet.value)
                .reduce(
                  (acc, legStat) =>
                    legStat[0] === 501 ? acc + legStat[1] : acc,
                  0
                )) *
              3 || 0) * 100
          ) / 100
      ),
      averagePointsLoseLegs: computed(
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
                  (acc, legStat) =>
                    legStat[0] !== 501 ? acc + legStat[1] : acc,
                  0
                ) -
                (this.pointsAndDartsLegs.value[legNumber.value - 1]?.[1] ||
                  0))) *
              3 || 0) * 100
          ) / 100
      ),
      highestCheckout: computed(
        () => this.highestCheckoutSets.value[setNumber.value - 1] || 0
      )
    };

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
        this.legStatForEndGame.p180++;
      }
      if (points >= 171 && points < 180) {
        this.p171Sets.value[setNumber.value - 1] ??= 0;
        this.p171Sets.value[setNumber.value - 1]++;
        this.legStatForEndGame.p171++;
      }
      if (points >= 131 && points < 171) {
        this.p131Sets.value[setNumber.value - 1] ??= 0;
        this.p131Sets.value[setNumber.value - 1]++;
        this.legStatForEndGame.p131++;
      }
      if (points >= 96 && points < 131) {
        this.p96Sets.value[setNumber.value - 1] ??= 0;
        this.p96Sets.value[setNumber.value - 1]++;
        this.legStatForEndGame.p96++;
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

    calcStatWithoutLastLeg(legNumber) {
      return {
        averagePoints: {
          value:
            Math.round(
              (((this.pointsAndDartsLegs.value.reduce(
                (acc, legStat) => acc + legStat[0],
                0
              ) -
                this.pointsAndDartsLegs.value.at(-1)[0]) /
                (this.pointsAndDartsLegs.value.reduce(
                  (acc, legStat) => acc + legStat[1],
                  0
                ) -
                  this.pointsAndDartsLegs.value.at(-1)[1])) *
                3 || 0) * 100
            ) / 100
        },
        percentDouble: {
          value:
            Math.round(
              ((this.legsWonInGame.value /
                (this.dartsForDoubleSets.value.reduce(
                  (acc, doubleSet) => acc + doubleSet,
                  0
                ) -
                  this.legStatForEndGame.dartsForDouble)) *
                100 || 0) * 100
            ) / 100
        },
        p180: {
          value: this.gameStatistic.p180.value - this.legStatForEndGame.p180
        },
        p171: {
          value: this.gameStatistic.p171.value - this.legStatForEndGame.p171
        },
        p131: {
          value: this.gameStatistic.p131.value - this.legStatForEndGame.p131
        },
        p96: {
          value: this.gameStatistic.p96.value - this.legStatForEndGame.p96
        },
        averageFirstNineDarts: {
          value:
            legNumber > this.averagePointsForFirstNineDartsLegs.value.length
              ? this.gameStatistic.averageFirstNineDarts.value
              : Math.round(
                  ((this.averagePointsForFirstNineDartsLegs.value.reduce(
                    (acc, points) => acc + points,
                    0
                  ) -
                    this.averagePointsForFirstNineDartsLegs.value.at(-1)) /
                    (this.averagePointsForFirstNineDartsLegs.value.length -
                      1) || 0) * 100
                ) / 100
        },
        averagePointsWinLegs: {
          value: this.gameStatistic.averagePointsWinLegs.value
        },
        averagePointsLoseLegs: {
          value: this.gameStatistic.averagePointsLoseLegs.value
        },
        highestCheckout: {
          value: this.gameStatistic.highestCheckout.value
        }
      };
    }
  }

  return { Player, startRemainder, legNumber, setNumber, legNumberInSets };
};
