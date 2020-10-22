type Player = {
  label: string;
  position: number;
};

type Connexions = Map<number, number>;

class SnakesLadders {
  public players: Player[];
  private connexions: Connexions;
  private isGameFinished: boolean;
  public currentPlayerIndex: number;

  constructor() {
    this.players = [
      { label: '1', position: 0 },
      { label: '2', position: 0 },
    ];
    this.isGameFinished = false;
    this.connexions = new Map();
    this._initConnexions();
    this.currentPlayerIndex = 0;
  }

  play(dice1: number, dice2: number): string {
    if (this.isGameFinished) {
      return 'Game over!';
    }
    const currentPlayer = this.players[this.currentPlayerIndex];

    currentPlayer.position = this.getNextPosition(currentPlayer.position, dice1, dice2);

    this.players[this.currentPlayerIndex] = currentPlayer;

    if (currentPlayer.position === 100) {
      this.isGameFinished = true;
      return `Player ${currentPlayer.label} Wins!`;
    }

    if (dice1 !== dice2) {
      this.nextPlayer();
    }

    return `Player ${currentPlayer.label} is on square ${currentPlayer.position}`;
  }

  nextPlayer() {
    this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
  }

  getNextPosition(currentPosition: number, dice1: number, dice2: number): number {
    let newPosition = currentPosition + dice1 + dice2;

    newPosition = newPosition > 100 ? 100 - (newPosition % 100) : newPosition;

    const connexion = this.connexions.get(newPosition);

    return connexion || newPosition;
  }

  setPlayerPosition(player: number, position: number) {
    this.players[player - 1].position = position;
  }

  _initConnexions() {
    this.connexions = new Map([
      [2, 38],
      [7, 14],
      [8, 31],
      [15, 26],
      [16, 6],
      [21, 42],
      [28, 84],
      [36, 44],
      [46, 25],
      [49, 11],
      [51, 67],
      [62, 19],
      [64, 60],
      [71, 91],
      [74, 53],
      [78, 98],
      [87, 94],
      [89, 68],
      [92, 88],
      [95, 75],
      [99, 80],
    ]);
  }
}

export { SnakesLadders };
