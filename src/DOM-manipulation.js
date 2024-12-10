import { Ship } from "./ship.js";
import { newGame } from "./app.js";

const playerBoard = document.getElementById("player-gameboard");
const npcBoard = document.getElementById("npc-gameboard");

const buildBoard = (boardEl, boardData) => {
  for (let r = 0; r < boardData.grid.length; r++) {
    for (let c = 0; c < boardData.grid[r].length; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      cell.dataset.row = r;
      cell.dataset.col = c;

      if (boardData.grid[r][c] instanceof Ship) {
        if (boardEl === npcBoard) {
          cell.classList.add("npc-ship");
        } else {
          cell.classList.add("ship");
        }
      }
      if (boardData.grid[r][c] === "miss") {
        cell.classList.add("miss");
      }
      if (boardData.grid[r][c] === "hit") {
        cell.classList.add("hit");
      }

      boardEl.append(cell);
      if (boardEl === npcBoard) {
        addClickListener(cell, r, c, boardData);
      }
      if (boardEl === playerBoard) {
        userFleetPlacement(cell, r, c);
      }
    }
  }
};

const addClickListener = (cell, row, col, boardData) => {
  const placeShipsModal = document.querySelector("#place-ships-modal");
  cell.addEventListener("click", (event) => {
    if (placeShipsModal.style.display !== "none") {
      return;
    }
    const cell = event.target;
    if (cell.classList.contains("hit")) {
      return;
    }
    if (cell.classList.contains("miss")) {
      return;
    }
    if (cell.classList.contains("npc-ship")) {
      cell.classList.add("hit");
      boardData.receiveAttack([row, col]);
      addHitToBoard(row, col, boardData);
    } else {
      cell.classList.add("miss");
      boardData.receiveAttack([row, col]);
      addMissToBoard(row, col, boardData);
    }
    npcTurn();
    console.log(cell);
    refreshGameState(newGame.npc.gameBoard, newGame.user.gameBoard);
    console.log(newGame.user.gameBoard);
    console.log(newGame.npc.gameBoard);
    endGame();
  });
};

const addMissToBoard = (row, col, boardData) => {
  boardData.grid[row][col] = "miss";
};

const addHitToBoard = (row, col, boardData) => {
  boardData.grid[row][col] = "hit";
};

const npcTurn = () => {
  let x;
  let y;

  do {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  } while (newGame.user.gameBoard.missedShots.has(JSON.stringify([x, y])));

  newGame.user.gameBoard.missedShots.add(JSON.stringify([x, y]));

  newGame.user.gameBoard.receiveAttack([x, y]);

  const targetCell = playerBoard.querySelector(
    `.cell[data-row="${x}"][data-col="${y}"]`
  );

  if (targetCell.classList.contains("ship")) {
    targetCell.classList.add("hit");
    newGame.user.gameBoard.grid[x][y] = "hit";
  } else {
    targetCell.classList.add("miss");
    newGame.user.gameBoard.grid[x][y] = "miss";
  }
};

const refreshGameState = (npcData, userData) => {
  playerBoard.innerHTML = "";
  npcBoard.innerHTML = "";
  buildBoard(playerBoard, userData);
  buildBoard(npcBoard, npcData);
};

const userFleetPlacement = (cell, row, col) => {
  const fleetRadios = document.querySelectorAll(".fleet-radios");
  const orientationRadios = document.querySelectorAll(".ship-direction");
  const horizontalRadio = document.querySelector("#horizontal");
  const placeShipsModal = document.querySelector("#place-ships-modal");

  orientationRadios.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      orientationRadios.forEach((btn) => {
        if (btn !== event.target) {
          btn.checked = false;
        }
      });
    });
  });

  const shipTypes = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
  };

  const deployFleet = (length, orientation) => {
    const success = newGame.user.gameBoard.placeShip(
      new Ship(length),
      [row, col],
      orientation
    );

    refreshGameState(newGame.npc.gameBoard, newGame.user.gameBoard);
    console.log(newGame.user.gameBoard);
    return success;
  };

  fleetRadios.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      fleetRadios.forEach((btn) => {
        if (btn !== event.target) {
          btn.checked = false;
        }
      });

      if (event.target.checked && shipTypes[event.target.value]) {
        const handleCellClick = () => {
          const orientation = horizontalRadio.checked
            ? "horizontal"
            : "vertical";
          const shipPlaced = deployFleet(
            shipTypes[event.target.value],
            orientation
          );

          if (shipPlaced) {
            console.log("Ship successfully placed!");
            event.target.disabled = true;
            cell.removeEventListener("click", handleCellClick);
          } else {
            console.log("Invalid placement, retrying...");

            event.target.checked = false;

            event.target.checked = true;
            const simulatedClickEvent = new Event("change");
            event.target.dispatchEvent(simulatedClickEvent);

            console.log("Retrying ship placement...");
          }

          if (newGame.user.gameBoard.ships.length === 5) {
            placeShipsModal.style.display = "none";
          }
        };

        cell.addEventListener("click", handleCellClick);
      }
    });
  });
};

const npcPlaceFleet = () => {
  const randomCoord = () => {
    return Math.floor(Math.random() * 10);
  };

  const shipTypes = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
  };

  const orient = { horizontal: "horizontal", vertical: "vertical" };

  const randomOrient = () => {
    return Object.keys(orient)[
      Math.floor(Math.random() * Object.keys(orient).length)
    ];
  };

  const grid = newGame.npc.gameBoard.grid;

  const isValidPlacement = (startCoords, shipLength, orientation) => {
    const [x, y] = startCoords;

    if (orientation === "horizontal") {
      if (y < 0 || y + shipLength > grid[0].length) {
        return false;
      }

      for (let i = 0; i < shipLength; i++) {
        if (grid[x][y + i]) {
          return false;
        }
      }
    } else if (orientation === "vertical") {
      if (x < 0 || x + shipLength > grid.length) {
        return false;
      }

      for (let i = 0; i < shipLength; i++) {
        if (grid[x + i][y]) {
          return false;
        }
      }
    }
    return true;
  };

  for (const shipLength of Object.values(shipTypes)) {
    let validPlacement = false;
    let startCoords, orientation;

    while (!validPlacement) {
      startCoords = [randomCoord(), randomCoord()];
      orientation = randomOrient();
      if (isValidPlacement(startCoords, shipLength, orientation)) {
        newGame.npc.gameBoard.placeShip(
          new Ship(shipLength),
          startCoords,
          orientation
        );
        validPlacement = true;
      }
    }
  }
};

const displayError = (message) => {
  const errorDiv = document.getElementById("error-message");
  const errorMessage = document.createElement("div");
  errorMessage.className = "error";
  errorMessage.textContent = message;
  errorDiv.appendChild(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, 3000);
};

const endGame = () => {
  if (newGame.npc.gameBoard.ships.length === 0) {
    console.log("Game over! All npc ships have been sunk.");
  } else if (newGame.user.gameBoard.ships.length === 0) {
    console.log("Game over! All user ships have been sunk!");
  }
};

export {
  playerBoard,
  npcBoard,
  buildBoard,
  refreshGameState,
  npcPlaceFleet,
  displayError,
};
