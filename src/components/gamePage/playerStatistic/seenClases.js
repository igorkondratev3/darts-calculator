import { ref, computed } from 'vue';

export class SeenParameters {
  constructor(isSeen, isPercentDouble) {
    this.averagePoints = ref(isSeen);
    this.averageFirstNineDarts = ref(isSeen);
    this.averagePointsWinLegs = ref(isSeen);
    this.averagePointsLoseLegs = ref(isSeen);
    this.p180 = ref(isSeen);
    this.p171 = ref(isSeen);
    this.p131 = ref(isSeen);
    this.p96 = ref(isSeen);
    this.percentDouble = ref(isSeen && isPercentDouble);
    this.highestCheckout = ref(isSeen);
  }

  points = computed(
    () =>
      this.p180.value || this.p171.value || this.p131.value || this.p96.value
  );

  selectAll() {
    for (const key in this) if (key !== 'points') this[key].value = true;
  }

  removeSelection() {
    for (const key in this) if (key !== 'points') this[key].value = false;
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