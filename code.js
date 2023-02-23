/* eslint-disable prefer-destructuring */
// factory:
const player = (name, token) => {
  let name_ = name;
  const getName = () => name_;
  const getToken = () => token;
  const setName = (newName) => { name_ = newName; };
  return {
    getName,
    getToken,
    setName,
  };
};
const player1 = player('player 1', 'X');
const player2 = player('player 2', 'O');
const btnSubmitPlayerNames = document.getElementById('btnSubmit');
function getPlayernames(e) {
  e.preventDefault();
  const inputPlayerNames = document.querySelectorAll('.inputname');
  player1.setName(inputPlayerNames[0].value);
  player2.setName(inputPlayerNames[1].value);
  console.log(player1.getName());
}
btnSubmitPlayerNames.addEventListener('click', getPlayernames);
/* Field-IDs:
0 1 2
3 4 5
6 7 8
*/
// this is a module:
const gameBoard = (() => {
  const gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let nextPlayer = 1;
  let token;
  let gameHasEnded = false;
  let winnerDeclared = false;
  const getGameHasEnded = () => gameHasEnded;
  const getWinnerDeclared = () => winnerDeclared;
  const setWinnerDeclared = (bool) => { winnerDeclared = bool; };
  const endGame = (winnertoken) => {
    const messageBoard = document.getElementById('messageboard');
    const divPlayAgain = document.getElementById('playagain');
    let winnerName;
    if (winnertoken === 'X') {
      winnerName = player1.getName();
    } else if (winnertoken === 'O') {
      winnerName = player2.getName();
    }
    messageBoard.innerHTML = `${winnerName} has won!`;
    const formPlayAgain = document.createElement('form');
    const btnPlayAgain = document.createElement('button');
    btnPlayAgain.innerHTML = 'Play again?';
    btnPlayAgain.classList.add('btn', 'btn-outline-success', 'input_custom', 'my-2', 'my-sm-0');
    formPlayAgain.appendChild(btnPlayAgain);
    divPlayAgain.appendChild(formPlayAgain);
  };
  const checkWinner = () => {
    let winnertoken;
    if (gameState[0] === gameState[1] && gameState[1] === gameState[2]) {
      winnertoken = gameState[0];
    } else if (gameState[3] === gameState[4] && gameState[4] === gameState[5]) {
      winnertoken = gameState[3];
    } else if (gameState[6] === gameState[7] && gameState[7] === gameState[8]) {
      winnertoken = gameState[6];
    } else if (gameState[0] === gameState[3] && gameState[3] === gameState[6]) {
      winnertoken = gameState[0];
    } else if (gameState[1] === gameState[4] && gameState[4] === gameState[7]) {
      winnertoken = gameState[1];
    } else if (gameState[2] === gameState[5] && gameState[5] === gameState[8]) {
      winnertoken = gameState[2];
    } else if (gameState[0] === gameState[4] && gameState[4] === gameState[8]) {
      winnertoken = gameState[0];
    } else if (gameState[2] === gameState[4] && gameState[4] === gameState[6]) {
      winnertoken = gameState[2];
    }
    if (winnertoken) {
      console.log('winner detected');
      gameHasEnded = true;
      return winnertoken;
    }
    return 'no winner';
  };
  const modifyGamestate = (fieldnumber) => {
    if (gameHasEnded === true) {
      return 'game has ended';
    }
    if (gameState[fieldnumber] === 0) {
      if (nextPlayer === 1) {
        gameState[fieldnumber] = player1.getToken();
        token = player1.getToken();
        nextPlayer = 2;
      } else {
        gameState[fieldnumber] = player2.getToken();
        token = player2.getToken();
        nextPlayer = 1;
      }
    } else {
      token = undefined;
    }
    console.log('played');
    return token;
  };
  const getGamestate = () => gameState;
  return {
    modifyGamestate,
    checkWinner,
    getGamestate,
    endGame,
    getGameHasEnded,
    getWinnerDeclared,
    setWinnerDeclared,
  };
})();

const gamefield = (id) => {
  const getid = () => id;
  const htmlfield = document.getElementById(id);
  let result;
  const fieldClicked = () => {
    const token = gameBoard.modifyGamestate(id);
    if (token === player1.getToken() || token === player2.getToken()) {
      htmlfield.innerHTML = token;
    }
    result = gameBoard.checkWinner();
    if (result !== 'no winner' && gameBoard.getWinnerDeclared() === false) {
      gameBoard.endGame(result);
      gameBoard.setWinnerDeclared(true);
    }
  };
  htmlfield.addEventListener('click', fieldClicked);
  return {
    getid,
  };
};
function buildBoard() {
  const gamefields = [];
  for (let i = 0; i < 9; i++) {
    gamefields[i] = gamefield(i);
  }
}
buildBoard();
