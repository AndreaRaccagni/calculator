// import * as ops from './../calculator/operations';
// console.log(ops);

// Selectors
const display = document.querySelector('.display');
const buttons = {
  clear: document.querySelector('.clear'),
  add: document.querySelector('.add'),
  subtract: document.querySelector('.subtract'),
  multiply: document.querySelector('.multiply'),
  divide: document.querySelector('.divide'),
  pow: document.querySelector('.pow'),
  root: document.querySelector('.root'),
  digit0: document.querySelector('.digit0'),
  digit1: document.querySelector('.digit1'),
  digit2: document.querySelector('.digit2'),
  digit3: document.querySelector('.digit3'),
  digit4: document.querySelector('.digit4'),
  digit5: document.querySelector('.digit5'),
  digit6: document.querySelector('.digit6'),
  digit7: document.querySelector('.digit7'),
  digit8: document.querySelector('.digit8'),
  digit9: document.querySelector('.digit9'),
  dot: document.querySelector('.dot'),
  equals: document.querySelector('.equals'),
};

// variables
const DISPLAY_LENGTH = 11;
let number = display.textContent;

// Functions
const updateNumber = (digit) => {
  if (number === '0') {
    number = digit;
  } else {
    number += digit;
  }

  if (number.length > DISPLAY_LENGTH) {
    return;
  }

  display.textContent = number;
};

const clearDisplay = () => {
  number = '0';
  display.textContent = number;
};

const addDot = () => {
  if (!number.includes('.') && number.length < 10) {
    number += '.';
    display.textContent = number;
  }
};

const addKeyEvent = (keyToCheck, funcToExecute) => {
  document.addEventListener('keydown', (event) => {
    if (event.key === keyToCheck) {
      funcToExecute();
    }
  });
};

// Event listeners
buttons.clear.addEventListener('click', clearDisplay);
addKeyEvent('Escape', clearDisplay);

buttons.dot.addEventListener('click', addDot);
addKeyEvent('.', addDot);

for (const button in buttons) {
  if (button.includes('digit')) {
    buttons[button].addEventListener('click', () =>
      updateNumber(button[button.length - 1])
    );
  }
}

document.addEventListener('keydown', (event) => {
  const digitKeyPressed = event.key;
  const digitButton = `digit${digitKeyPressed}`;

  if (buttons[digitButton]) {
    event.preventDefault();
    updateNumber(digitKeyPressed);
  }
});
