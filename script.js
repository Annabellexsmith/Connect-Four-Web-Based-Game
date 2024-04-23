// onload, have the instruction modal open 
//Listen event for the start button and call the funciton init to begin the game
//init function should include any empty board, start with player 1, have winner set to false, and message saying that is is the first persons turn
//function that represents everything that happens in one turn: event lisener, deterimine if the spot if available then place the token, check board against the winning combo array, and, change player, change message to who's turn it is
//for loop function that runs between the board & winning array
//function for messages based on who wins then calls on the footer modal, tie, whos' turn
//addlistener for play again button with callback to the init function

// VARIABLES --------------------------------------------------------
let board;
let player;
let winner;

// CONSTANTS --------------------------------------------------------
const winningCombos = [[0, 1, 2, 3], [1, 2, 3, 4], [5, 6, 7, 8], [6, 7, 8, 9],
[10, 11, 12, 13], [11, 12, 13, 14], [15, 16, 17, 18], [16, 17, 18, 19],
[20, 21, 23, 23], [21, 22, 23, 24], [1, 7, 13, 19], [0, 6, 12 ,18], 
[6, 12, 18, 24], [5, 11, 17, 23]];

const LOOKUP = {
    "1": "Player One",
    "-1": "Player Two"
}
const token = {
    "1": "🐶",
    "-1":"🐱",
}

// CATCHED ELEMENTS -------------------------------------------------
const instructionEl = document.getElementById('instruction-modal')
const playButtonEl = document.getElementById('play-game')
const messageEl = document.getElementById('turn')
const slotEls = document.querySelectorAll('.slot')
const alertModal = document.getElementById('alertModal')
const tryAgainButton = document.getElementById('try-again-button')
const resultModal = document.getElementById('end-game-modal')
const resultMessageEl = document.getElementById('end-message')
const restartButtonEl = document.getElementById('restart')

// EVENT LISTENERS --------------------------------------------------
playButtonEl.addEventListener("click", closeButton)
slotEls.forEach(function (slotEl){slotEl.addEventListener("click", dropToken)})
tryAgainButton.addEventListener("click", closeAlertModal)
restartButtonEl.addEventListener("click", restart)

// FUNCTIONS ---------------------------------------------------------
function init () {
    instructionEl.showModal();
    board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    player = "1";
    winner = false;
    messageEl.innerText = `It is ${LOOKUP[player]}'s turn`;
}
init ()
function closeButton() {instructionEl.close()}

function dropToken(event) {
    let pickedSlot = parseInt(event.target.id);
    console.log("board at pickedslot", board[pickedSlot])
            if (board[pickedSlot] !== null) {
                return;
            } else if ((pickedSlot <= 4 && board[pickedSlot] === null) || board[pickedSlot - 5] !== null) {
                event.target.innerHTML= token[player];
                board[pickedSlot] = player;
            } else {
                alertModal.show();
            }
     console.log("updated board", board)
     assessForWinner();
     player *= -1;
     messageEl.innerText = `It is ${LOOKUP[player]}'s turn`;
}
function closeAlertModal() {alertModal.close()}

function assessForWinner(message) {
    for(let i = 0; i < winningCombos.length; i++) {
        const slotZero = board[winningCombos[i][0]];
        const slotOne = board[winningCombos[i][1]];
        const slotTwo = board[winningCombos[i][2]];
        const slotThree  = board[winningCombos[i][3]];
        const slotFour = board[winningCombos[i][4]]
        if (slotZero === slotOne && slotOne === slotTwo && slotTwo === slotThree && slotThree === slotFour) {
            winner = "win";
            resultModal.openModal()
            return message("win")
        } else if (!board.includes(null)) {
            resultModal.openModal()
            return message()
        } else {
            continue;
        }
    }
}

function message() {
    if (winner === "win") resultMessageEl.textContent = `Congratulations ${LOOKUP[player]}! You have won! Play again?`
    else resultMessageEl.textContent = `Gasp! It's a tie. Only way to figure out who wins is to play again!`
}

function restart() {
    resultModal.close();
    init ()
    }
