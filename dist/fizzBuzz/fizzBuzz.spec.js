"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fizzBuzz_1 = __importDefault(require("./fizzBuzz"));
describe('fizzBuzz', () => {
    let fizzBuzz;
    beforeEach(() => {
        fizzBuzz = new fizzBuzz_1.default();
    });
    describe('fizzBuzz', () => {
        it('should return 1 for 1', () => {
            const result = fizzBuzz.fizzBuzz(1);
            expect(result).toBe('1');
        });
        it('should return 2 for 2', () => {
            const result = fizzBuzz.fizzBuzz(2);
            expect(result).toBe('2');
        });
        it('should return fizz for 3', () => {
            const result = fizzBuzz.fizzBuzz(3);
            expect(result).toBe('fizz');
        });
        it('should return buzz for 5', () => {
            const result = fizzBuzz.fizzBuzz(5);
            expect(result).toBe('buzz');
        });
        it('should return fizz for 6', () => {
            const result = fizzBuzz.fizzBuzz(6);
            expect(result).toBe('fizz');
        });
        it('should return buzz for 10', () => {
            const result = fizzBuzz.fizzBuzz(10);
            expect(result).toBe('buzz');
        });
        it('should return fizzBuzz for 15', () => {
            const result = fizzBuzz.fizzBuzz(15);
            expect(result).toBe('fizzBuzz');
        });
        it('should return fizzBuzz for 30', () => {
            const result = fizzBuzz.fizzBuzz(30);
            expect(result).toBe('fizzBuzz');
        });
    });
});
//# sourceMappingURL=fizzBuzz.spec.js.map