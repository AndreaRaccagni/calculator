import ops from './operations.js';

// Selectors
const display = document.querySelector('.display');
const buttons = {
  clear: document.querySelector('.clear'),
  add: document.querySelector('.add'),
  subtract: document.querySelector('.subtract'),
  multiply: document.querySelector('.multiply'),
  divide: document.querySelector('.divide'),
  square: document.querySelector('.square'),
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
const soundOn = document.getElementById('soundOn');
const soundOff = document.getElementById('soundOff');
const audioElement = document.getElementById('audioElement');

// variables
const DISPLAY_LENGTH = 11;
let number = display.textContent;
let storedNumber = '0';
let storedOperation = '';
let justCalculated = false; // Tracks whether the last action was a calculation

// Functions
const updateNumber = (digit) => {
  if (justCalculated || number === '0') {
    number = digit;
    justCalculated = false;
  } else {
    number = (number + digit).slice(0, DISPLAY_LENGTH);
  }

  display.textContent = number;
};

const executeOperation = () => {
  if (!storedOperation) return;

  const parsedNumber = parseFloat(number);
  let result;

  switch (storedOperation) {
    case 'add':
      result = ops.add(parseFloat(storedNumber), parsedNumber);
      break;
    case 'sub':
      result = ops.subtract(parseFloat(storedNumber), parsedNumber);
      break;
    case 'mul':
      result = ops.multiply(parseFloat(storedNumber), parsedNumber);
      break;
    case 'div':
      result = ops.divide(parseFloat(storedNumber), parsedNumber);
      break;
    case 'square':
      result = ops.square(parsedNumber);
      break;
    case 'root':
      result = ops.squareRoot(parsedNumber);
      break;
  }

  if (result === 'E') {
    display.textContent = 'Error';
    justCalculated = true;
  } else {
    number = result.toString().slice(0, DISPLAY_LENGTH);
    display.textContent = number;
    justCalculated = true;
  }

  storedNumber = '0';
  storedOperation = '';
};

const handleOperation = (operation) => {
  if (!justCalculated && storedOperation && number !== '0') {
    executeOperation();
  }

  storedNumber = number;
  number = '0';
  storedOperation = operation;
  justCalculated = false;
};

buttons.equals.addEventListener('click', () => {
  executeOperation();
});

const clearDisplay = () => {
  number = '0';
  storedNumber = '0';
  storedOperation = '';
  display.textContent = number;
};

const deleteLastDigit = () => {
  number = number.slice(0, number.length - 1) || '0';
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

const playAudio = () => {
  audioElement.play();
};

const pauseAudio = () => {
  audioElement.pause();
};

// Event listeners
addKeyEvent('Backspace', deleteLastDigit);

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

buttons.equals.addEventListener('click', () => {
  if (storedOperation && number !== '0') {
    executeOperation();
    storedNumber = number;
    storedOperation = '';
    number = '0';
  }
});

buttons.add.addEventListener('click', () => {
  handleOperation('add');
});

buttons.subtract.addEventListener('click', () => {
  handleOperation('sub');
});

buttons.multiply.addEventListener('click', () => {
  handleOperation('mul');
});

buttons.divide.addEventListener('click', () => {
  handleOperation('div');
});

buttons.square.addEventListener('click', () => {
  storedOperation = 'square';
  executeOperation();
});

buttons.root.addEventListener('click', () => {
  storedOperation = 'root';
  executeOperation();
});

soundOn.addEventListener('click', () => {
  soundOn.classList.remove('active');
  soundOff.classList.add('active');
  pauseAudio();
});

soundOff.addEventListener('click', () => {
  soundOn.classList.add('active');
  soundOff.classList.remove('active');
  playAudio();
});

document.addEventListener('keydown', (event) => {
  const digitKeyPressed = event.key;
  const digitButton = `digit${digitKeyPressed}`;

  if (buttons[digitButton]) {
    event.preventDefault();
    updateNumber(digitKeyPressed);
  }
});

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case '+':
      event.preventDefault();
      handleOperation('add');
      break;
    case '-':
      event.preventDefault();
      handleOperation('sub');
      break;
    case '*':
      event.preventDefault();
      handleOperation('mul');
      break;
    case '/':
      event.preventDefault();
      handleOperation('div');
      break;
    case '=':
    case 'Enter':
      event.preventDefault();
      if (storedOperation && number !== '0') {
        buttons.equals.click();
      }
      break;
  }
});
