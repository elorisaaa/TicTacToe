let player1 = {};
let player2 = {};
let flag = false;
function clearBoard() {
    let gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
    return gameBoard;
}

function createPlayer(name){
    let score = 0;
    const getScore = () => score;
    const getName = () => name;
    const addScore = () => score++; 
    return {getName, getScore, addScore};
}

function resetGame(boxes) {
    boxes.forEach((box) => {
    const clonedElement = box.cloneNode(true);       // clone the box (no event listeners)
    clonedElement.textContent = "";                  // reset display
    box.parentNode.replaceChild(clonedElement, box); // replace box with clean clone
    });
    proceedGame([[0,0,0],[0,0,0],[0,0,0]]);
}

function winningCondition(gameBoard, x, y) {
    const player = gameBoard[x][y]
    if (x != 1 && y != 1){
        if (gameBoard[1][1] === player && gameBoard[2 - x][2 - y] === player){
            return true;
        }
        else if (gameBoard[1][y] === player){
            if (gameBoard[2-x][y] === player){
                return true;
            }
        }
        else if (gameBoard[x][1] === player){
            if (gameBoard[x][2-y] === player){
                return true;
            }
        }
    }
    else if (x==1 && y==1) {
        if (gameBoard[0][0] === player && gameBoard[2][2] === player) return true;
        if (gameBoard[0][2] === player && gameBoard[2][0] === player) return true;
        if (gameBoard[0][1] === player && gameBoard[2][1] === player) return true;
        if (gameBoard[1][0] === player && gameBoard[1][2] === player) return true;
    }
    else if (x == 0 && y == 1) {
        if (gameBoard[0][0] === player && gameBoard[0][2] === player) return true;
        else if (gameBoard[1][1] === player && gameBoard[2][1] === player) return true;
    }
    else if (x == 1 && y == 0) {
        if (gameBoard[0][0] === player && gameBoard[2][0] === player) return true;
        else if (gameBoard[1][1] === player && gameBoard[1][2] === player) return true;
    }
    else if (x == 1 && y == 2) {
        if (gameBoard[0][2] === player && gameBoard[2][2] === player) return true;
        else if (gameBoard[1][1] === player && gameBoard[1][0] === player) return true;
    }
    else if (x == 2 && y == 1) {
        if (gameBoard[2][0] === player && gameBoard[2][2] === player) return true;
        else if (gameBoard[1][1] === player && gameBoard[0][1] === player) return true;
    }
    else {
        return false;
    }
}

function choice(gameBoard, currentPlayer, x, y, box){
    if (currentPlayer === 'X'){
        gameBoard[x][y] = 'X';
        currentPlayer = 'O';
        box.textContent = "O"
    }
    else if (currentPlayer === 'O'){
        gameBoard[x][y] = 'O';
        currentPlayer = 'X';
        box.textContent = "X";
    }
    return gameBoard, currentPlayer;
}

function proceedGame(gameBoard){    
    //init value
    const playerXName = document.querySelector(".player1");
    const playerOName = document.querySelector(".player2");
    var counter = 0;
    var currentPlayer = 'X';
    const boxes = document.querySelectorAll(".block");
    const result = document.querySelector("#result");
    const score1 = document.querySelector(".label1");
    const score2 = document.querySelector(".label2");
    //game logic
    boxes.forEach((box) => box.addEventListener("click", handleBoxClick));
    function handleBoxClick(event) {
      if (!playerXName.value && !playerOName.value) {
        alert("Please enter 2 player names");
      } else {
        if (flag === false){
            player1 = createPlayer(playerXName.value);
            player2 = createPlayer(playerOName.value);
            flag = true;
        }
        event.preventDefault();
        const box = event.currentTarget;
        box.removeEventListener("click", handleBoxClick);
        const x = box.dataset.x;
        const y = box.dataset.y;
        gameBoard, currentPlayer = choice(gameBoard, currentPlayer, x, y, box);
        console.log(gameBoard)
        if(winningCondition(gameBoard, x, y)==true){
            if(currentPlayer === 'X'){
                boxes.forEach((box) => box.removeEventListener("click", handleBoxClick));
                result.textContent = player2.getName() + " Win!";
                player2.addScore();
                score2.textContent = "Score: " + player2.getScore();
            } else if (currentPlayer === 'O'){
                boxes.forEach((box) => box.removeEventListener("click", handleBoxClick));
                result.textContent = player1.getName() + " Win!";
                player1.addScore();
                score1.textContent = "Score: " + player1.getScore();
            }
            setTimeout(function(){
                result.textContent = "";
                resetGame(boxes);
            },2000)
        }}

        if(counter === 9){
            boxes.forEach((box) => box.removeEventListener("click", handleBoxClick));
            result.textContent = "A tie!";
            counter = 0;
            setTimeout(function(){
                result.textContent = "";
                resetGame(boxes);
            },2000)
        }
        else{
            counter+=1;
        }
    }
}

window.onload = () => {
    proceedGame([[0,0,0],[0,0,0],[0,0,0]]);
}


