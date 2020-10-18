const rollerCoaster = ({ L, C, N, pis }: { L: number; C: number; N: number; pis: number[] }): number => {
  if (L === 0 || C === 0 || N === 0) {
    return 0;
  }

  let earnings = 0;
  let currentGroupIndex = 0;

  const memoizedValues = new Map();

  while (C > 0) {
    if (!memoizedValues.has(currentGroupIndex)) {
      const indexToMemoize = currentGroupIndex;
      const { newValue } = getMemoizedValue(L, N, pis, currentGroupIndex);

      currentGroupIndex = newValue.newGroupIndex;
      earnings += newValue.numberOfPeopleInTheCurrentRide;
      memoizedValues.set(indexToMemoize, newValue);
    } else {
      const knowCombination = memoizedValues.get(currentGroupIndex);
      currentGroupIndex = knowCombination.newGroupIndex;
      earnings += knowCombination.numberOfPeopleInTheCurrentRide;
    }

    C--;
  }

  return earnings;
};

const getMemoizedValue = (L: number, N: number, pis: number[], currentGroupIndex: number) => {
  let numberOfPeopleInTheCurrentRide = 0;
  let numberOfGroupsInTheRide = 0;
  while (numberOfPeopleInTheCurrentRide + pis[currentGroupIndex] <= L && numberOfGroupsInTheRide < N) {
    numberOfPeopleInTheCurrentRide += pis[currentGroupIndex];
    currentGroupIndex = currentGroupIndex === N - 1 ? 0 : currentGroupIndex + 1;

    numberOfGroupsInTheRide++;
  }
  return { newValue: { numberOfPeopleInTheCurrentRide, newGroupIndex: currentGroupIndex } };
};

export { rollerCoaster };
