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

const LOOKUP = {
    player1: 1,
    player2: -1
}

// CATCHED ELEMENTS -------------------------------------------------
const playButtonEl = document.getElementById('play-game')
const restartButtonEl = document.getElementById('restart')
const openModal = document.getElementById('instruction-modal')
const resultModal = document.getElementById('end-game-modal')
const messageEl = document.getElementById('turn')
const slotEls = document.querySelectorAll('.slot')

// all catched correctly

// EVENT LISTENERS --------------------------------------------------
playButtonEl.addEventListener("click", closeButton)
restartButtonEl.addEventListener("click", restart)
slotEls.forEach (function (slotEl) {slotEl.addEventListener("click", updateBpard)})

// FUNCTIONS ---------------------------------------------------------
function init () {
    openModal.showModal();
    board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    player = 1;
    winner = false;
}
init ()
function closeButton() {openModal.close()}

function updateBoard(slotEl) {
    const slot = (slotEl.currentTarget.id);
    if (slot === null && slot[-5] !== null) {event.target.innerText = player};
}

function playerTurn() {
}


function determWinner() {
    
}
function message() { //can we merge this one with determWinner
    resultModal.showModal()
}

function restart() {resultModal.close()}