# Battleship con js

## Tabla de Contenidos

- [Descripción](#descripción)
- [Instalación](#instalación)
- [HTML](#html)
- [CSS](#css)
- [JavaScript](#javascript)
- [Extras](#extras)
  - [Como crear la matris programaticamente](#como-crear-la-matris-programaticamente)
  - [Agregar naves aleatorias a una matriz](#agregar-naves-aleatorias-a-una-matriz)

## Descripción

Juego de batalla naval desarrollado en javascript, html y css.

## Instalación

Para empezar a trabajar este proyecto necesitas un editor de texto como [visual studio code](https://code.visualstudio.com/). Y una extensión de visual studio code llamada [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

## HTML

El archivo index.html va a funcionar como nuestro contenedor principal de la aplicación

- En el archivo index.html vamos a tener un contenedor principal con la clase battleship-container y un título con la clase battleship-title. Dentro de este contenedor vamos a tener un div con la clase battleship-board y un id board que va a ser el tablero del juego.

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="styles.css" />
      <title>Document</title>
    </head>
    <body>
      <div class="battleship-container">
        <h1 class="battleship-title">Battleship</h1>
        <div class="battleship-board" id="board"></div>
      </div>
      <script src="./app-v3.js"></script>
    </body>
  </html>
  ```

## CSS

El archivo styles.css va a contener los estilos de nuestra aplicación

- con `* {}` vamos a resetear los estilos por defecto de los navegadores.

  ```css
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }
  ```

- Con `.battleship-container {}` vamos a centrar el contenedor principal de la aplicación.

  ```css
  .battleship-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    background-color: #f5f5f5;
  }
  ```

- Con `.battleship-board {}` vamos a crear un tablero de 10x10 con la propiedad grid de css.

  ```css
  .battleship-board {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 1px;
    height: 80%;
    width: 100%;
    border: 1px solid #000;
  }
  ```

- Con `.battleship-header {}` vamos a crear un header para el tablero de la aplicación. Y con `.battleship-header .row {}` y `.battleship-header .col {}` vamos a crear las filas y columnas del header.

  ```css
  .battleship-header {
    background-color: #fafafa;
    border: 2px solid #000;
    width: 100%;
    height: 100%;
  }

  .battleship-header .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .battleship-header .col {
    width: fit-content;
  }
  ```

- Con `.battleship-cell {}` vamos a crear las celdas del tablero. Con `.battleship-cell:hover {}` vamos a cambiar el color de fondo de las celdas cuando el usuario pase el mouse por encima. Y con `.battleship-ship {}` vamos a crear los estilos de las naves.

  ```css
  .battleship-cell {
    border: 1px solid black;
    width: 100%;
    height: 100px;
  }

  .battleship-cell:hover {
    background-color: #fafafa;
  }

  .battleship-ship {
    background-color: red;
    border: 2px dotted black;
  }
  ```

## JavaScript

El archivo app.js va a contener la lógica de nuestra aplicación

- Primero creamos una matriz de 10x10 con ceros y unos. Donde los ceros representan agua y los unos representan las naves.
  ```javascript
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
  ```
- Creamos tres funciones para crear celdas vacías, el header del tablero y las celdas del tablero.

  ```javascript
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
  ```

- Dentro de la funcion window.onload vamos a declarar el codigo para renderizado del tablero y las naves. Iniciamos haciendo una copia de la matriz gameBoard.

  ```javascript
  window.onload = function () {
    let matrix = [...gameBoard];
    /*
        Aquí va el resto de la aplicacion
    */
  };
  ```

- Creamos una función para renderizar el tablero. Dentro de esta función vamos a: obtener el tablero del dom, limpiar el tablero, recorrer la matriz y crear las celdas del tablero. Si la celda es un 2 la vamos a pintar de azul y si la celda es un 3 la vamos a pintar de rojo.

  ```javascript
  window.onload = function () {
    /* 
        ...Lo previo de onload
    */
    function renderBoard() {
      // Extraemos el tablero del dom
      let domBoard = document.getElementById("board");

      // Limpiamos el tablero
      domBoard.innerHTML = "";

      // Recorremos la matriz(eje y)
      for (let y = 0; y < matrix.length; y++) {
        // Recorremos la matriz(eje x)
        for (let x = 0; x < matrix[y].length; x++) {
          let cell; // creamos una variable vacía

          if (y == 0 && x == 0) {
            // si estamos en eje y = 0 y eje x = 0 significa que estamos en una celda que deberia estar vacia
            cell = createVoidCell(); // asignamos a cell el valor de una celda vacia
          } else if (y == 0) {
            // si estamos en eje y = 0 significa que estamos en el header de las columnas
            cell = createHeader(x, "col"); // asignamos a cell el valor de un header de columna
          } else if (x == 0) {
            // si estamos en eje x = 0 significa que estamos en el header de las filas
            cell = createHeader(y, "row"); // asignamos a cell el valor de un header de fila
          } else {
            // si no estamos en ninguna de las anteriores significa que estamos en una celda del tablero
            cell = createBoardCell(); // asignamos a cell el valor de una celda del tablero

            if (matrix[y][x] === 2) {
              // si la celda es un 2 significa que es "agua" o un fallo la pintamos de azul
              cell.style.backgroundColor = "blue";
            } else if (matrix[y][x] === 3) {
              // Si la celda es un 3 significa que es "nave" o un acierto la pintamos de rojo
              cell.style.backgroundColor = "red";
            }
          }
          domBoard.appendChild(cell); // insertamos la celda dentro del tablero
        }
      }
    }
  };
  ```

- Creamos una función que maneje el disparo(fireShip), esta funcion va a recibir las coordenadas de donde se disparo(y, x) y va a cambiar el valor de la matriz en esa posición. Si la celda es un 1 la cambiamos a 3 y si la celda es un 0 la cambiamos a 2.

  ```javascript
  window.onload = function () {
    /* 
        ...Lo previo de onload
    */
    function fireTorpedo(y, x) {
      if (matrix[y][x] === 1) {
        // si el elemento en la matriz en la posición y, x es igual a 1 significa que es una nave
        matrix[y][x] = 3; // cambiamos el valor de la matriz en esa posición a 3
      } else {
        // si el elemento en la matriz en la posición y, x es igual a 0 significa que es agua
        matrix[y][x] = 2; // cambiamos el valor de la matriz en esa posición a 2
      }
      // Volvemos a renderizar el tablero para que se vean los cambios
      renderBoard();
    }
  };
  ```

- De nuevo en la funcion `renderBoard` vamos a agregar a las celdas del tablero un evento click para disparar la funcion `fireTorpedo`

  ```javascript
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

          // Agregamos el evento click a la celda
          cell.addEventListener("click", function () {
            // al hacer click ejecutamos la funcion fireTorpedo con las coordenadas de y & x
            fireTorpedo(y, x);
          });
        }
        domBoard.appendChild(cell);
      }
    }
  }
  ```

- Finalmente vamos a llamar a la función `renderBoard` para que se ejecute al cargar la página.

  ```javascript
  window.onload = function () {
    /*
      Al final de la funcion onload llamamos a la funcion renderBoard para iniciar el juego
    */
    renderBoard();
  };
  ```

## Extras

### Como crear la matris programaticamente

- Usando bucles for o Array.from

  ```js
  function createMatrix(ySize, xSize) {
    const matrix = [];
    for (let i = 0; i < ySize; i++) {
      const row = [];
      for (let j = 0; j < xSize; j++) {
        row.push(0);
      }
      matrix.push(row);
    }
    return matrix;
  }

  function createMatrix(size = 10) {
    return Array.from({ length: size }, () => Array(size).fill(0));
  }
  ```

### Agregar naves aleatorias a una matriz

- Usando bucles for y Math.random para generar las coordenadas de las naves y validar que no se superpongan.

  ```javascript
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
  ```
