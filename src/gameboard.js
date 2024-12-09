import { Ship } from "./ship.js";
import { displayError } from "./DOM-manipulation.js";

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
      //check for out of bounds placement
      if (y + ship.length > this.size || y < 0) {
        console.error("Horizontal bounds exceeded:", {
          x,
          y,
          shipLength: ship.length,
        });
        displayError("Coordinates out of horizontal bounds!");
        return;
        // throw new Error("Coordinates out of horizontal bounds!");
      }
      //check for overlapping coordinates
      for (let i = 0; i < ship.length; i++) {
        if (this.grid[x][y + i]) {
          console.error("Overlap detected at:", { x, y: y + i });
          displayError("Coordinates overlap with another ship!");
          return;
          // throw new Error("Coordinates overlap with another ship!");
        }
      }
      //place ship onto the grid
      for (let i = 0; i < ship.length; i++) {
        this.grid[x][y + i] = ship;
      }
    } else if (orientation === "vertical") {
      //check for out of bounds placement
      if (x + ship.length > this.size || x < 0) {
        console.error("Vertical bounds exceeded:", {
          x,
          y,
          shipLength: ship.length,
        });
        displayError("Coordinates out of vertical bounds!");
        return;
        // throw new Error("Coordinates out of vertical bounds!");
      }
      //check for overlapping coordinates
      for (let i = 0; i < ship.length; i++) {
        if (this.grid[x + i][y]) {
          console.error("Overlap detected at:", { x: x + i, y });
          displayError("Coordinates overlap with another ship!");
          return;
          // throw new Error("Coordinates overlap with another ship!");
        }
      }
      //place ship onto the grid
      for (let i = 0; i < ship.length; i++) {
        this.grid[x + i][y] = ship;
      }
    }
    //add ship to the fleet
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
  }
}
