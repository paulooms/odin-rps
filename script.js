
let score = [0,0];
// define computer selection

function computerSelection() {
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
        return "You picked: " + player + "\nComputer picked: " + computer + "\nIt's a tie"
    } else if (
        computer === "ROCK" && player === "SCISSORS" ||
        computer === "SCISSORS" && player === "PAPER" ||
        computer === "PAPER" && player === "ROCK"
    ) {
        score[1] ++;
        return "You picked: " + player + "\nComputer picked: " + computer + "\nYou lose!"
    } else {
        score[0] ++;
        return "You picked: " + player + "\nComputer picked: " + computer + "\nYou win!"
    }

}

// play 5 rounds of rps

function game(){
    for (let i = 0; i < 5; i++){
        console.log(playRound(computerSelection(), playerSelection()))
        console.log("The score is:\nPlayer: " + score[0] + "\nComputer: " + score[1]);
    }
    console.log("The game is over!")
    if (score[0] > score [1]){
        console.log("You win!");
    }

    else if (score[0] < score[1]){
        console.log("You lose!");
    }

    else {
        console.log("It's a tie!");
    }
}

game();