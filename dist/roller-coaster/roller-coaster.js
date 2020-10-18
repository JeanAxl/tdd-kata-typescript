"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollerCoaster = void 0;
const fs_1 = __importDefault(require("fs"));
const rollerCoaster = ({ L, C, N, pis }) => {
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
exports.rollerCoaster = rollerCoaster;
const file = fs_1.default.readFileSync('./src/roller-coaster/roller_coaster.hard').toString('utf-8');
const textByLine = file.split('\n');
const firstLine = textByLine[0].split(' ').map((el) => +el);
const rest = textByLine.slice(1).map((el) => {
    console.log(el);
    return +el;
});
console.log({ L: firstLine[0], C: firstLine[1], N: firstLine[2], pis: rest });
rollerCoaster({ L: firstLine[0], C: firstLine[1], N: firstLine[2], pis: rest });
//# sourceMappingURL=roller-coaster.js.map