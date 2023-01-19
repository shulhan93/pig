'use strict';
const btnRoll = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

let scores = [0, 0];
let score = 0;
let player = 0;

function start() {
  document.querySelectorAll('.score').forEach(el => (el.textContent = 0));
}

function rollDice() {
  let randomNumber = Math.floor(Math.random() * 6) + 1;
  dice.src = `dice${randomNumber}.png`;

  checkNumber(randomNumber);
}

function checkNumber(number) {
  if (number == 1) {
    switchPlayer();
  } else {
    score += number;
    document.querySelector(`#current--${player}`).textContent = score;
  }
}

function switchPlayer() {
  document.querySelector(`#current--${player}`).textContent = 0;
  document
    .querySelectorAll('.player')
    .forEach(el => el.classList.toggle('player--active'));
  player = player == 0 ? 1 : 0;
  score = 0;
}

function holdScores() {
  scores[player] += score;
  if (scores[player] >= 100) {
    document
      .querySelector(`.player--${player}`)
      .classList.add('player--winner');
    btnRoll.removeEventListener('click', rollDice);
    btnHold.removeEventListener('click', holdScores);
  }
  document.querySelector(`#score--${player}`).textContent = scores[player];
  switchPlayer();
}

function newGame() {
  btnHold.addEventListener('click', holdScores);
  btnRoll.addEventListener('click', rollDice);
  score = 0;
  scores = [0, 0];
  document.querySelectorAll('.score').forEach(el => (el.textContent = 0));
  document
    .querySelectorAll('#current--score')
    .forEach(el => (el.textContent = 0));
  document
    .querySelectorAll('.player')
    .forEach(el => el.classList.remove('player--winner', 'player--active'));
  document.querySelector('.player--0').classList.add('player--active');
}

start();

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScores);
btnNewGame.addEventListener('click', newGame);
