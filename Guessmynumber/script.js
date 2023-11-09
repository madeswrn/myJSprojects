'use strict';
//let score = 20;
let num = Math.trunc(Math.random() * 20) + 1;
let highscore = 0;
//document.querySelector('.number').textContent = num;
// let highx = function (s, h) {
//     if (s > h) {
//         document.querySelector('.highscore').textContent = s;
//     } else {
//         document.querySelector('.highscore').textContent = h;
//     }
// }
document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    let score = document.querySelector('.score').textContent;
    if (!guess) {
        document.querySelector('.message').textContent = 'give the valid input';
    }
    else if (guess > num) {
        if (score > 1) {
            document.querySelector('.message').textContent = 'your guess is high';
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = 'you lost the game';
            document.querySelector('.score').textContent = 0;
        }
    }
    else if (guess < num) {
        if (score > 1) {
            document.querySelector('.message').textContent = 'your guess is low';
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = 'you lost the game';
            document.querySelector('.score').textContent = 0;
        }

    }
    else if (guess === num) {
        if (score > 1) {
            document.querySelector('.message').textContent = 'correct answer 🍾🥛';
            document.querySelector('body').style.backgroundColor = '#60b347';
            document.querySelector('.number').textContent = num;
            document.querySelector('.number').style.width = '30rem';
            //document.querySelector('.highscore').textContent = score;
            //hs = Number(document.querySelector('.highscore').textContent = score);
            //highx(score, hs);
            // console.log(typeof (score));
            if (score > highscore) {
                highscore = score;
                document.querySelector('.highscore').textContent = highscore;
            }
        }
    }
}
);
document.querySelector('.again').addEventListener('click', function () {
    num = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.score').textContent = Number(20);
    document.querySelector('.message').textContent = 'start guessing';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';



    //document.querySelector('.guess').value = null;
}
);