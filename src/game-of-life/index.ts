import { Cell, GameOfLife } from './GameOfLife';

const gameOfLife = new GameOfLife();

gameOfLife.init(40, 40);
gameOfLife.setCell(1, 37, Cell.ALIVE);
gameOfLife.setCell(2, 37, Cell.ALIVE);
gameOfLife.setCell(3, 37, Cell.ALIVE);
gameOfLife.setCell(3, 38, Cell.ALIVE);
gameOfLife.setCell(2, 39, Cell.ALIVE);

const print = (gameOfLife: GameOfLife) => {
  console.clear();

  const { width, height } = gameOfLife.getDimensions();

  let currentLine = '';
  const lines = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      currentLine += gameOfLife.getCell(x, y) === Cell.ALIVE ? '⚫ ' : '⚪ ';
    }

    lines.unshift(currentLine);
    currentLine = '';
  }

  console.log(lines.join('\n'));
};

const run = () => {
  print(gameOfLife);
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
