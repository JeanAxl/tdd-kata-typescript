class InputReader {
  readonly input: number[];
  private index: number;
  constructor(input: string) {
    this.input = input.split('').map((c) => c.charCodeAt(0));
    this.index = 0;
  }

  readInput() {
    const readInput = this.input[this.index];
    this.index++;

    return readInput;
  }
}

class Byte {
  public value: number;
  constructor(value: number) {
    this.value = value;
  }

  increment() {
    this.value = this.value === 255 ? 0 : this.value + 1;
  }

  decrement() {
    this.value = this.value === 0 ? 255 : this.value - 1;
  }
}

class Memory {
  private content: Byte[];
  constructor() {
    this.initContent();
  }

  private initContent() {
    this.content = [];
    for (let i = 0; i < 4000; i++) {
      this.content.push(new Byte(0));
    }
  }

  increment(pointer: number) {
    this.content[pointer].increment();
  }

  decrement(pointer: number) {
    this.content[pointer].decrement();
  }

  read(pointer: number): number {
    return this.content[pointer].value;
  }

  write(pointer: number, value: number) {
    this.content[pointer].value = value;
  }
}

class Output {
  public value: string;

  constructor() {
    this.value = '';
  }

  out(value: number) {
    this.value += String.fromCharCode(value);
  }
}

type BracketPair = {
  open: number;
  close: number;
};

export function getBracketPairs(inputString: string): BracketPair[] {
  if (inputString.length === 0) {
    return [];
  }
  const inputArray = inputString.split('');
  const incompletePairs: BracketPair[] = [];
  const completePairs: BracketPair[] = [];

  inputArray.forEach((char, index) => {
    if (char === '[') {
      incompletePairs.push({ open: index, close: 0 });
    }
    if (char === ']') {
      const newPair = incompletePairs.pop();
      if (newPair) {
        newPair.close = index;
        completePairs.push(newPair);
      }
    }
  });
  return completePairs;
}

function getOpeningBracketIndex(bracketPairs: BracketPair[], closingIndex: number): number {
  const pair = bracketPairs.find((pair: BracketPair) => pair.close === closingIndex);
  if (pair) {
    return pair.open;
  }

  throw 'Pair not found';
}

function getClosingBracketIndex(bracketPairs: BracketPair[], openingIndex: number): number {
  const pair = bracketPairs.find((pair: BracketPair) => pair.open === openingIndex);
  if (pair) {
    return pair.close;
  }

  throw 'Pair not found';
}

export function brainLuck(code: string, inputString: string): string {
  const memory = new Memory();
  const inputReader = new InputReader(inputString);
  const output = new Output();

  let pointer = 0;

  const codeArray = code.split('');
  let symbol;

  const brackets = getBracketPairs(code);

  for (let i = 0; i < codeArray.length; i++) {
    symbol = codeArray[i];

    if (symbol === '.') {
      const value = memory.read(pointer);
      output.out(value);
    }

    if (symbol === ',') {
      const value = inputReader.readInput();
      memory.write(pointer, value);
    }

    if (symbol === '+') {
      memory.increment(pointer);
    }

    if (symbol === '-') {
      memory.decrement(pointer);
    }

    if (symbol === '>') {
      pointer++;
    }

    if (symbol === '<') {
      pointer--;
    }

    if (symbol === '[') {
      if (memory.read(pointer) === 0) {
        i = getClosingBracketIndex(brackets, i);
      }
    }

    if (symbol === ']') {
      if (memory.read(pointer) !== 0) {
        i = getOpeningBracketIndex(brackets, i);
      }
    }
  }

  return output.value;
}
