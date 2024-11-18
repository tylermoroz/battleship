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
    if (
      cell.classList.contains("ship") ||
      cell.classList.contains("npc-ship")
    ) {
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
};

const refreshGameState = (npcData, userData) => {
  playerBoard.innerHTML = "";
  npcBoard.innerHTML = "";
  buildBoard(playerBoard, userData);
  buildBoard(npcBoard, npcData);
};

export { playerBoard, npcBoard, buildBoard, refreshGameState };
