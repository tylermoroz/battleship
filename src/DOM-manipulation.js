import { Ship } from "./ship.js";

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
        cell.classList.add("ship");
      }

      boardEl.append(cell);
      addClickListener(cell);
    }
  }
};

const addClickListener = (cell) => {
  cell.addEventListener("click", (event) => {
    const cell = event.target;
    console.log(cell);
  });
};

const refreshGameState = (npcData, userData) => {
  playerBoard.innerHTML = "";
  npcBoard.innerHTML = "";
  buildBoard(playerBoard, userData);
  buildBoard(npcBoard, npcData);
};

export { playerBoard, npcBoard, buildBoard, refreshGameState };
