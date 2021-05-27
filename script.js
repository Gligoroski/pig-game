"use strict";
// Selecting elements
const score0El = document.getElementById(`score--0`);
const score1El = document.getElementById(`score--1`);

const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
let currentScore = 0;
let activePlayer = 0;
let score = [0, 0];

const diceEl = document.querySelector(`.dice`);
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add(`hidden`);

const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

let kec = new Audio(`kec.m4a`);
let audioVictory = new Audio(`victory.m4a`);
let audioHold = new Audio(`hold.m4a`);
let izvini = new Audio(`izvini6ka.m4a`);
// Rolling dice functionality

btnRoll.addEventListener(`click`, function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove(`hidden`);
  diceEl.src = `dice-${dice}.png`;
  if (dice == 6) izvini.play();
  if (dice == 1) kec.play();
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle(`player--active`);
    player1El.classList.toggle(`player--active`);
    // audioDice1.play();
  }
});
// Hold functionality
btnHold.addEventListener(`click`, function () {
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];
  audioHold.play();
  if (score[activePlayer] >= 101) {
    // alert(`Game over, player ${activePlayer} wins`);
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add(`player--winner`);

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove(`player--active`);

    btnRoll.classList.add(`hidden`);
    btnHold.classList.add(`hidden`);
    diceEl.classList.add(`hidden`);
    audioVictory.play();
  } else {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle(`player--active`);
    player1El.classList.toggle(`player--active`);
    currentScore = 0;
  }
});
// new game functionality
btnNew.addEventListener(`click`, function () {
  score = [0, 0];
  currentScore = 0;
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add(`hidden`);
  btnRoll.classList.remove(`hidden`);
  btnHold.classList.remove(`hidden`);
  activePlayer = 0;
});

// let name = prompt(`Whats your name?`);
// document.querySelector(`#name--0`).textContent = name;
