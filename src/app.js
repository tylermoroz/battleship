import {
  playerBoard,
  npcBoard,
  buildBoard,
  refreshGameState,
} from "./DOM-manipulation.js";
import { Player } from "./player.js";
import { Ship } from "./ship.js";
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

newGame.user.gameBoard.placeShip(new Ship(4), [4, 2], "vertical");
newGame.user.gameBoard.placeShip(new Ship(3), [0, 0], "horizontal");
newGame.user.gameBoard.placeShip(new Ship(2), [5, 8], "vertical");

newGame.npc.gameBoard.placeShip(new Ship(4), [3, 6], "vertical");
newGame.npc.gameBoard.placeShip(new Ship(3), [7, 2], "vertical");
newGame.npc.gameBoard.placeShip(new Ship(2), [3, 1], "horizontal");

console.log(newGame.user.gameBoard.grid);
console.log(newGame.npc.gameBoard.grid);
refreshGameState(newGame.npc.gameBoard, newGame.user.gameBoard);

export { newGame };
