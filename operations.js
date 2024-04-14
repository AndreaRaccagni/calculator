const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  if (b === 0) {
    return 'E';
  }
  return a / b;
};

const square = (a) => {
  return a ** 2;
};

const squareRoot = (a) => {
  if (a < 0) {
    return 'E';
  }
  return Math.sqrt(a);
};

export default {
  add,
  subtract,
  multiply,
  divide,
  square,
  squareRoot,
};
