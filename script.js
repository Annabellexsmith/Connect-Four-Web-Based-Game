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
const messageEl = document.getElementById('turn')
const slotEls = document.querySelectorAll('.slot')
const resultModal = document.getElementById('end-game-modal')
const endMessageEl = document.getElementById('end-message')
const restartButtonEl = document.getElementById('restart')

// all catched correctly

// EVENT LISTENERS --------------------------------------------------
playButtonEl.addEventListener("click", closeButton)
//slotEls.forEach(function (slotEl){slotEl.addEventListener("click", dropToken)})
restartButtonEl.addEventListener("click", restart)


// FUNCTIONS ---------------------------------------------------------
function init () {
    openModal.showModal();
    board = [null, null, null, null, null], [null, null, null, null, null], [null, null, null, null, null], [null, null, null, null, null], [null, null, null, null, null];
    player = 1;
    winner = false;
    messageEl.innerText = `It is ${LOOKUP[player]}'s turn`;
}
init ()
function closeButton() {openModal.close()}

function dropToken(event) { // return to this!! 
    const pickedColumnButton = parseInt(event.target.id); // use row instead
    const column = board[pickedColumnButton]
    for(let i = 0; i < column.length; i++ ) {
        if (row[i] !== null) return
        else {
            board[pickedColumnButton][i] = player
            column[pickedColumnButton].children[i].innerText = token
        }; 
    }
}
    function playerTurn() {
        dropToken();
        const winner = assessForWinner() 
        
      if (board !== null) message(winner); // if the board is full
      else turn *= -1;
}

function assessForWinner() {
    resultModal.showModal() // should that be up here?
  
}

function message(player) { 
    if (player === "win") endMessageEl.innerText = `Congratulations! ${player} you have won! Play again?`
    else endMessageEl.innerText = `Gasp! It's a tie. Only way to figure out who wins is to play again!`
}

function restart() {
    resultModal.close();
    init ()
}

//board[pickedSlot][i