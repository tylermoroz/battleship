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
  cell.addEventListener("click", (event) => {
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
  });
};

const addMissToBoard = (row, col, boardData) => {
  boardData.grid[row][col] = "miss";
};

const addHitToBoard = (row, col, boardData) => {
  boardData.grid[row][col] = "hit";
};

const npcTurn = () => {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);

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

  fleetRadios.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      fleetRadios.forEach((btn) => {
        if (btn !== event.target) {
          btn.checked = false;
        }
      });

      if (event.target.checked && event.target.value === "carrier") {
        cell.addEventListener("click", () => {
          newGame.user.gameBoard.placeShip(
            new Ship(5),
            [row, col],
            "horizontal"
          );
          refreshGameState(newGame.npc.gameBoard, newGame.user.gameBoard);
          console.log(newGame.user.gameBoard);
        });
      } else if (event.target.checked && event.target.value === "battleship") {
        cell.addEventListener("click", () => {
          newGame.user.gameBoard.placeShip(
            new Ship(4),
            [row, col],
            "horizontal"
          );
          refreshGameState(newGame.npc.gameBoard, newGame.user.gameBoard);
          console.log(newGame.user.gameBoard);
        });
      } else if (event.target.checked && event.target.value === "cruiser") {
        cell.addEventListener("click", () => {
          newGame.user.gameBoard.placeShip(
            new Ship(3),
            [row, col],
            "horizontal"
          );
          refreshGameState(newGame.npc.gameBoard, newGame.user.gameBoard);
          console.log(newGame.user.gameBoard);
        });
      } else if (event.target.checked && event.target.value === "submarine") {
        cell.addEventListener("click", () => {
          newGame.user.gameBoard.placeShip(
            new Ship(3),
            [row, col],
            "horizontal"
          );
          refreshGameState(newGame.npc.gameBoard, newGame.user.gameBoard);
          console.log(newGame.user.gameBoard);
        });
      } else if (event.target.checked && event.target.value === "destroyer") {
        cell.addEventListener("click", () => {
          newGame.user.gameBoard.placeShip(
            new Ship(2),
            [row, col],
            "horizontal"
          );
          refreshGameState(newGame.npc.gameBoard, newGame.user.gameBoard);
          console.log(newGame.user.gameBoard);
        });
      }
    });
  });
};

export { playerBoard, npcBoard, buildBoard, refreshGameState };
