import { Ship } from "../src/ship.js";
import { Gameboard } from "../src/gameboard.js";

describe("Gameboard", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard(10);
  });

  describe("Gameboard initialization", () => {
    test("Game initialization", () => {
      expect(gameboard.size).toBe(10);
      expect(gameboard.grid).toEqual([
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
      ]);
      expect(gameboard.ships).toEqual([]);
      expect(gameboard.missedShots).toEqual([]);
    });
  });

  describe("Gameboard behavior", () => {
    test("Place ship", () => {
      const ship = new Ship(3);
      gameboard.placeShip(ship, [0, 0], "horizontal");

      expect(gameboard.grid[0][0]).toBe(ship);
      expect(gameboard.grid[0][1]).toBe(ship);
      expect(gameboard.grid[0][2]).toBe(ship);

      expect(gameboard.ships).toContain(ship);
    });
  });
});
