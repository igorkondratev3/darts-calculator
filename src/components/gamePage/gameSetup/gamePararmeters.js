import { ref, computed } from 'vue';
import { useUsersStore } from '@/stores/users';

export class GameParameters {
  #usersStore = useUsersStore();
  constructor(gameParameters) {
    this.nameP1 = computed(
      () =>
        this.#usersStore.users.P1?.name ||
        ref(gameParameters?.nameP1 || 'Игрок 1')
    );
    this.nameP2 = computed(
      () =>
        this.#usersStore.users.P2?.name ||
        ref(gameParameters?.nameP2 || 'Игрок 2')
    );
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

  normalize() {
    const result = {};
    for (const parameterName in this)
      result[parameterName] = this[parameterName].value;
    if (result.nameP1.value) result.nameP1 = result.nameP1.value;
    if (result.nameP2.value) result.nameP2 = result.nameP2.value;

    if (result.whoStarts === 'nameP2') {
      const isPercentDoubleInStatP1 = result.isPercentDoubleInStatP1;
      result.isPercentDoubleInStatP1 = result.isPercentDoubleInStatP2;
      result.isPercentDoubleInStatP2 = isPercentDoubleInStatP1;
      const nameP1 = result.nameP1;
      result.nameP1 = result.nameP2;
      result.nameP2 = nameP1;
    }
    return result;
  }
}
