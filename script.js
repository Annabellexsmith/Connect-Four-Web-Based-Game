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

// CONSTANTS --------------------------------------------------------
const winningCombos =[[0, 1, 2, 3], [1, 2, 3, 4], [5, 6, 7, 8], [6, 7, 8, 9],
[10, 11, 12, 13], [11, 12, 13, 14], [15, 16, 17, 18], [16, 17, 18, 19],
[20, 21, 23, 23], [21, 22, 23, 24], [1, 7, 13, 19], [0, 6, 12 ,18], 
[6, 12, 18, 24], [5, 11, 17, 23]]
 
console.log(winningCombos[1][2]) // array 1, then element 3

const LOOKUP = {
   "1": "Player One",
   "-1": "Player Two"
}

// CATCHED ELEMENTS -------------------------------------------------
const openModal = document.getElementById('instruction-modal')
const playButtonEl = document.getElementById('play-game')
let messageEl = document.getElementById('turn')
const slotEls = document.querySelectorAll('.slot')
const resultModal = document.getElementById('end-game-modal')
const endMessageEl = document.getElementById('end-message')
const restartButtonEl = document.getElementById('restart')

// all catched correctly

// EVENT LISTENERS --------------------------------------------------
playButtonEl.addEventListener("click", closeButton)
slotEls.forEach(function (slotEl){slotEl.addEventListener("click", dropToken)})
restartButtonEl.addEventListener("click", restart)


// FUNCTIONS ---------------------------------------------------------
function init () {
    openModal.showModal();
    board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    player = 1;
    winner = false;
    messageEl.innerText = `It is ${LOOKUP[player]}'s turn`;
}
init ()
function closeButton() {openModal.close()}

function dropToken() { // return to this!! 
    const pickedSlot = parseInt(event.target.id); // use row instead
    const row = board[pickedSlot]
    for(i = 0; i < row.length; i++ ) {
        if (row[i] !== null) return
        else board[pickedSlot][i] = player}; // and there the spot under it is not empty
    board[pickedSlot] = player;
    console.log(board)
 
}

function playerTurn(event) {
    dropToken();
    message();
    turn *= -1;
}


function assessForWinner() {
    resultModal.showModal() // should that be up here?
  
}

function message() { 
    if (winner === "win") endMessageEl.innerText = `Congratulations! You have won! Play again?`
    else if(winner === 'lost') endMessageEl.innerText = `Sorry, you didn't win! Practice makes progress. Play again?`
    else endMessageEl.innerText = `Gasp! It's a tie. Only way to figure out who wins is to play again!`
}

function restart() {
    resultModal.close();
    init ()
}

//board[pickedSlot][i]