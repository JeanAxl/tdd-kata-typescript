"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const roller_coaster_1 = require("./roller-coaster");
describe('roller coaster', () => {
    it('should return 0 when no groups or no places or no functions time per day', () => {
        const result = roller_coaster_1.rollerCoaster({ L: 0, C: 0, N: 0, pis: [] });
        expect(result).toEqual(0);
    });
    it('should fill 1 ride', () => {
        expect(roller_coaster_1.rollerCoaster({ L: 10, C: 1, N: 1, pis: [5] })).toEqual(5);
        expect(roller_coaster_1.rollerCoaster({ L: 10, C: 1, N: 1, pis: [10] })).toEqual(10);
        expect(roller_coaster_1.rollerCoaster({ L: 10, C: 1, N: 1, pis: [11] })).toEqual(0);
        expect(roller_coaster_1.rollerCoaster({ L: 10, C: 1, N: 2, pis: [5, 4] })).toEqual(9);
        expect(roller_coaster_1.rollerCoaster({ L: 10, C: 1, N: 2, pis: [5, 10] })).toEqual(5);
        expect(roller_coaster_1.rollerCoaster({ L: 10, C: 1, N: 2, pis: [11, 10] })).toEqual(0);
        expect(roller_coaster_1.rollerCoaster({ L: 10, C: 1, N: 4, pis: [1, 2, 2, 2] })).toEqual(7);
        expect(roller_coaster_1.rollerCoaster({ L: 10, C: 1, N: 4, pis: [10, 2, 2, 2] })).toEqual(10);
        expect(roller_coaster_1.rollerCoaster({ L: 10, C: 1, N: 4, pis: [11, 2, 2, 2] })).toEqual(0);
    });
    it('should fill multiple rides', () => {
        expect(roller_coaster_1.rollerCoaster({ L: 10, C: 2, N: 2, pis: [5, 9] })).toEqual(14);
        expect(roller_coaster_1.rollerCoaster({ L: 10, C: 3, N: 3, pis: [5, 9, 5] })).toEqual(24);
        expect(roller_coaster_1.rollerCoaster({ L: 10, C: 3, N: 2, pis: [5, 9] })).toEqual(19);
        expect(roller_coaster_1.rollerCoaster({ L: 15, C: 2, N: 4, pis: [5, 5, 5, 5] })).toEqual(30);
        expect(roller_coaster_1.rollerCoaster({ L: 15, C: 2, N: 2, pis: [5, 5] })).toEqual(20);
    });
    it('should run hard', async () => {
        const file = fs_1.default.readFileSync('./src/roller-coaster/roller_coaster.hard').toString('utf-8');
        const textByLine = file.split('\n');
        const firstLine = textByLine[0].split(' ').map((el) => +el);
        const rest = textByLine.slice(1).map((el) => {
            console.log(el);
            return +el;
        });
        console.log({ L: firstLine[0], C: firstLine[1], N: firstLine[2], pis: rest });
        expect(roller_coaster_1.rollerCoaster({ L: firstLine[0], C: firstLine[1], N: firstLine[2], pis: rest })).toEqual(20);
    });
});
//# sourceMappingURL=roller-coaster.spec.js.map