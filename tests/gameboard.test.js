import { Ship } from "../src/ship.js";
import { Gameboard } from "../src/gameboard.js";

describe("Gameboard", () => {
  let gameboard;

  describe("Gameboard initialization", () => {
    beforeEach(() => {
      gameboard = new Gameboard(10);
    });

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
      expect(gameboard.missedShots).toEqual(new Set());
    });
  });

  describe("Gameboard behavior", () => {
    let ship;

    beforeEach(() => {
      gameboard = new Gameboard(10);
      ship = new Ship(3);
      gameboard.placeShip(ship, [0, 0], "horizontal");
    });

    test("Ship placement", () => {
      expect(gameboard.grid[0][0]).toBe(ship);
      expect(gameboard.grid[0][1]).toBe(ship);
      expect(gameboard.grid[0][2]).toBe(ship);

      expect(gameboard.ships).toContain(ship);
    });

    test("Out of bounds horizontally", () => {
      expect(() => {
        gameboard.placeShip(ship, [5, 8], "horizontal");
      }).toThrow("Coordinates out of horizontal bounds!");
    });

    test("Out of bounds vertically", () => {
      expect(() => {
        gameboard.placeShip(ship, [8, 5], "vertical");
      }).toThrow("Coordinates out of vertical bounds!");
    });

    test("Overlapping coordinates", () => {
      expect(() => {
        let ship2 = new Ship(3);
        gameboard.placeShip(ship2, [0, 0], "vertical");
      }).toThrow("Coordinates overlap with another ship!");
    });

    test("Successful attack", () => {
      gameboard.receiveAttack([0, 0]);

      expect(ship.timesHit).toBe(1);
      expect(gameboard.missedShots).toEqual(new Set());
    });

    test("Missed attack", () => {
      gameboard.receiveAttack([9, 9]);

      expect(ship.timesHit).toBe(0);
      expect([...gameboard.missedShots]).toEqual(["[9,9]"]);
    });

    test("Sunk ship", () => {
      gameboard.receiveAttack([0, 0]);
      gameboard.receiveAttack([0, 1]);
      gameboard.receiveAttack([0, 2]);

      expect(gameboard.ships).toEqual([]);
    });
  });
});
