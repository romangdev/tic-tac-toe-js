const boardHTML = document.querySelector(".game-board");
const topRow = document.querySelectorAll('.top-row-location');
const midRow = document.querySelectorAll('.mid-row-location');
const bottomRow = document.querySelectorAll('.bottom-row-location');
const winnerDisplay = document.querySelector('.winner-display');

let c1, c2, c3;
let tmpDiv = null;

let tempWinner = document.createElement('p');
tempWinner.classList.add('announced-winner');
winnerDisplay.prepend(tempWinner);

let replayBtn = document.querySelector('.replay-button');

const gameBoard = (() => {
  let gameBoardArr = [
    [' ', ' ', ' '], 
    [' ', ' ', ' '], 
    [' ', ' ', ' ']];

  const updateBoardLocation = (rowLocation, gameBoardArr, row, column) => {
    rowLocation[column].textContent = `${gameBoardArr[row][column]}`;
  };

  const renderBoard  = () => {
    for (let row = 0; row < gameBoardArr.length; row++) {
      for (let column = 0; column < 3; column++) {
        if (row === 0) {
          updateBoardLocation(topRow, gameBoardArr, row, column);
        } else if (row === 1) {
          updateBoardLocation(midRow, gameBoardArr, row, column);
        } else {
          updateBoardLocation(bottomRow, gameBoardArr, row, column);
        }
      }
    }
  };

  return {
    renderBoard,
    gameBoardArr
  };
})();

const Player = (name, symbol) => {
  
  return {
    name,
    symbol
  };
};

const p1Name = prompt('First player, what is your name?');
const p2Name = prompt('Second player, what is your name?');

const p1Symbol = prompt(`${p1Name}, do you want to be \'X\' or \'O\'?`);
let player1 = Player(p1Name, p1Symbol);
let player2 = null;

if (p1Symbol === 'x') {
  player2 = Player(p2Name, 'o');
} else {
  player2 = Player(p2Name, 'x');
}

const displayController = (() => {
  let currentSymbol = player1.symbol;

  const updateBoard = (currentPlayer, nextPlayer) => {
    if (!(tmpDiv.classList.contains('filled'))) {
      gameBoard.gameBoardArr[selectedRow][selectedColumn] = currentPlayer.symbol;
      gameBoard.renderBoard();
      setTimeout(() => { 
        checkWinner();
        currentSymbol = nextPlayer.symbol;
        }, 50); 
    }
  };

  boardHTML.addEventListener('click', (e) => {
    selectedRow = e.target.getAttribute("data-row");
    selectedColumn = e.target.getAttribute("data-column");
    tmpDiv = document.querySelector(`[data-row="${selectedRow}"][data-column="${selectedColumn}"]`);


    if (currentSymbol === player1.symbol) {
      updateBoard(player1, player2);
      tmpDiv.classList.add('filled');
    } else {
      updateBoard(player2, player1);
      tmpDiv.classList.add('filled');
    }
  });

  winnerDisplay.addEventListener('click', (e) => {
    if (e.target.getAttribute('class') === 'replay-button') {
      for (let i = 0; i < 3; i++) {
        for (let n = 0; n < 3; n++) {
          gameBoard.gameBoardArr[i][n] = ' ';
        }
      }
      removeFilledClass(topRow);
      removeFilledClass(midRow);
      removeFilledClass(bottomRow);
      gameBoard.renderBoard();
    }

    winnerDisplay.classList.add('hidden');
  });

  const removeFilledClass = (row) => {
    row.forEach((square) => {
      square.classList.remove('filled');
    })
  };

  const checkHorizontalWin = () => {
    gameBoard.gameBoardArr.forEach((row) => {
      for (let i = 0; i < 3; i++) {
        if (row[i] === row[i + 1] && row[i] === row[i + 2] && row[i] !== ' ') {
          if (row[i] === player1.symbol) {
            tempWinner.textContent = `${player1.name} (${player1.symbol}) wins!`;
          } else {
            tempWinner.textContent = `${player2.name} (${player2.symbol}) wins!`;
          }
          winnerDisplay.classList.remove('hidden');
          return true;
        } 
      }
    });
    return false;
  };

  const checkVerticalWin = () => {
    for (let i = 0; i < 3; i++) {
      if (gameBoard.gameBoardArr[0][i] === gameBoard.gameBoardArr[1][i] && 
          gameBoard.gameBoardArr[0][i] === gameBoard.gameBoardArr[2][i] &&
          gameBoard.gameBoardArr[0][i] !== ' ') {
            
        if (gameBoard.gameBoardArr[0][i] === player1.symbol) {
          tempWinner.textContent = `${player1.name} (${player1.symbol}) wins!`;
        } else {
          tempWinner.textContent = `${player2.name} (${player2.symbol}) wins!`;
        }
        winnerDisplay.classList.remove('hidden');
        return true;
      }
    }
    return false;
  };

  const checkDiagonalWin = () => {
    if (((gameBoard.gameBoardArr[0][0] === gameBoard.gameBoardArr[1][1] && 
        gameBoard.gameBoardArr[0][0] === gameBoard.gameBoardArr[2][2]) || 
        (gameBoard.gameBoardArr[0][2] === gameBoard.gameBoardArr[1][1] && 
        gameBoard.gameBoardArr[0][2] === gameBoard.gameBoardArr[2][0])) &&
        gameBoard.gameBoardArr[1][1] !== ' ') {

      if (gameBoard.gameBoardArr[1][1] === player1.symbol) {
        tempWinner.textContent = `${player1.name} (${player1.symbol}) wins!`;
      } else {
        tempWinner.textContent = `${player2.name} (${player2.symbol}) wins!`;
      }
      winnerDisplay.classList.remove('hidden');
      return true;
    }
    return false;
  };

  const checkTie = () => {
    let flag = true
    for (let i = 0; i < 3; i++) {
      for (let n = 0; n < 3; n++) {
        if (gameBoard.gameBoardArr[i][n] === " ") {
          flag = false;
        }
      }
    }

    if (flag === true) {
      tempWinner.textContent = "It's a tie!";
      winnerDisplay.classList.remove('hidden');
    }
  };

  const checkWinner = () => {
    c1 = checkHorizontalWin();
    c2 = checkVerticalWin();
    c3 = checkDiagonalWin();
    if (c1 === false && c2 === false && c3 === false) {
      checkTie();
    }
  };
})();