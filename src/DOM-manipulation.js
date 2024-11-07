const playerBoard = document.getElementById("player-gameboard");
const npcBoard = document.getElementById("npc-gameboard");

const buildBoard = (boardEl, boardData) => {
  for (let r = 0; r < boardData.grid.length; r++) {
    for (let c = 0; c < boardData.grid[r].length; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      boardEl.append(cell);
    }
  }
};

export { playerBoard, npcBoard, buildBoard };
