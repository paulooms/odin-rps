// x Stop at 5 rounds
// - Throw result message (use array for history?)
// - Change style to indicate no more responsive buttons

// - add round play history

let score = [0, 0];
let roundCounter = 0;
let playHistory = []; // array of arrays with [playerChoice, computerChoice, roundscore, roundResult]

const buttons = document.querySelectorAll('button');
const roundCounterDiv = document.querySelector('#roundcounter');
const scoreDiv = document.querySelector('#score');
const container = document.querySelector('.container');
const playArea = document.querySelector('.playarea');
const playHistoryList = document.querySelector('#playhistorylist');


function computer() {
    let choices = ["ROCK", "PAPER", "SCISSORS"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function playerSelection() {
    // get input
    let playerInput = prompt("Please choose Rock, Paper or Scissors.");
    // make uppercase
    playerInput = playerInput.toUpperCase();
    // check validity
    if (playerInput === "ROCK" || playerInput === "PAPER" || playerInput === "SCISSORS") {
        return playerInput;
    } else {
        alert("Oops, try again!");
        return playerSelection();
    }
}

function playRound(computer, player) {

    // determine result

    if (computer === player) {
        roundCounter++

        container.classList.add('tie'); // change styling
        container.classList.remove('start', 'loss', 'win');

        // playHistory.unshift([player, computer, score, "tie"]);

        const playHistoryListItem = document.createElement('li');

        playHistoryListItem.textContent = `You picked: ${player}. \nComputer picked: ${computer}.`

        playHistoryListItem.classList.add('playhistorylistitem', 'tie');

        playHistoryList.insertBefore(playHistoryListItem, playHistoryList.firstChild);

        playArea.textContent = "You picked: " + player + "\nComputer picked: " + computer + "\nIt's a tie"

    } else if (

        computer === "ROCK" && player === "SCISSORS" ||
        computer === "SCISSORS" && player === "PAPER" ||
        computer === "PAPER" && player === "ROCK"
    ) {
        roundCounter++

        container.classList.add('loss'); // change styling
        container.classList.remove('start', 'tie', 'win');

        const playHistoryListItem = document.createElement('li');

        playHistoryListItem.textContent = `You picked: ${player}. \nComputer picked: ${computer}.`

        playHistoryListItem.classList.add('playhistorylistitem', 'loss');

        playHistoryList.insertBefore(playHistoryListItem, playHistoryList.firstChild);

        // playHistory.unshift([player, computer, score, "loss"]);

        score[1]++;
        playArea.textContent = "You picked: " + player + "\nComputer picked: " + computer + "\nYou lose!"
    } else {
        roundCounter++
        container.classList.add('win'); // change styling
        container.classList.remove('start', 'tie', 'loss');

        const playHistoryListItem = document.createElement('li');

        playHistoryListItem.textContent = `You picked: ${player}. \nComputer picked: ${computer}.`

        playHistoryListItem.classList.add('playhistorylistitem', 'win');

        playHistoryList.insertBefore(playHistoryListItem, playHistoryList.firstChild);

        // playHistory.unshift([player, computer, score, "win"]);

        score[0]++;
        playArea.textContent = "You picked: " + player + "\nComputer picked: " + computer + "\nYou win!"
    }
}


buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let answer = button.id.toUpperCase();

        playRound(computer(), answer);
        roundCounterDiv.textContent = `${roundCounter} / 5`;
        scoreDiv.textContent = `PLAYER ${score[0]} - ${score[1]} COMPUTER`;
    })
})