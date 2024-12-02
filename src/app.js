import {
  playerBoard,
  npcBoard,
  buildBoard,
  refreshGameState,
  npcPlaceFleet,
} from "./DOM-manipulation.js";
import { Player } from "./player.js";
import "./styles.css";

class Game {
  constructor() {
    this.user = new Player("Player");
    this.npc = new Player("Computer");
  }

  startGame() {
    buildBoard(playerBoard, this.user.gameBoard);
    buildBoard(npcBoard, this.npc.gameBoard);
  }
}

const newGame = new Game();
newGame.startGame();
npcPlaceFleet();

console.log(newGame.user.gameBoard.grid);
console.log(newGame.npc.gameBoard.grid);
refreshGameState(newGame.npc.gameBoard, newGame.user.gameBoard);

export { newGame };
