import { Ship } from "./ship.js";

export class Gameboard {
  constructor(size) {
    this.size = size;
    this.grid = this.createGrid(size);
    this.ships = [];
    this.missedShots = [];
  }

  createGrid(size) {
    return Array.from({ length: size }, () => Array(size).fill(null));
  }

  placeShip(ship, coords, orientation) {
    const [x, y] = coords;
    if (orientation === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.grid[x][y + i] = ship;
      }
    } else if (orientation === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        this.grid[x + i][y] = ship;
      }
    }
    this.ships.push(ship);
  }

  receiveAttack(coords) {
    const [x, y] = coords;
    const target = this.grid[x][y];
    if (target instanceof Ship) {
      target.hit();
    } else {
      this.missedShots.push(coords);
    }
  }
}
