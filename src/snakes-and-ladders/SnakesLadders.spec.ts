import { SnakesLadders } from './SnakesLadders';

describe('Snakes and ladders', () => {
  let game: SnakesLadders;

  beforeEach(() => {
    game = new SnakesLadders();
  });

  it('has two players', () => {
    expect(game.players[0]).toEqual({ label: '1', position: 0 });
    expect(game.players[1]).toEqual({ label: '2', position: 0 });
  });

  it('rolls dice for one player then the other', () => {
    const res1 = game.play(1, 2);
    expect(res1).toBe('Player 1 is on square 3');
    const res2 = game.play(4, 5);
    expect(res2).toBe('Player 2 is on square 9');
    const res3 = game.play(3, 3);
    expect(res3).toBe('Player 1 is on square 9');
  });

  it('can go through connexion', () => {
    const res1 = game.play(1, 6);
    expect(res1).toBe('Player 1 is on square 14');
    const res2 = game.play(4, 4);
    expect(res2).toBe('Player 2 is on square 31');
  });

  it('can roll on double dice', () => {
    game.play(3, 3);
    const res1 = game.play(3, 4);
    expect(res1).toBe('Player 1 is on square 13');
  });

  it('it can set player position from outside world', () => {
    game.setPlayerPosition(1, 4);
    const res1 = game.play(1, 2);
    expect(res1).toBe('Player 1 is on square 14');
  });

  it('bounces back', () => {
    game.setPlayerPosition(1, 98);
    game.setPlayerPosition(2, 97);
    const res1 = game.play(4, 7);
    expect(res1).toBe('Player 1 is on square 91');
    const res2 = game.play(1, 3);
    expect(res2).toBe('Player 2 is on square 80');
  });

  it('should win', () => {
    game.setPlayerPosition(1, 98);
    const res1 = game.play(1, 1);
    expect(res1).toBe('Player 1 Wins!');
  });

  it('should game over', () => {
    game.setPlayerPosition(1, 98);
    game.setPlayerPosition(2, 97);

    const res1 = game.play(1, 1);
    expect(res1).toBe('Player 1 Wins!');
    const res2 = game.play(1, 2);
    expect(res2).toBe('Game over!');
  });
});
