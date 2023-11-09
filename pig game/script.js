'use strict';
const score1el = document.querySelector('#score--0');
const score2el = document.querySelector('#score--1');
const diceroll = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnhold = document.querySelector('.btn--hold');
const btnroll = document.querySelector('.btn--roll');
const p1currentscore = document.getElementById('current--0');
const p2currentscore = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
score1el.textContent = 0;
score2el.textContent = 0;
const scores = [0, 0];

diceroll.classList.add('hidden');
// let current0 = 0;
// let current1 = 0;
let playing = true;
let current = 0;
let activeplayer = 0;
// const init =function(){

// }
const rolldice = function () {
    if (playing) {
        // let current = 0;
        //random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1
        //display dice
        diceroll.classList.remove('hidden');
        diceroll.src = `dice-${dice}.png`;
        //check for roll 1 if true switch to next player
        if (dice !== 1) {
            // let ca = Number(`${activeplayer}`);
            // console.log(ca);
            // if (ca == 0) {
            //     current0 = current0 + dice;
            //     document.getElementById(`current--${activeplayer}`).textContent = current0;
            // }
            // else if (ca == 1) {
            //     current1 = current1 + dice;
            //     document.getElementById(`current--${activeplayer}`).textContent = current1;

            // }
            current = current + dice;
            document.getElementById(`current--${activeplayer}`).textContent = current;

        } else {
            player0.classList.toggle('player--active');
            player1.classList.toggle('player--active');
            document.getElementById(`current--${activeplayer}`).textContent = 0;
            activeplayer = activeplayer === 0 ? 1 : 0;
            current = 0;
        }
    }
};
btnroll.addEventListener('click', rolldice);
btnhold.addEventListener('click', function () {
    scores[activeplayer] += current;
    document.getElementById(`score--${activeplayer}`).textContent = scores[activeplayer];
    if (scores[activeplayer] >= 100) {
        playing = false;
        //console.log(`you won player ${activeplayer}`);
        document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');
        diceroll.classList.add('hidden');
        
    } else {
        player0.classList.toggle('player--active');
        player1.classList.toggle('player--active');
        document.getElementById(`current--${activeplayer}`).textContent = 0;
        activeplayer = activeplayer === 0 ? 1 : 0;
        current = 0;

    }

});

 btnnew.addEventListener('click', function () {
     score1el.textContent = 0;
     score2el.textContent = 0;
     p1currentscore.textContent = 0;
     p2currentscore.textContent = 0;
     player0.classList.remove('player--winner');
     player1.classList.remove('player--winner');
     player1.classList.remove('player--active');
     player0.classList.add('player--active');


 });