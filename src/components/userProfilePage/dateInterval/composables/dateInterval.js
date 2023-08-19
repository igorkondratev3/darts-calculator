import { ref, watch } from 'vue';

export const useDateInterval = (minDate, maxDate, globalRangeDate, emits) => {
  const startDate = ref(minDate.value);
  const endDate = ref(maxDate.value);

  watch(globalRangeDate, () => {
    startDate.value = globalRangeDate.start;
    endDate.value = globalRangeDate.end;
    changeDateInterval();
  });

  watch(minDate, () => {
    startDate.value = minDate.value;
    changeDateInterval();
  });

  watch(maxDate, () => {
    startDate.value = maxDate.value;
    changeDateInterval();
  });

  const dateValidate = () => {
    startDateValidate(startDate, minDate.value, maxDate.value);
    endDateValidate(endDate, minDate.value, maxDate.value);
    dateIntervalValidate(startDate, endDate, minDate.value, maxDate.value);
  };

  const changeDateInterval = () => {
    dateValidate();
    emits('updateDates', startDate.value, endDate.value);
  };

  return { startDate, endDate, changeDateInterval };
};

const startDateValidate = (startDate, minDate, maxDate) => {
  const arrDate = startDate.value.split('-').map((value) => Number(value));
  const arrMinDate = minDate.split('-').map((value) => Number(value));
  const arrMaxDate = maxDate.split('-').map((value) => Number(value));
  if (arrDate[0] < arrMinDate[0] || arrDate[0] > arrMaxDate[0]) {
    startDate.value = minDate;
    return;
  }

  if (arrDate[0] === arrMinDate[0] && arrDate[1] < arrMinDate[1]) {
    startDate.value = minDate;
    return;
  }

  if (arrDate[0] === arrMaxDate[0] && arrDate[1] > arrMaxDate[1]) {
    startDate.value = minDate;
    return;
  }

  if (
    arrDate[0] === arrMinDate[0] &&
    arrDate[1] === arrMinDate[1] &&
    arrDate[2] < arrMinDate[2]
  ) {
    startDate.value = minDate;
    return;
  }

  if (
    arrDate[0] === arrMaxDate[0] &&
    arrDate[1] === arrMaxDate[1] &&
    arrDate[2] > arrMaxDate[2]
  ) {
    startDate.value = minDate;
    return;
  }
};

const endDateValidate = (endDate, minDate, maxDate) => {
  const arrDate = endDate.value.split('-').map((value) => Number(value));
  const arrMinDate = minDate.split('-').map((value) => Number(value));
  const arrMaxDate = maxDate.split('-').map((value) => Number(value));

  if (arrDate[0] < arrMinDate[0] || arrDate[0] > arrMaxDate[0]) {
    endDate.value = maxDate;
    return;
  }

  if (arrDate[0] === arrMinDate[0] && arrDate[1] < arrMinDate[1]) {
    endDate.value = maxDate;
    return;
  }

  if (arrDate[0] === arrMaxDate[0] && arrDate[1] > arrMaxDate[1]) {
    endDate.value = maxDate;
    return;
  }

  if (
    arrDate[0] === arrMinDate[0] &&
    arrDate[1] === arrMinDate[1] &&
    arrDate[2] < arrMinDate[2]
  ) {
    endDate.value = maxDate;
    return;
  }

  if (
    arrDate[0] === arrMaxDate[0] &&
    arrDate[1] === arrMaxDate[1] &&
    arrDate[2] > arrMaxDate[2]
  ) {
    endDate.value = maxDate;
    return;
  }
};

const dateIntervalValidate = (startDate, endDate, minDate, maxDate) => {
  const arrStartDate = startDate.value.split('-').map((value) => Number(value));
  const arrEndDate = endDate.value.split('-').map((value) => Number(value));

  //потом обнулять в заивисмости от проверяемого значения
  if (arrStartDate[0] > arrEndDate[0]) {
    startDate.value = minDate;
    endDate.value = maxDate;
    return;
  }

  if (arrStartDate[0] === arrEndDate[0] && arrStartDate[1] > arrEndDate[1]) {
    startDate.value = minDate;
    endDate.value = maxDate;
    return;
  }

  if (
    arrStartDate[0] === arrEndDate[0] &&
    arrStartDate[1] === arrEndDate[1] &&
    arrStartDate[2] > arrEndDate[2]
  ) {
    startDate.value = minDate;
    endDate.value = maxDate;
    return;
  }
};
