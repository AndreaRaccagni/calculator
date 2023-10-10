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
    throw new Error("Error. Can't divide by 0");
  }
  return a / b;
};

const square = (a) => {
  return Math.pow(a, 2);
};

const squareRoot = (a) => {
  return Math.squareRoot(a);
};
