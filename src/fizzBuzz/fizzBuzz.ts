class FizzBuzz {
  fizzBuzz(input: number): string {
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

export default FizzBuzz;
