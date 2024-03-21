/* 
  [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
  ]
*/
const SHIPS = 5;
const SHIP_SIZES = [1, 2, 3, 3, 4, 5];
const styles = {
  header: "battleship-header",
  headerCol: "col",
  headerRow: "row",
  cell: "battleship-cell",
};

function createShipsWithSizes() {}

function createMatrix() {
  const matrix = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push(0);
    }
    matrix.push(row);
  }
  return matrix;
}

function horizontal() {
  return Math.round(Math.random()); // returns (0: false) or (1: true)
}

function coordinates(size, attempts = 0) {
  if (attempts > 10) {
    alert("MAXIMUN DEPTH EXCEDED");
    return;
  }
  const x = Math.floor(Math.random() * (10 - size) + 1);
  const y = Math.floor(Math.random() * (10 - size) + 1);
  if (x + size > 8 || y + size > 8) {
    return coordinates(size, attempts + 1);
  }
  return { x, y };
}

function evaluateCoordinates(ships, coordinates) {
  if (ships.length < 1) return false;
  return ships.find((ship) =>
    ship.find(
      (shipCoordinates) =>
        shipCoordinates.x == coordinates.x && shipCoordinates.y == coordinates.y
    )
  );
}

function generateCoordinates(size, ships, attempts = 0) {
  function retry() {
    return generateCoordinates(size, ships, attempts + 1);
  }

  if (attempts > 10) {
    alert("MAXIMUN DEPTH EXCEDED");
    return;
  }

  const shipCoordinates = [];
  const startCoordinates = coordinates(size);
  if (evaluateCoordinates(ships, startCoordinates)) {
    return retry();
  }

  const isHorizontal = horizontal();

  for (let i = 0; i < size; i++) {
    if (i == 0) {
      shipCoordinates.push(startCoordinates);
      continue;
    }

    let nextCoordinate;
    if (isHorizontal) {
      nextCoordinate = { ...startCoordinates, y: startCoordinates.y + i };
    } else {
      nextCoordinate = { ...startCoordinates, x: startCoordinates.x + i };
    }

    if (evaluateCoordinates(ships, nextCoordinate)) {
      return retry();
    }

    shipCoordinates.push(nextCoordinate);
  }
  return shipCoordinates;
}

function createShips(matrix) {
  const ships = [];
  for (let i = 1; i <= SHIPS; i++) {
    ships.push(generateCoordinates(i, ships));
  }
  for (let ship of ships) {
    for (let position of ship) {
      matrix[position.y][position.x] = 1;
    }
  }
  return { matrix, ships };
}

function drawBoard(matrix) {
  const board = document.getElementById("board");
  const tileMatrix = [];
  for (let yAxis = 0; yAxis < matrix.length; yAxis++) {
    const col = [];
    for (let xAxis = 0; xAxis < matrix[yAxis].length; xAxis++) {
      const element = document.createElement("div");
      if (yAxis === 0 && xAxis === 0) {
        element.classList.add(styles.header);
      } else if (yAxis == 0) {
        element.classList.add(styles.header, styles.headerRow);
        element.innerText = xAxis;
      } else if (xAxis == 0) {
        element.classList.add(styles.header, styles.headerRow);
        element.innerText = yAxis;
      } else {
        element.classList.add(styles.cell);
        const matrixElementValue = matrix[yAxis][xAxis];
        if (matrixElementValue === 1) {
          element.style.backgroundColor = "red";
        }
      }
      board.appendChild(element);
      col.push(element);
    }
    tileMatrix.push(col);
  }
  return tileMatrix;
}

// runs as soon as window loads
window.onload = () => {
  const { matrix, ships } = createShips(createMatrix());
  // todos los elementos de la matriz que tengan un indice 0(y: 0 o x: 0) son parte del marco
  const tileMatrix = drawBoard(matrix, ships);
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (y == 0 || x == 0) continue;
    }
  }
};
