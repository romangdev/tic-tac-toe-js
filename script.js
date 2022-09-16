const boardHTML = document.querySelector(".game-board");
const topRow = document.querySelectorAll('.top-row-location');
const midRow = document.querySelectorAll('.mid-row-location');
const bottomRow = document.querySelectorAll('.bottom-row-location');

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

const Player = (number, symbol) => {
  
  return {
    number,
    symbol
  };
};

const p1Symbol = prompt('Player 1, do you want to be \'X\' or \'O\'?');
let player1 = Player(1, p1Symbol);
let player2 = null;

if (p1Symbol === 'x') {
  player2 = Player(2, 'o');
} else {
  player2 = Player(2, 'x');
}

const displayController = (() => {
  let currentSymbol = player1.symbol;

  boardHTML.addEventListener('click', (e) => {
    selectedRow = e.target.getAttribute("data-row");
    selectedColumn = e.target.getAttribute("data-column");

    if (currentSymbol === player1.symbol) {
      gameBoard.gameBoardArr[selectedRow][selectedColumn] = player1.symbol;
      currentSymbol = player2.symbol;
    } else {
      gameBoard.gameBoardArr[selectedRow][selectedColumn] = player2.symbol;
      currentSymbol = player1.symbol;
    }
    gameBoard.renderBoard();
    checkWinner();
  });

  const checkWinner = () => {
    gameBoard.gameBoardArr.forEach((row) => {
      for (let i = 0; i < 3; i++) {
        if (row[i] === row[i + 1] && row[i] === row[i + 2] && row[i] !== ' ') {
          if (row[i] === player1.symbol) {
            alert(`Player 1 (${player1.symbol} wins)!`);
          } else {
            alert(`Player 2 (${player2.symbol} wins)!`);
          }
        }
      }
    });

    for (let i = 0; i < 3; i++) {
      if (gameBoard.gameBoardArr[0][i] === gameBoard.gameBoardArr[1][i] && 
          gameBoard.gameBoardArr[0][i] === gameBoard.gameBoardArr[2][i] &&
          gameBoard.gameBoardArr[0][i] !== ' ') {
        if (gameBoard.gameBoardArr[i][0] === player1.symbol) {
          alert(`Player 1 (${currentSymbol} wins)!`);
        } else {
          alert(`Player 2 (${currentSymbol} wins)!`);
        }
        // but alerting correct winner symbol
      }
    }
  };
})();

gameBoard.renderBoard();

// let runGame = true;
// let turn;

// while (runGame) {
//   turn = player1.number;
// }