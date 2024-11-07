import { playerBoard, npcBoard, buildBoard } from "./DOM-manipulation.js";
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
