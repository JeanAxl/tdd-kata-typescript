import { Cell, GameOfLife } from './GameOfLife';

const gameOfLife = new GameOfLife();

gameOfLife.init(1600, 1000);
const n = 6;
const m = 3;
const p = 20;
gameOfLife.setCell(120 + n, 12 + p, Cell.ALIVE);
gameOfLife.setCell(121 + n, 12 + p, Cell.ALIVE);
gameOfLife.setCell(122 + n, 12 + p, Cell.ALIVE);
gameOfLife.setCell(122 + n, 13 + p, Cell.ALIVE);
gameOfLife.setCell(121 + n, 14 + p, Cell.ALIVE);

gameOfLife.setCell(120 - m, 12 + p, Cell.ALIVE);
gameOfLife.setCell(121 - m, 12 + p, Cell.ALIVE);
gameOfLife.setCell(122 - m, 12 + p, Cell.ALIVE);
gameOfLife.setCell(122 - m, 13 + p, Cell.ALIVE);
gameOfLife.setCell(121 - m, 14 + p, Cell.ALIVE);

const print = (gameOfLife: GameOfLife) => {
  console.clear();

  const { width, height } = gameOfLife.getDimensions();

  let currentLine = '';
  const lines = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      currentLine += gameOfLife.getCell(x, y) === Cell.ALIVE ? '⚪' : '';
    }

    lines.unshift(currentLine);
    currentLine = '';
  }

  console.log(lines.join('\n'));
};

const run = () => {
  console.log('loop');
  gameOfLife.nextGeneration();
  sleep(100);
};

function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

let i = 1000;

while (i > 0) {
  run();
  i--;
}
