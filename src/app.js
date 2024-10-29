import { Player } from "./player.js";

class Game {
  constructor() {
    this.user = new Player("Player");
    this.npc = new Player("Computer");
  }
}
