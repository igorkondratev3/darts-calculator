export const swapPlayersInLS = () => {
  if (localStorage.getItem('userP1') && localStorage.getItem('userP2')) {
    const playerOne = localStorage.getItem('userP1');
    localStorage.setItem('userP1', localStorage.getItem('userP2'));
    localStorage.setItem('userP2', playerOne);
  }
  if (localStorage.getItem('userP1') && !localStorage.getItem('userP2')) {
    localStorage.setItem('userP2', localStorage.getItem('userP1'));
    localStorage.removeItem('userP1');
  } else if (
    !localStorage.getItem('userP1') &&
    localStorage.getItem('userP2')
  ) {
    localStorage.setItem('userP1', localStorage.getItem('userP2'));
    localStorage.removeItem('userP2');
  }

  if (
    localStorage.getItem('seenAveragePointsLegP2') &&
    localStorage.getItem('seenAveragePointsLegP1')
  ) {
    const seenP1 = localStorage.getItem('seenAveragePointsLegP1');
    localStorage.setItem(
      'seenAveragePointsLegP1',
      localStorage.getItem('seenAveragePointsLegP2')
    );
    localStorage.setItem('seenAveragePointsLegP2', seenP1);
  }
  if (
    localStorage.getItem('seenAveragePointsLegP1') &&
    !localStorage.getItem('seenAveragePointsLegP2')
  ) {
    localStorage.setItem(
      'seenAveragePointsLegP2',
      localStorage.getItem('seenAveragePointsLegP1')
    );
    localStorage.removeItem('seenAveragePointsLegP1');
  } else if (
    !localStorage.getItem('seenAveragePointsLegP1') &&
    localStorage.getItem('seenAveragePointsLegP2')
  ) {
    localStorage.setItem(
      'seenAveragePointsLegP1',
      localStorage.getItem('seenAveragePointsLegP2')
    );
    localStorage.removeItem('seenAveragePointsLegP2');
  }

  if (
    localStorage.getItem('seenParametersSetP2') &&
    localStorage.getItem('seenParametersSetP1')
  ) {
    const seenP1 = localStorage.getItem('seenParametersSetP1');
    localStorage.setItem(
      'seenParametersSetP1',
      localStorage.getItem('seenParametersSetP2')
    );
    localStorage.setItem('seenParametersSetP2', seenP1);
  }
  if (
    localStorage.getItem('seenParametersSetP1') &&
    !localStorage.getItem('seenParametersSetP2')
  ) {
    localStorage.setItem(
      'seenParametersSetP2',
      localStorage.getItem('seenParametersSetP1')
    );
    localStorage.removeItem('seenParametersSetP1');
  } else if (
    !localStorage.getItem('seenParametersSetP1') &&
    localStorage.getItem('seenParametersSetP2')
  ) {
    localStorage.setItem(
      'seenParametersSetP1',
      localStorage.getItem('seenParametersSetP2')
    );
    localStorage.removeItem('seenParametersSetP2');
  }

  if (
    localStorage.getItem('seenParametersGameP2') &&
    localStorage.getItem('seenParametersGameP1')
  ) {
    const seenP1 = localStorage.getItem('seenParametersGameP1');
    localStorage.setItem(
      'seenParametersGameP1',
      localStorage.getItem('seenParametersGameP2')
    );
    localStorage.setItem('seenParametersGameP2', seenP1);
  }
  if (
    localStorage.getItem('seenParametersGameP1') &&
    !localStorage.getItem('seenParametersGameP2')
  ) {
    localStorage.setItem(
      'seenParametersGameP2',
      localStorage.getItem('seenParametersGameP1')
    );
    localStorage.removeItem('seenParametersGameP1');
  } else if (
    !localStorage.getItem('seenParametersGameP1') &&
    localStorage.getItem('seenParametersGameP2')
  ) {
    localStorage.setItem(
      'seenParametersGameP1',
      localStorage.getItem('seenParametersGameP2')
    );
    localStorage.removeItem('seenParametersGameP2');
  }
};
