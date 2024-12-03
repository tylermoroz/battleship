import { Ship } from "./ship.js";

export class Gameboard {
  constructor(size) {
    this.size = size;
    this.grid = this.createGrid(size);
    this.ships = [];
    this.missedShots = new Set();
  }

  createGrid(size) {
    return Array.from({ length: size }, () => Array(size).fill(null));
  }

  placeShip(ship, coords, orientation) {
    const [x, y] = coords;
    console.log(
      `Placing ship: ${ship}, at: [${x}, ${y}], orientation: ${orientation}`
    );

    if (orientation === "horizontal") {
      if (y + ship.length > this.size || y < 0) {
        console.error("Horizontal bounds exceeded:", {
          x,
          y,
          shipLength: ship.length,
        });
        throw new Error("Coordinates out of horizontal bounds!");
      }
      for (let i = 0; i < ship.length; i++) {
        if (this.grid[x][y + i]) {
          console.error("Overlap detected at:", { x, y: y + i });
          // throw new Error("Coordinates overlap with another ship!");
        }
      }
      for (let i = 0; i < ship.length; i++) {
        this.grid[x][y + i] = ship;
      }
    } else if (orientation === "vertical") {
      if (x + ship.length > this.size || x < 0) {
        console.error("Vertical bounds exceeded:", {
          x,
          y,
          shipLength: ship.length,
        });
        throw new Error("Coordinates out of vertical bounds!");
      }
      for (let i = 0; i < ship.length; i++) {
        if (this.grid[x + i][y]) {
          console.error("Overlap detected at:", { x: x + i, y });
          // throw new Error("Coordinates overlap with another ship!");
        }
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
      this.missedShots.add(JSON.stringify(coords));
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
