"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FizzBuzz {
    fizzBuzz(input) {
        if (input % 3 === 0) {
            if (input % 5 === 0) {
                return 'fizzBuzz';
            }
            return 'fizz';
        }
        if (input % 5 === 0) {
            return 'buzz';
        }
        return input.toString();
    }
}
exports.default = FizzBuzz;
//# sourceMappingURL=fizzBuzz.js.map