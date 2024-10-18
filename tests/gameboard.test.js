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
});
