import { Gameboard } from "./gameboard.js";

export class Player {
  constructor(type, size) {
    this.type = type;
    this.gameBoard = new Gameboard(size);
  }
}
