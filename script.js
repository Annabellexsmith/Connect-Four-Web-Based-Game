// VARIABLES --------------------------------------------------------
let board;
let player;
let winner;

// CONSTANTS --------------------------------------------------------
const winningCombos = [[0, 1, 2, 3], [1, 2, 3, 4], [5, 6, 7, 8], [6, 7, 8, 9],
[10, 11, 12, 13], [11, 12, 13, 14], [15, 16, 17, 18], [16, 17, 18, 19],
[20, 21, 23, 24], [21, 22, 23, 24], [1, 7, 13, 19], [0, 6, 12 ,18], 
[6, 12, 18, 24], [5, 11, 17, 23], [0, 5, 10, 15, ], [5, 10, 15, 20], 
[1, 6, 11, 16], [6, 11, 16, 21], [2, 7, 12, 17], [7, 12, 17, 22], 
[3, 8, 13, 18], [8, 13, 18, 23], [4, 9, 14, 19], [9, 14, 19, 24]];

const LOOKUP = {
    "1": "Player One",
    "-1": "Player Two"
};

const token = {
    "1": "🌞",
    "-1":"🌧️",
};

// CATCHED ELEMENTS -------------------------------------------------
const instructionEl = document.getElementById('instruction-modal');
const playButtonEl = document.getElementById('play-game');
const messageEl = document.getElementById('turn');
const slotEls = document.querySelectorAll('.slot');
const alertModal = document.getElementById('alert-modal');
const tryAgainButton = document.getElementById('try-again-button');
const resultModal = document.getElementById('end-game-modal');
const resultMessageEl = document.getElementById('end-message');
const restartButtonEl = document.getElementById('restart');

// EVENT LISTENERS --------------------------------------------------
playButtonEl.addEventListener("click", function () {instructionEl.close()});
slotEls.forEach(function (slotEl) {slotEl.addEventListener("click", dropToken)});
tryAgainButton.addEventListener("click", function () {alertModal.close()});
restartButtonEl.addEventListener("click", function() {resultModal.close(); init()});

// FUNCTIONS ---------------------------------------------------------
function init () {
    instructionEl.showModal();
    board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    player = 1;
    winner = false;
    messageEl.innerText = `It is ${LOOKUP[player]}'s turn`;
    render();
};

init ();

function render() {
    board.forEach(function(text, index) {
        const slotEl = document.getElementById(index);
        if (!text) slotEl.innerText = '';
    });
};

function dropToken(event) {
    let pickedSlot = parseInt(event.target.id);
    if (board[pickedSlot] !== null) {
        return;
    } else if (pickedSlot <= 4 && board[pickedSlot] === null || board[pickedSlot - 5] !== null) { 
        event.target.innerText = token[player];
        board[pickedSlot] = player;
        winner = assessForWinner();
        if (winner === "win" || winner === "tie") {
            updateMessage();
            resultModal.showModal();
            return;
        } else if (winner === null) {
            messageEl.innerText = `It is ${LOOKUP[player]}'s turn`;
        }
    } else {
        alertModal.show();
        return;
        }
    player *= -1;
}

function assessForWinner () {
    for(let i = 0; i < winningCombos.length; i++) {
        if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]]+ board[winningCombos[i][2]] + board[winningCombos[i][3]]) === 4) {
            return "win";
        } 
    } 
    if (!board.includes(null)) {
        return "tie";
    }  
}

function updateMessage() {
    if (winner === "win") resultMessageEl.textContent = `Congratulations ${LOOKUP[player]}! You have won! Play again?`;
    else resultMessageEl.textContent = `Gasp! It's a tie. Only way to figure out who wins is to play again!`;
}
