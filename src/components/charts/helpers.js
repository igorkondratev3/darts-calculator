export const translateName = (name) => {
  switch (name) {
    case 'averagePoints':
      return 'Средний набор';
    case 'averagePointsWinLegs':
      return 'Выигранные леги';
    case 'averagePointsLoseLegs':
      return 'Проигранные леги';
    case 'averageFirstNineDarts':
      return '9 дротиков';
    case 'p180':
      return '180 очков';
    case 'p171':
      return '171+ очков';
    case 'p131':
      return '131+ очков';
    case 'p96':
      return '96+ очков';
    case 'percentDouble':
      return 'Процент удвоений';
    case 'highestCheckout':
      return 'Набольшие закрытия';
    default:
      return name;
  }
};

export const formattedDate = (ddmmyyyy) => {
  const yyyymmdd = ddmmyyyy.split('-').reverse().join('-');
  return yyyymmdd;
};

export const isDateInInterval = (date, startDate, endDate) => {
  const dateArr = date.split('-').map((value) => Number(value));
  const startDateArr = startDate.split('-').map((value) => Number(value));
  const endDateArr = endDate.split('-').map((value) => Number(value));

  if (dateArr[0] < startDateArr[0] || dateArr[0] > endDateArr[0]) return false;

  if (dateArr[0] === startDateArr[0] && dateArr[1] < startDateArr[1])
    return false;

  if (dateArr[0] === endDateArr[0] && dateArr[1] > endDateArr[1]) return false;

  if (
    dateArr[0] === startDateArr[0] &&
    dateArr[1] === startDateArr[1] &&
    dateArr[2] < startDateArr[2]
  )
    return false;

  if (
    dateArr[0] === endDateArr[0] &&
    dateArr[1] === endDateArr[1] &&
    dateArr[2] > endDateArr[2]
  )
    return false;

  return true;
};

export const calculateLineHeight = (chartHeight, maxValue, currentValue) =>
  (chartHeight / maxValue) * currentValue || 7;
//чтобы нулевые показатели были видны

export const calculateX = (indexLine, lineWidth) =>
  indexLine * lineWidth + indexLine;
export const calculateY = (chartHeight, maxValue, currentValue) =>
  chartHeight - calculateLineHeight(chartHeight, maxValue, currentValue);

export const calculateLineWidth = (chartWidth, numberOfValues) => {
  const breakLength = numberOfValues - 1;
  let lineWidth = (chartWidth - breakLength) / numberOfValues;
  if (lineWidth > 25) lineWidth = 25;
  if (lineWidth < 7) lineWidth = 7;
  return lineWidth;
}; //не будет помещяться при маленьком значении подумать (когдп много параметров)

export const startDateValidate = (startDate, minDate, maxDate) => {
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

export const endDateValidate = (endDate, minDate, maxDate) => {
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

export const dateIntervalValidate = (startDate, endDate, minDate, maxDate) => {
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
