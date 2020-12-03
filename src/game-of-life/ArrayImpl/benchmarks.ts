import { GameOfLife } from './GameOfLife';
import { Cell } from './Cell';
const randomCellGenerator = (n: number): (() => Cell) => () =>
  Math.round(Math.random() * (n - 1) + 1) === 1 ? Cell.ALIVE : Cell.DEAD;

const gol = new GameOfLife();
let start;
let end;

gol.init(100, 100, randomCellGenerator(4));

start = Date.now();
gol.nextGeneration();
end = Date.now();

console.log(end - start);

start = Date.now();
gol.nextGeneration();
end = Date.now();

console.log(end - start);
start = Date.now();
gol.nextGeneration();
end = Date.now();

console.log(end - start);
start = Date.now();
gol.nextGeneration();
end = Date.now();

console.log(end - start);
start = Date.now();
gol.nextGeneration();
end = Date.now();

console.log(end - start);
start = Date.now();
gol.nextGeneration();
end = Date.now();

console.log(end - start);
start = Date.now();
gol.nextGeneration();
end = Date.now();

console.log(end - start);
