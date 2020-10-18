const rollerCoaster = ({ L, C, N, pis }: { L: number; C: number; N: number; pis: number[] }): number => {
  if (L === 0 || C === 0 || N === 0) {
    return 0;
  }

  let earnings = 0;
  let numberOfPeopleInTheCurrentRide = 0;
  let currentGroupIndex = 0;
  let numberOfGroupsInTheRide = 0;

  while (C > 0) {
    while (numberOfPeopleInTheCurrentRide + pis[currentGroupIndex] <= L && numberOfGroupsInTheRide < N) {
      numberOfPeopleInTheCurrentRide += pis[currentGroupIndex];
      currentGroupIndex = currentGroupIndex === N - 1 ? 0 : currentGroupIndex + 1;

      numberOfGroupsInTheRide++;
    }

    earnings += numberOfPeopleInTheCurrentRide;
    numberOfPeopleInTheCurrentRide = 0;
    numberOfGroupsInTheRide = 0;
    C--;
  }

  return earnings;
};

export { rollerCoaster };
