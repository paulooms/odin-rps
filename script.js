let score = [0, 0];
let roundCounter = 0;

// let playHistory = []; // array of arrays with [playerChoice, computerChoice, roundscore, roundResult]

const buttonContainer = document.querySelector('.playarea')
const buttons = document.querySelectorAll('button');
const roundCounterDiv = document.querySelector('#roundcounter');
const scoreDiv = document.querySelector('#score');
const displayPlayer = document.querySelector('.display-player');
const displayCPU = document.querySelector('.display-cpu');
const playArea = document.querySelector('.display');
const playHistoryList = document.querySelector('#playhistorylist');
const endParagraph = document.querySelector('.endmessage');
const popup = document.querySelector(".popup");



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

        displayPlayer.classList.add('tie'); // change styling
        displayPlayer.classList.remove('start', 'loss', 'win');

        displayCPU.classList.add('tie'); // change styling
        displayCPU.classList.remove('start', 'loss', 'win');

        // playHistory.unshift([player, computer, score, "tie"]);

        const playHistoryListItem = document.createElement('li');

        playHistoryListItem.innerHTML = `You picked: <b>${player}.</b> </br>Computer picked: <b>${computer}.</b></br><i>It's a tie!</i>`

        playHistoryListItem.classList.add('playhistorylistitem', 'tie');

        playHistoryList.insertBefore(playHistoryListItem, playHistoryList.firstChild);

        displayPlayer.textContent = `${player}`;
        displayCPU.textContent = `${computer}`;


    } else if (

        computer === "ROCK" && player === "SCISSORS" ||
        computer === "SCISSORS" && player === "PAPER" ||
        computer === "PAPER" && player === "ROCK"
    ) {
        roundCounter++

        displayPlayer.classList.add('loss'); // change styling
        displayPlayer.classList.remove('start', 'tie', 'win');

        displayCPU.classList.add('win'); // change styling
        displayCPU.classList.remove('start', 'loss', 'tie');

        const playHistoryListItem = document.createElement('li');

        playHistoryListItem.innerHTML = `You picked: <b>${player}.</b> </br>Computer picked: <b>${computer}.</b></br><i>You lost the round!</i>`

        playHistoryListItem.classList.add('playhistorylistitem', 'loss');

        playHistoryList.insertBefore(playHistoryListItem, playHistoryList.firstChild);

        // playHistory.unshift([player, computer, score, "loss"]);

        score[1]++;

        displayPlayer.textContent = `${player}`;
        displayCPU.textContent = `${computer}`;


    } else {
        roundCounter++
        displayPlayer.classList.add('win'); // change styling
        displayPlayer.classList.remove('start', 'tie', 'loss');

        displayCPU.classList.add('loss'); // change styling
        displayCPU.classList.remove('start', 'tie', 'win');

        const playHistoryListItem = document.createElement('li');

        playHistoryListItem.innerHTML = `You picked: <b>${player}.</b> </br>Computer picked: <b>${computer}.</b></br><i>You won the round!</i>`

        playHistoryListItem.classList.add('playhistorylistitem', 'win');

        playHistoryList.insertBefore(playHistoryListItem, playHistoryList.firstChild);

        // playHistory.unshift([player, computer, score, "win"]);

        score[0]++;
        displayPlayer.textContent = `${player}`;
        displayCPU.textContent = `${computer}`;


    }
}

const againButtonContainer = document.querySelector('.againbuttoncontainer');




function gameOver() {




    buttons.forEach((button) => {
        button.disabled = true;



    })


    const restartButton = document.createElement('button')
    restartButton.classList.add('button');
    restartButton.textContent = 'Play again!';

    againButtonContainer.appendChild(restartButton);
    restartButton.addEventListener('click', function () {
        location.reload();
    })

    if (score[0] < score[1]) {
        endParagraph.textContent = "You lost, bummer!";
        popup.classList.add('loss', 'show');
    } else if (score[0] > score[1]) {
        endParagraph.textContent = "You won, awesome!"
        popup.classList.add('win', 'show');
    } else {
        endParagraph.textContent = "It's a tie. Boring!"
        popup.classList.add('tie', 'show');
    }

}

buttons.forEach((button) => {
    button.addEventListener('click', function () {
        let answer = button.id.toUpperCase();

        playRound(computer(), answer);
        roundCounterDiv.textContent = `Round: ${roundCounter} / 5`;
        scoreDiv.textContent = `${score[0]}-${score[1]}`;

        if (roundCounter >= 5) {
            gameOver();
        }
    })
})