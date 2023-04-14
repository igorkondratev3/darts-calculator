import { ref } from 'vue';

export class GameParameters {
  constructor(gameParameters) {
    this.nameP1 = ref(gameParameters?.nameP1 || 'Игрок 1');
    this.nameP2 = ref(gameParameters?.nameP2 || 'Игрок 2');
    this.startRemainder = ref(gameParameters?.startRemainder || 501);
    this.whoStarts = ref(gameParameters?.whoStarts || 'nameP1');
    this.legsToWin = ref(gameParameters?.legsToWin || 1);
    this.setsToWin = ref(gameParameters?.setsToWin || 1);
    this.areSetsInGame = ref(gameParameters?.areSetsInGame || false);
    this.isPercentDoubleInStatP1 = ref(
      gameParameters?.isPercentDoubleInStatP1 || false
    );
    this.isPercentDoubleInStatP2 = ref(
      gameParameters?.isPercentDoubleInStatP2 || false
    );
  }
};