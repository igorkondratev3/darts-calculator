import { ref, computed } from 'vue';

export class SeenParameters {
  constructor(isSeen, isPercentDoubleInStat, seenParameters) {
    for (const parameterName in seenParameters)
      this[parameterName] = ref(isSeen && seenParameters[parameterName]);
    if (!seenParameters) {
      this.averagePoints = ref(isSeen);
      this.averageFirstNineDarts = ref(isSeen);
      this.averagePointsWinLegs = ref(isSeen);
      this.averagePointsLoseLegs = ref(isSeen);
      this.p180 = ref(isSeen);
      this.p171 = ref(isSeen);
      this.p131 = ref(isSeen);
      this.p96 = ref(isSeen);
      this.percentDouble = ref(isSeen && isPercentDoubleInStat);
      this.highestCheckout = ref(isSeen);
    }
    Object.defineProperty(this, 'points', {
      value: computed(
        () =>
          this.p180.value ||
          this.p171.value ||
          this.p131.value ||
          this.p96.value
      ),
      writable: true,
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(this, 'pointsGroup', {
      value: {
        p180: this.p180,
        p171: this.p171,
        p131: this.p131,
        p96: this.p96
      },
      writable: true,
      enumerable: false,
      configurable: false
    });
  }

  unRef() {
    const result = {};
    for (const key in this) result[key] = this[key].value;
    return result;
  };

  selectAll() {
    for (const key in this) this[key].value = true;
  }

  removeSelection() {
    for (const key in this) this[key].value = false;
  }
}

export class SeenGroups {
  constructor(gameSeen, setSeen, seenAveragePointsLeg) {
    this.averageFirstNineDarts = computed(
      () =>
        gameSeen.averageFirstNineDarts.value ||
        setSeen.averageFirstNineDarts.value
    );
    this.averagePointsWinLegs = computed(
      () =>
        gameSeen.averagePointsWinLegs.value ||
        setSeen.averagePointsWinLegs.value
    );

    this.averagePointsLoseLegs = computed(
      () =>
        gameSeen.averagePointsLoseLegs.value ||
        setSeen.averagePointsLoseLegs.value
    );
    this.averagePoints = computed(
      () =>
        gameSeen.averagePoints.value ||
        setSeen.averagePoints.value ||
        seenAveragePointsLeg.value ||
        this.averageFirstNineDarts.value ||
        this.averagePointsWinLegs.value ||
        this.averagePointsLoseLegs.value
    );
    this.points = computed(() => gameSeen.points.value || setSeen.points.value);

    this.double = computed(
      () => gameSeen.percentDouble.value || setSeen.percentDouble.value
    );

    this.highest = computed(
      () => gameSeen.highestCheckout.value || setSeen.highestCheckout.value
    );

    this.closing = computed(() => this.double.value || this.highest.value);
  }
}
