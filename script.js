"use strict";
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");
const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

let scores, currentScore, activePlayer, playing;
//starting conditions

const init = function () {
  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;

  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
init();

const switchPLayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.generate random dice
    const diceNumber = Math.ceil(Math.random() * 6);
    //2.dispaly dice
    dice.classList.remove("hidden");
    dice.src = `images/dice-${diceNumber}.png`;
    //3.check gor the rolled1: if it is true switch to the next player
    if (diceNumber !== 1) {
      //add diceNumber to current score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to the next player
      switchPLayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1.add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if the score >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add("hidden");
      //3.finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //4. switch to the next player
      switchPLayer();
    }
  }
});

btnNew.addEventListener("click", init);
