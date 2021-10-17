'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const player_section = document.querySelector('.player');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentscore0El = document.querySelector('#current--0');
const currentscore1El = document.querySelector('#current--1');

let score = [0, 0];
let currscore = 0;
let activeplayer = 0;
let playing = true;
const init = function () {
  score = [0, 0];
  currscore = 0;
  activeplayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentscore0El.textContent = 0;
  currentscore1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  document.querySelector('.current-0').textContent = 'Current';
  document.querySelector('.current-1').textContent = 'Current';
};
init();

const switchplayer = function () {
  currscore = 0;
  document.querySelector(`#current--${activeplayer}`).textContent = currscore;
  activeplayer = activeplayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice != 1) {
      currscore += dice;
      document.querySelector(`#current--${activeplayer}`).textContent =
        currscore;
    } else {
      //switch player
      switchplayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activeplayer] += currscore;

    document.getElementById(`score--${activeplayer}`).textContent =
      score[activeplayer];

    if (score[activeplayer] >= 10) {
      playing = false;
      //player wins
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');

      // document
      //   .querySelector(`.player--${activeplayer}`)
      //   .classList.remove('player--active');

      document.querySelector(`.current-${activeplayer}`).textContent = '';

      document.querySelector(`#current--${activeplayer}`).textContent =
        'WON!!!';

      diceEl.classList.add('hidden');
    } else switchplayer();
  }
});

btnNew.addEventListener('click', init);
