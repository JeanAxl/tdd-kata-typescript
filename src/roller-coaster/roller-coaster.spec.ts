import fs from 'fs';

import { rollerCoaster } from './roller-coaster';

const parseFile = (name: string) => {
  const file = fs.readFileSync('./src/roller-coaster/' + name).toString('utf-8');
  const textByLine = file.split('\n');
  const firstLine = textByLine[0].split(' ').map((el) => +el);
  const rest = textByLine.slice(1).map((el) => {
    return +el;
  });

  return { L: firstLine[0], C: firstLine[1], N: firstLine[2], pis: rest };
};

describe('roller coaster', () => {
  it('should return 0 when no groups or no places or no functions time per day', () => {
    const result: number = rollerCoaster({ L: 0, C: 0, N: 0, pis: [] });
    expect(result).toEqual(0);
  });

  it('should fill 1 ride', () => {
    // One Group
    expect(rollerCoaster({ L: 10, C: 1, N: 1, pis: [5] })).toEqual(5);
    expect(rollerCoaster({ L: 10, C: 1, N: 1, pis: [10] })).toEqual(10);
    expect(rollerCoaster({ L: 10, C: 1, N: 1, pis: [11] })).toEqual(0);

    // Two groups
    expect(rollerCoaster({ L: 10, C: 1, N: 2, pis: [5, 4] })).toEqual(9);
    expect(rollerCoaster({ L: 10, C: 1, N: 2, pis: [5, 10] })).toEqual(5);
    expect(rollerCoaster({ L: 10, C: 1, N: 2, pis: [11, 10] })).toEqual(0);

    // Four groups
    expect(rollerCoaster({ L: 10, C: 1, N: 4, pis: [1, 2, 2, 2] })).toEqual(7);
    expect(rollerCoaster({ L: 10, C: 1, N: 4, pis: [10, 2, 2, 2] })).toEqual(10);
    expect(rollerCoaster({ L: 10, C: 1, N: 4, pis: [11, 2, 2, 2] })).toEqual(0);
  });

  it('should fill multiple rides', () => {
    // One group per ride
    expect(rollerCoaster({ L: 10, C: 2, N: 2, pis: [5, 9] })).toEqual(14);
    expect(rollerCoaster({ L: 10, C: 3, N: 3, pis: [5, 9, 5] })).toEqual(24);

    // Groups should go back to the queue
    expect(rollerCoaster({ L: 10, C: 3, N: 2, pis: [5, 9] })).toEqual(19);
    expect(rollerCoaster({ L: 15, C: 2, N: 4, pis: [5, 5, 5, 5] })).toEqual(30);
    expect(rollerCoaster({ L: 15, C: 2, N: 2, pis: [5, 5] })).toEqual(20);
  });

  describe('large inputs', () => {
    it('should run roller_coaster.hard', () => {
      const inputs = parseFile('roller_coaster.hard');
      expect(rollerCoaster(inputs)).toEqual(8974489271113753);
    });

    it('should run roller_coaster.hard from coding game', () => {
      const inputs = parseFile('roller_coaster.cg');
      expect(rollerCoaster(inputs)).toEqual(89744892565569);
    });

    it('should run roller_coaster.harder', () => {
      const inputs = parseFile('roller_coaster.harder');
      expect(rollerCoaster(inputs)).toEqual(89744892714152289);
    });
  });
});
