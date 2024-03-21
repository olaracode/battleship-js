function createMatrix(size = 10) {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

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

function createCoordinate(i) {
  const x = Math.floor(Math.random() * (10 - i) + 1);
  const y = Math.floor(Math.random() * (10 - i) + 1);
  if (x + i > 8 || y + i > 8) {
    return createCoordinate(i);
  }
  return { x, y };
}

function validateCoordinates(existingShips, newCoordinates) {
  return existingShips.some((ship) =>
    ship.some(
      (coordinate) =>
        coordinate.x == newCoordinates.x && coordinate.y == newCoordinates.y
    )
  );
}

function horizontal() {
  return Math.round(Math.random());
}

function createShipCoordinates(existingShips, shipSize, attempts = 0) {
  if (attempts > 20) {
    throw new Error("Maximo de intentos realizados");
  }
  const shipCoordinates = [];
  const startCoordinates = createCoordinate(shipSize);
  const isHorizontal = horizontal();

  if (validateCoordinates(existingShips, startCoordinates)) {
    return createShipCoordinates(existingShips, shipSize, attempts + 1);
  }

  for (let j = 0; j <= shipSize; j++) {
    if (j == 0) {
      shipCoordinates.push(startCoordinates);
      continue;
    }

    let positionalCoordinate = {
      x: isHorizontal ? startCoordinates.x : startCoordinates.x + j,
      y: isHorizontal ? startCoordinates.y + j : startCoordinates.y,
    };

    if (validateCoordinates(existingShips, positionalCoordinate)) {
      return createShipCoordinates(existingShips, shipSize, attempts + 1);
    }

    shipCoordinates.push(positionalCoordinate);
  }
  return shipCoordinates;
}

function createShips(matrix, ships = 1) {
  const shipyard = [];
  for (let i = 0; i < ships; i++) {
    shipyard.push(createShipCoordinates(shipyard, i));
  }
  for (let ship of shipyard) {
    for (let coordinates of ship) {
      matrix[coordinates.y][coordinates.x] = 1;
    }
  }
  return shipyard;
}

// constant values
const SHIPS = 5; // the number of ships to be used
const WATER_VALUE = 0;
const SHIP_VALUE = 1;
const HIT_VALUE = 2;
const MISS_VALUE = 3;
const HIT_COLOR = "red";
const MISS_COLOR = "lightgray";

const board = document.getElementById("board");

function fireTorpedo(cell, x, y, matrix, ships) {
  if (matrix[y][x] == SHIP_VALUE) {
    matrix[y][x] = HIT_VALUE;
    cell.style.backgroundColor = HIT_COLOR;
  } else if (matrix[y][x] == WATER_VALUE) {
    matrix[y][x] = MISS_VALUE;
    cell.style.backgroundColor = MISS_COLOR;
  }
}

function evaluateMatrix(ships, matrix) {
  const gameContinues = matrix.find((arr) => arr.any((item) => item == 1));
  if (gameContinues) {
    return;
  } else {
    alert("Se acabo el juego");
  }
}
function addTile(coordinates, matrix, ships) {
  const cell = createBoardCell();
  cell.addEventListener("click", () => {
    fireTorpedo(cell, coordinates.x, coordinates.y, matrix);
    evaluateMatrix(ships, matrix);
  });
  return cell;
}

window.onload = () => {
  const matrix = createMatrix(); // creamos el tablero
  const ships = createShips(matrix, SHIPS); // al tablero le agregamos las naves
  const tiles = [];
  for (let yPosition = 0; yPosition < matrix.length; yPosition++) {
    for (let xPosition = 0; xPosition < matrix[yPosition].length; xPosition++) {
      let cell;
      if (yPosition == 0 && xPosition == 0) {
        cell = createVoidCell();
      } else if (yPosition == 0) {
        cell = createHeader(xPosition, "row");
      } else if (xPosition == 0) {
        cell = createHeader(yPosition, "col");
      } else {
        cell = addTile({ x: xPosition, y: yPosition }, matrix, ships, tiles);
      }
      board.appendChild(cell);
      tiles.push(cell);
    }
  }
};
