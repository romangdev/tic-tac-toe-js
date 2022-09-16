const boardHTML = document.querySelector(".game-board");
const topRow = document.querySelectorAll('.top-row-location');
const midRow = document.querySelectorAll('.mid-row-location');
const bottomRow = document.querySelectorAll('.bottom-row-location');
const winnerDisplay = document.querySelector('.winner-display');

let tempWinner = document.createElement('p');
tempWinner.classList.add('announced-winner');
winnerDisplay.appendChild(tempWinner);
tempWinner.textContent = `Roman (x) wins!`;

let replayBtn = document.createElement('button');
replayBtn.classList.add('replay-button');
replayBtn.textContent = 'Play Again?'
winnerDisplay.appendChild(replayBtn);

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

// const p1Name = prompt('First player, what is your name?');
// const p2Name = prompt('Second player, what is your name?');

// const p1Symbol = prompt(`${p1Name}, do you want to be \'X\' or \'O\'?`);
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
    gameBoard.gameBoardArr[selectedRow][selectedColumn] = currentPlayer.symbol;
    gameBoard.renderBoard();
    setTimeout(() => { 
      checkWinner();
      currentSymbol = nextPlayer.symbol;
     }, 50); 
  };

  boardHTML.addEventListener('click', (e) => {
    selectedRow = e.target.getAttribute("data-row");
    selectedColumn = e.target.getAttribute("data-column");

    if (currentSymbol === player1.symbol) {
      updateBoard(player1, player2);
    } else {
      updateBoard(player2, player1);
    }
  });

  const checkHorizontalWin = () => {
    gameBoard.gameBoardArr.forEach((row) => {
      for (let i = 0; i < 3; i++) {
        if (row[i] === row[i + 1] && row[i] === row[i + 2] && row[i] !== ' ') {
          if (row[i] === player1.symbol) {
            // alert(`${player1.name} (${player1.symbol}) wins!`);
            let tempWinner = document.createElement('p');
            winnerDisplay.appendChild(tempWinner);
            winnerDisplay.textContent = `${player1.name} (${player1.symbol}) wins!`

          } else {
            alert(`${player2.name} (${player2.symbol}) wins!`);
          }
        }
      }
    });
  };

  const checkVerticalWin = () => {
    for (let i = 0; i < 3; i++) {
      if (gameBoard.gameBoardArr[0][i] === gameBoard.gameBoardArr[1][i] && 
          gameBoard.gameBoardArr[0][i] === gameBoard.gameBoardArr[2][i] &&
          gameBoard.gameBoardArr[0][i] !== ' ') {
            
        if (gameBoard.gameBoardArr[0][i] === player1.symbol) {
          alert(`${player1.name} (${currentSymbol}) wins!`);
        } else {
          alert(`${player2.name} (${currentSymbol}) wins!`);
        }
      }
    }
  };

  const checkDiagonalWin = () => {
    if (((gameBoard.gameBoardArr[0][0] === gameBoard.gameBoardArr[1][1] && 
        gameBoard.gameBoardArr[0][0] === gameBoard.gameBoardArr[2][2]) || 
        (gameBoard.gameBoardArr[0][2] === gameBoard.gameBoardArr[1][1] && 
        gameBoard.gameBoardArr[0][2] === gameBoard.gameBoardArr[2][0])) &&
        gameBoard.gameBoardArr[1][1] !== ' ') {

      if (gameBoard.gameBoardArr[1][1] === player1.symbol) {
        alert(`${player1.name} (${currentSymbol}) wins!`);
      } else {
        alert(`${player2.name} (${currentSymbol}) wins!`);
      }
    }
  };

  const checkWinner = () => {
    checkHorizontalWin();
    checkVerticalWin();
    checkDiagonalWin();
  };
})();