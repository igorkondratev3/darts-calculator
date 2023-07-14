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
      return 'Наибольшие закрытия';
    default:
      return name;
  }
};

export const formattedDate = (ddmmyyyy) => {
  const yyyymmdd = ddmmyyyy.split('-').reverse().join('-');
  return yyyymmdd;
};
