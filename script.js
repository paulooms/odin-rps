let score = [0, 0];
let roundCounter = 0;

const buttonContainer = document.querySelector('.playarea')
const buttons = document.querySelectorAll('.button');
const roundCounterDiv = document.querySelector('#roundcounter');
const scoreDiv = document.querySelector('#score');
const displayPlayer = document.querySelector('.display-player');
const displayCPU = document.querySelector('.display-cpu');
const playArea = document.querySelector('.display');
const playHistoryList = document.querySelector('#playhistorylist');
const endParagraph = document.querySelector('.endmessage');
const popup = document.querySelector(".popup");
const againButtonContainer = document.querySelector('.againbuttoncontainer');

function computer() {
    let choices = ["ROCK", "PAPER", "SCISSORS"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function processResult(result, computer, player) {
    roundCounter++

    displayPlayer.classList.remove('start', 'tie', 'win', 'loss');
    displayPlayer.classList.add(`${result}`); // change styling
    displayCPU.classList.remove('start', 'tie', 'win', 'loss');
    displayCPU.classList.add(`${result}`); // change styling
    displayPlayer.textContent = `${player}`;
    displayCPU.textContent = `${computer}`;

    const playHistoryListItem = document.createElement('li');

    playHistoryListItem.innerHTML = `You picked: <b>${player}.</b> </br>Computer picked: <b>${computer}.</b></br><i>It's a ${result}!</i>`

    playHistoryListItem.classList.add('playhistorylistitem', `${result}`);
    playHistoryList.insertBefore(playHistoryListItem, playHistoryList.firstChild);
}

function playRound(computer, player) {
    if (computer === player) {

        processResult('tie', `${computer}`, `${player}`);

    } else if (
        computer === "ROCK" && player === "SCISSORS" ||
        computer === "SCISSORS" && player === "PAPER" ||
        computer === "PAPER" && player === "ROCK"
    ) {
        score[1]++
        processResult('loss', `${computer}`, `${player}`);

    } else {
        score[0]++
        processResult('win', computer, player);
    }
}

function gameOver() {
    buttons.forEach((button) => {
        button.disabled = true;
    })

    const restartButton = document.querySelector('.restartButton');

    restartButton.addEventListener('click', function () {
        location.reload();
    })

    setTimeout(function () {
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
    }, 1000);



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