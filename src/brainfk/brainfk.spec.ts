import { assert } from 'chai';
import { brainLuck, getBracketPairs } from './brainfk';

describe('getBrackets', () => {
  it('returns an empty array', () => {
    assert.deepEqual(getBracketPairs(''), []);
  });

  it('returns one bracket pair', () => {
    assert.deepEqual(getBracketPairs('[]'), [{ open: 0, close: 1 }]);
    assert.deepEqual(getBracketPairs('01[]'), [{ open: 2, close: 3 }]);
    assert.deepEqual(getBracketPairs('01[34]'), [{ open: 2, close: 5 }]);
  });

  it('returns 2 bracket pairs', () => {
    assert.deepEqual(getBracketPairs('[][]'), [
      { open: 0, close: 1 },
      { open: 2, close: 3 },
    ]);
    assert.deepEqual(getBracketPairs('01[3[56]]9'), [
      { open: 4, close: 7 },
      { open: 2, close: 8 },
    ]);
  });
});

describe('tdd style', () => {
  it('returns an empty string when no program provided', () => {
    assert.equal(brainLuck('', 'codewars'), '');
  });

  it('can print the pointed value', () => {
    assert.equal(brainLuck('.', ''), String.fromCharCode(0));
    assert.equal(brainLuck('...', ''), String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0));
  });

  it('can read from input', () => {
    assert.equal(brainLuck(',.', String.fromCharCode(45)), String.fromCharCode(45));
    assert.equal(brainLuck(',.,.,.', 'ABC'), 'ABC');
  });

  it('can increment a value', () => {
    assert.equal(brainLuck(',+.', 'A'), 'B');
    // Byte increment condition 255 + 1 = 0
    assert.equal(brainLuck(',+.', String.fromCharCode(255)), String.fromCharCode(0));
  });

  it('can decrement a value', () => {
    assert.equal(brainLuck(',-.', 'B'), 'A');
    // Byte increment condition 0 - 1 = 255
    assert.equal(brainLuck(',-.', String.fromCharCode(0)), String.fromCharCode(255));
  });

  it('should move pointer to the right', () => {
    assert.equal(brainLuck('+++>,.', 'A'), 'A');
    assert.equal(brainLuck('+++>,>>>>.', 'A'), String.fromCharCode(0));
  });

  it('should move pointer to the left', () => {
    assert.equal(brainLuck(',>++++<.', 'A'), 'A');
  });

  it('go through a while', () => {
    assert.equal(brainLuck('[].', String.fromCharCode(0)), String.fromCharCode(0));
    assert.equal(brainLuck(',[-].', String.fromCharCode(0)), String.fromCharCode(0));
  });

  it('should fail when malformed brackets', () => {
    const toTest1 = () => {
      brainLuck(',-].', String.fromCharCode(0));
    };
    expect(toTest1).toThrow('Pair not found');

    const toTest2 = () => {
      brainLuck(',[-][.', String.fromCharCode(0));
    };
    expect(toTest2).toThrow('Pair not found');
  });
});

describe('brainLuck', () => {
  it('Echo until byte(255) encountred', () => {
    assert.equal(brainLuck(',+[-.,+]', 'Codewars' + String.fromCharCode(255)), 'Codewars');
  });

  it('Echo until byte(0) encountred', () => {
    assert.equal(brainLuck(',[.[-],]', 'Codewars' + String.fromCharCode(0)), 'Codewars');
  });

  it('Two numbers multiplier', () => {
    assert.equal(brainLuck(',>,<[>[->+>+<<]>>[-<<+>>]<<<-]>>.', String.fromCharCode(8, 9)), String.fromCharCode(72));
  });
});
