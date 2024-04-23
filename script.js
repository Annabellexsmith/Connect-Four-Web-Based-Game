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
let tie; 
let messageEl = document.getElementById('turn')

// CONSTANTS --------------------------------------------------------
const winningCombos =[[0, 1, 2, 3], [1, 2, 3, 4], [5, 6, 7, 8], [6, 7, 8, 9],
[10, 11, 12, 13], [11, 12, 13, 14], [15, 16, 17, 18], [16, 17, 18, 19],
[20, 21, 23, 23], [21, 22, 23, 24], [1, 7, 13, 19], [0, 6, 12 ,18], 
[6, 12, 18, 24], [5, 11, 17, 23]]

const LOOKUP = {
   "1": "Player One",
   "-1": "Player Two"
}
const token = {
    "1": "🐶",
    "-1":"🐱",
}

// CATCHED ELEMENTS -------------------------------------------------
const openModal = document.getElementById('instruction-modal')
const playButtonEl = document.getElementById('play-game')
const slotEls = document.querySelectorAll('.slot')
const alertModal = document.getElementById('alertModal')
const tryAgainButton = document.getElementById('tryAgainButton')
const resultModal = document.getElementById('end-game-modal')
const endMessageEl = document.getElementById('end-message')
const restartButtonEl = document.getElementById('restart')

// EVENT LISTENERS --------------------------------------------------
playButtonEl.addEventListener("click", closeButton)
slotEls.forEach(function (slotEl){slotEl.addEventListener("click", dropToken)})
tryAgainButton.addEventListener("click", closeAlertModal)
restartButtonEl.addEventListener("click", restart)

// FUNCTIONS ---------------------------------------------------------
function init () {
    openModal.showModal();
    board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    player = "1";
    winner = false;
    messageEl.innerText = `It is ${LOOKUP[player]}'s turn`;
}
init ()
function closeButton() {openModal.close()}

function dropToken(event) { // return to this!! 
    let pickedSlot = parseInt(event.target.id);
            if(pickedSlot <= 4 && board[pickedSlot] === null) {
                event.target.innerHTML= token[player]
                board[pickedSlot] = player
            } else if (board[pickedSlot - 5] !== null) {
                event.target.innerHTML = token[player]
                board[pickedSlot] = player
            } else {
                alertModal.show()
            }
        
    //  assessForWinner();
     player *= -1;
}

function closeAlertModal () {alertModal.close()}

// function assessForWinner(winner) {
//     winner = false;
//     for(let i = 0; i < winningCombos.length; i++) {
//         const slotZero = board[winningCombos[i][0]];
//         const slotOne = board[winningCombos[i][1]];
//         const slotTwo = board[winningCombos[i][2]];
//         const slotThree  = board[winningCombos[i][3]];
//         const slotFour = board[winningCombos[i][4]]
//         if (slotZero === "1" && slotOne === "1" && slotTwo === "1" && slotThree === "1" && slotFour === "1") {
//            winner = "win";
//             return resultModal.showModal() 
//         } else {(board[i] !== null) 
//             return resultModal.showModal("tie")
//         }
//     }
// }

function message() { //can we merge this one with determWinner
    if (winner === "win") endMessageEl.innerText = `Congratulations ${player}! You have won! Play again?`
    else endMessageEl.innerText = `Gasp! It's a tie. Only way to figure out who wins is to play again!`
}


function restart() {
    resultModal.close();
    init ()
    }
