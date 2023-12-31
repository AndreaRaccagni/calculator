import operations from './operations.js';

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

const playAudio = () => {
  audioElement.play();
};

const pauseAudio = () => {
  audioElement.pause();
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

buttons.add.addEventListener('click', (event) => {
  operations.add();
});

buttons.subtract.addEventListener('click', (event) => {
  operations.subtract();
});

buttons.multiply.addEventListener('click', (event) => {
  operations.multiply();
});

buttons.divide.addEventListener('click', (event) => {
  operations.divide();
});

buttons.square.addEventListener('click', () => {
  number = operations.square(number);
  display.textContent = number;
});

buttons.root.addEventListener('click', () => {
  number = operations.squareRoot(number);
  display.textContent = number;
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
