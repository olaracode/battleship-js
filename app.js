// 1 is a ship
// 0 is water
// 2 is a miss
// 3 is a hit
const gameBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
];

function createVoidCell() {
  const voidCell = document.createElement("div");
  voidCell.style.backgroundColor = "red";
  voidCell.style.height = "30px";
  voidCell.style.width = "30px";
  return voidCell;
}

function createHeader(index, type) {
  const header = document.createElement("div");
  header.innerText = index;
  header.classList.add("battleship-header", type);
  return header;
}

function createBoardCell() {
  const boardCell = document.createElement("div");
  boardCell.classList.add("battleship-cell");
  return boardCell;
}

window.onload = function () {
  let matrix = [...gameBoard];
  function fireTorpedo(yAxis, xAxis) {
    if (matrix[yAxis][xAxis] === 1) {
      matrix[yAxis][xAxis] = 3;
      console.log("Hit!");
    } else if (matrix[yAxis][xAxis] === 0) {
      matrix[yAxis][xAxis] = 2;
    }
    const isGameOver = matrix.every((row) => row.every((cell) => cell !== 1));
    if (isGameOver) {
      alert("Game over");
    }
    renderBoard();
  }
  function renderBoard() {
    let domBoard = document.getElementById("board");
    domBoard.innerHTML = ""; // Clear the board
    console.log("RENDERING BOARD");
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        let cell;
        if (y == 0 && x == 0) {
          cell = createVoidCell();
        } else if (y == 0) {
          cell = createHeader(x, "col");
        } else if (x == 0) {
          cell = createHeader(y, "row");
        } else {
          cell = createBoardCell();
          console.log(matrix[y][x] === 2);
          if (matrix[y][x] === 2) {
            console.log("Changing color");
            cell.style.backgroundColor = "blue";
          }
          if (matrix[y][x] === 3) {
            cell.style.backgroundColor = "red";
          }
          cell.addEventListener("click", function () {
            fireTorpedo(y, x);
          });
        }
        domBoard.appendChild(cell);
      }
    }
  }
  renderBoard();
};
