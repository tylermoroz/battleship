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
      if (y + ship.length > this.size || y < 0) {
        throw new Error("Coordinates out of horizontal bounds!");
      }
      for (let i = 0; i < ship.length; i++) {
        this.grid[x][y + i] = ship;
      }
    } else if (orientation === "vertical") {
      if (x + ship.length > this.size || x < 0) {
        throw new Error("Coordinates out of vertical bounds!");
      }
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
      this.sunkShip();
    } else {
      this.missedShots.push(coords);
    }
  }

  sunkShip() {
    this.ships = this.ships.filter((ship) => !ship.sunk);

    if (typeof alert === "undefined") {
      global.alert = function () {
        console.log("All allied ships have been sunk!");
      };
    }

    if (this.ships.length === 0) {
      alert("All allied ships have been sunk!");
    }
  }
}
