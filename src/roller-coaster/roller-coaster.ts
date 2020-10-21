type MemoizedRide = {
  nextGroupIndex: number;
  numberOfPeopleInRide: number;
};

type RidesCycle = {
  numberOfRidesPerCycle: number;
  earningsPerCycle: number;
};

type MemoizedRides = Map<number, MemoizedRide>;

const rollerCoaster = ({ L, C, N, pis }: { L: number; C: number; N: number; pis: number[] }): number => {
  if (L === 0 || C === 0 || N === 0) {
    return 0;
  }

  let earnings;

  const { updatedC, updatesEarnings, updatedGroupIndex, memoizedRidesByGroup } = getMemoizedValues({ L, C, N, pis });

  C = updatedC;
  earnings = updatesEarnings;

  if (C === 0) {
    return earnings;
  }

  const { numberOfRidesPerCycle, earningsPerCycle } = getRidesCycle(memoizedRidesByGroup, updatedGroupIndex);

  const earningsOfRemainingCycles = getEarningsOfRemainingCycles(C, numberOfRidesPerCycle, earningsPerCycle);
  const earningsOfLastIncompleteCycle = getEarningsOfLastIncompleteCycle(
    C,
    memoizedRidesByGroup,
    updatedGroupIndex,
    numberOfRidesPerCycle,
  );

  earnings += earningsOfRemainingCycles + earningsOfLastIncompleteCycle;

  return earnings;
};

const getEarningsOfLastIncompleteCycle = (
  C: number,
  memoizedRidesByGroup: MemoizedRides,
  currentGroupIndex: number,
  numberOfRidesPerCycle: number,
) => {
  const ridesLeft = C % numberOfRidesPerCycle;
  let earnings = 0;

  for (let i = 0; i < ridesLeft; i++) {
    const knowCombination = getMemoizedValue(memoizedRidesByGroup, currentGroupIndex);
    currentGroupIndex = knowCombination.nextGroupIndex;
    earnings += knowCombination.numberOfPeopleInRide;
  }

  return earnings;
};

const getEarningsOfRemainingCycles = (C: number, numberOfRidesPerCycle: number, earningsPerCycle: number) => {
  return Math.trunc(C / numberOfRidesPerCycle) * earningsPerCycle;
};

const getMemoizedValues = ({ L, C, N, pis }: { L: number; C: number; N: number; pis: number[] }) => {
  const memoizedRidesByGroup: MemoizedRides = new Map();

  let currentGroupIndex = 0;
  let earnings = 0;

  while (C > 0 && !memoizedRidesByGroup.has(currentGroupIndex)) {
    const indexToMemoize = currentGroupIndex;
    const newRide = makeNewMemoizedRide(L, N, pis, currentGroupIndex);

    currentGroupIndex = newRide.nextGroupIndex;
    earnings += newRide.numberOfPeopleInRide;
    memoizedRidesByGroup.set(indexToMemoize, newRide);

    C--;
  }

  return { updatedC: C, updatesEarnings: earnings, updatedGroupIndex: currentGroupIndex, memoizedRidesByGroup };
};

const getRidesCycle = (memoizedValues: MemoizedRides, startingGroupIndex: number): RidesCycle => {
  const visited = new Set();
  let currentValue = getMemoizedValue(memoizedValues, startingGroupIndex);

  visited.add(startingGroupIndex);

  let earningsPerCycle = currentValue.numberOfPeopleInRide;
  let numberOfRidesPerCycle = 1;

  while (!visited.has(currentValue.nextGroupIndex)) {
    currentValue = getMemoizedValue(memoizedValues, currentValue.nextGroupIndex);

    numberOfRidesPerCycle++;
    earningsPerCycle += currentValue.numberOfPeopleInRide;
  }

  return { numberOfRidesPerCycle, earningsPerCycle };
};

const makeNewMemoizedRide = (L: number, N: number, pis: number[], currentGroupIndex: number): MemoizedRide => {
  let numberOfPeopleInTheCurrentRide = 0;
  let numberOfGroupsInTheRide = 0;

  while (numberOfPeopleInTheCurrentRide + pis[currentGroupIndex] <= L && numberOfGroupsInTheRide < N) {
    numberOfPeopleInTheCurrentRide += pis[currentGroupIndex];
    currentGroupIndex = currentGroupIndex === N - 1 ? 0 : currentGroupIndex + 1;

    numberOfGroupsInTheRide++;
  }

  return { numberOfPeopleInRide: numberOfPeopleInTheCurrentRide, nextGroupIndex: currentGroupIndex };
};

const getMemoizedValue = (memoizedValues: MemoizedRides, index: number): MemoizedRide => {
  const value = memoizedValues.get(index);

  if (value === undefined) {
    throw 'Undefined memoized value';
  }

  return value;
};

export { rollerCoaster };
