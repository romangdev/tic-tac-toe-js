const topRow = document.querySelectorAll('.top-row-location');
const midRow = document.querySelectorAll('.mid-row-location');
const bottomRow = document.querySelectorAll('.bottom-row-location');

const gameBoard = (() => {
  let gameBoardArr = [
    ['x', 'x', 'o'], 
    ['x', 'x', 'o'], 
    ['x', 'x', 'o']];

  const updateBoardLocation = (rowLocation, gameBoardArr, row, column) => {
    rowLocation[column].innerHTML = `<p>${gameBoardArr[row][column]}</p>`;
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
    renderBoard
  };
})();

const displayController = (() => {

})();

const Player = () => {
  return;
};

gameBoard.renderBoard();